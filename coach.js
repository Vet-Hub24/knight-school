import {Chess} from './vendor/chess.js?v=13';
import {families,glossary} from './content.js?v=13';
import {getOpeningTheory} from './opening-theory.js?v=13';
const names={p:'pawn',n:'knight',b:'bishop',r:'rook',q:'queen',k:'king'};
const values={p:1,n:3,b:3,r:5,q:9,k:0};
const familyHistories=new Map(families.map(f=>{const c=new Chess();for(const m of f.line.split(' '))c.move(m);return[f.id,c.history()]}));
export const side=c=>c==='w'?'White':'Black';
export function attackSquares(chess,square,piece=chess.get(square)){
 if(!piece)return [];const f=square.charCodeAt(0)-97,r=Number(square[1])-1,out=[];
 const push=(x,y)=>{if(x>=0&&x<8&&y>=0&&y<8){out.push(String.fromCharCode(97+x)+(y+1));return true}return false};
 if(piece.type==='p'){push(f-1,r+(piece.color==='w'?1:-1));push(f+1,r+(piece.color==='w'?1:-1));return out}
 if(piece.type==='n'){for(const [x,y]of [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]])push(f+x,r+y);return out}
 if(piece.type==='k'){for(let x=-1;x<=1;x++)for(let y=-1;y<=1;y++)if(x||y)push(f+x,r+y);return out}
 const dirs=piece.type==='b'?[[1,1],[1,-1],[-1,1],[-1,-1]]:piece.type==='r'?[[1,0],[-1,0],[0,1],[0,-1]]:[[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
 for(const [x,y]of dirs){let a=f+x,b=r+y;while(push(a,b)){if(chess.get(String.fromCharCode(97+a)+(b+1)))break;a+=x;b+=y}}return out;
}
export function positionFacts(chess){
 const pieces=chess.board().flat().filter(Boolean),material={w:0,b:0};
 for(const p of pieces)material[p.color]+=values[p.type];
 const result={material,center:{w:[],b:[]},loose:{w:[],b:[]},pawns:{w:[],b:[]},checks:[],captures:[]};
 for(const c of ['w','b']){
  result.center[c]=['d4','e4','d5','e5'].filter(s=>chess.isAttacked(s,c));
  const enemy=c==='w'?'b':'w';
  result.loose[c]=pieces.filter(p=>p.color===c&&p.type!=='k'&&chess.isAttacked(p.square,enemy)&&!chess.isAttacked(p.square,c)).map(p=>`${names[p.type]} on ${p.square}`);
  const pawns=pieces.filter(p=>p.color===c&&p.type==='p');
  for(const p of pawns){const file=p.square.charCodeAt(0);if(!pawns.some(q=>Math.abs(q.square.charCodeAt(0)-file)===1))result.pawns[c].push(`isolated ${p.square}`)}
 }
 const moves=chess.moves({verbose:true});result.checks=moves.filter(m=>/[+#]/.test(m.san)).map(m=>m.san);result.captures=moves.filter(m=>m.captured).map(m=>m.san);
 return result;
}
export function explainMove(chess,lesson={}){
 const move=chess.history({verbose:true}).at(-1);const theory=getOpeningTheory(lesson?.name)||(chess.history().length<=24?inferOpeningTheory(chess):null);let authored='';
 if(move){const hist=chess.history();const candidates=[...families].sort((a,b)=>Number(lesson?.id===b.id)-Number(lesson?.id===a.id));
  for(const f of candidates){const prefix=familyHistories.get(f.id).slice(0,hist.length);if(prefix.length===hist.length&&prefix.every((m,i)=>m===hist[i])){authored=getOpeningTheory(f.name)?.notes[hist.length-1]||'';if(authored)break}}
 }
 const facts=[];
 if(move){
  const after=new Chess(move.after),before=new Chess(move.before),attacks=attackSquares(after,move.to),central=attacks.filter(s=>['d4','e4','d5','e5'].includes(s));
  if(move.flags.includes('k')||move.flags.includes('q'))facts.push('Castling relocates the king and rook together. The king gets closer to a shelter while the rook moves toward central files.');
  else if(move.piece==='p'){
   if(['d','e'].includes(move.to[0]))facts.push('The pawn occupies a central file. It changes the squares controlled by the pawn and can open lines for pieces behind it.');
   const direction=move.color==='w'?1:-1;const travel=Math.abs(Number(move.to[1])-Number(move.from[1]));if(travel===2)facts.push('This two-square advance gains space in one move, but the pawn cannot retreat. Check the squares it stops defending.');
   const home=move.color==='w'?'1':'8';if(['f','g','h'].includes(move.from[0])&&after.get('g'+home)?.type==='k')facts.push('This pawn move changes the castled king’s shelter. A useful attack can still create a long-term defensive weakness.');
  }else if(['n','b'].includes(move.piece)&&['1','8'].includes(move.from[1]))facts.push('A minor piece leaves its starting rank. Development is valuable when the new square serves a concrete task and the piece is safe.');
  if(central.length)facts.push(`From ${move.to}, this ${names[move.piece]} attacks ${central.join(', ')} in the center. This is geometric control, including attacks by a pinned piece; it does not prove a capture is legal.`);
  const targets=attacks.map(s=>({s,p:after.get(s)})).filter(x=>x.p&&x.p.color!==move.color).map(x=>`${names[x.p.type]} on ${x.s}`);
  if(targets.length)facts.push(`The moved piece now attacks the ${targets.slice(0,3).join(' and ')}. An attacked piece is not necessarily lost: count defenders and forcing replies.`);
  if(move.captured)facts.push(`The capture removes a ${names[move.captured]}. Compare the next recapture and the resulting structure before deciding who benefits.`);
  if(move.san.includes('#'))facts.push('This is checkmate: the checked king has no legal escape, capture, or blocking move.');
  else if(move.san.includes('+'))facts.push('The move gives check. That limits the opponent’s replies to moves that remove the check; a check is not automatically the best move.');
  if(move.promotion)facts.push(`The pawn promotes to a ${names[move.promotion]}. Compare the promotion choices for checks, forks, and stalemate.`);
  if(move.piece==='r'){const filePieces=after.board().flat().filter(p=>p?.square[0]===move.to[0]&&p.type==='p');if(!filePieces.length)facts.push('The rook reaches a file with no pawns. Look for a safe entry square and targets beyond the file.');}
  if(!facts.length)facts.push(`The ${names[move.piece]} relocates from ${move.from} to ${move.to}. Evaluate its new targets, the squares left behind, and the opponent’s most forcing reply.`);
 }
 if(lesson?.branchNotes){const hist=chess.history(),tokens=lesson.line.split(' ');if(hist.every((m,i)=>m===tokens[i]))authored=lesson.branchNotes[hist.length-1]||'';}
 return {move,authored,facts,theory,position:positionFacts(chess)};
}
export function planText(chess,color,lesson){
 const theory=getOpeningTheory(lesson?.name)||(chess.history().length<=24?inferOpeningTheory(chess):null);if(theory)return theory[color==='w'?'white':'black'];
 if(lesson?.study&&!lesson.players)return lesson.study[color==='w'?'white':'black']||lesson.plan;
 const f=positionFacts(chess),out=[];if(f.loose[color].length)out.push(`Check the safety of the ${f.loose[color].slice(0,2).join(' and ')}. They are attacked without a geometric defender.`);
 out.push('Compare king safety, piece activity, and the pawn structure. Improve the least useful piece unless a forcing threat requires an immediate response.');
 if(f.pawns[color].length)out.push('Some pawns are isolated. Look for active compensation before deciding whether to defend them or change the structure.');
 if(lesson?.players&&lesson.study)out.push('Game-wide study focus: '+lesson.study[color==='w'?'white':'black']);return out.join(' ');
}
export function answerGuided(question,chess,lesson){
 const q=question.toLowerCase(),e=explainMove(chess,lesson),f=e.position;
 for(const [term,definition]of Object.entries(glossary)){if(q.includes(term.toLowerCase())&&(/what|mean|explain|define/.test(q)))return definition}
 if(/threat|hanging|loose|danger/.test(q))return `It is ${side(chess.turn())} to move. Legal checks to examine: ${f.checks.slice(0,10).join(', ')||'none'}. Legal captures: ${f.captures.slice(0,10).join(', ')||'none'}.\n\nWhite’s attacked, geometrically undefended pieces: ${f.loose.w.join(', ')||'none detected'}. Black’s: ${f.loose.b.join(', ')||'none detected'}.\n\nThese are candidates to calculate, not proof of a winning tactic. Check the opponent’s strongest reply with Stockfish.`;
 if(/black|white|plan|middle|next/.test(q)){const c=/black/.test(q)?'b':/white/.test(q)?'w':chess.turn();return `${side(c)}’s plan: ${planText(chess,c,lesson)}\n\n${side(c==='w'?'b':'w')}’s counterplay: ${planText(chess,c==='w'?'b':'w',lesson)}`}
 if(/why|reason|idea|explain|move/.test(q)){if(lesson?.players&&lesson.notes?.[chess.history().length])return lesson.notes[chess.history().length]+'\n\n'+e.facts.join('\n\n');if(lesson?.study)return lesson.study.why+'\n\n'+(e.authored||e.facts.join('\n\n'));return (e.authored||'The selected move changes the position in these observable ways:')+'\n\n'+e.facts.join('\n\n')+(e.theory?'\n\nThe structure: '+e.theory.structure:'')}
 return 'The study guide can explain the selected move, both sides’ plans, threats, and chess terms. For a longer conversation, use Ask ChatGPT to copy this position and open ChatGPT separately. You can also enter an alternative move in Compare a move to test a concrete idea.';
}

function inferOpeningTheory(chess){const hist=chess.history();let best=null,count=3;for(const f of families){const moves=f.line.split(' ');let n=0;while(n<Math.min(hist.length,moves.length)&&moves[n]===hist[n])n++;if(n>count){count=n;best=getOpeningTheory(f.name)}}return best}
