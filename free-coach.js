import {Chess} from './vendor/chess.js?v=31';
import {attackSquares,positionFacts,explainMove,planText,answerGuided,side} from './coach.js?v=31';
const values={p:1,n:3,b:3,r:5,q:9,k:0},names={p:'pawn',n:'knight',b:'bishop',r:'rook',q:'queen',k:'king'};
const opposite=c=>c==='w'?'b':'w';
export function playUci(board,uci){return board.move({from:uci.slice(0,2),to:uci.slice(2,4),promotion:uci[4]||'q'})}
export function materialBalance(board,color){return board.board().flat().filter(Boolean).reduce((sum,p)=>sum+(p.color===color?1:-1)*values[p.type],0)}
export function legalCaptureOpportunities(board){
 // Only inspect the real side to move: changing the turn can create illegal positions.
 const result=[];
 for(const move of board.moves({verbose:true}).filter(m=>m.captured&&m.captured!=='k')){
  const c=new Chess(board.fen());c.move(move.san);
  const replies=c.moves({verbose:true}).filter(r=>r.captured&&r.to===move.to);
  result.push({san:move.san,from:move.from,to:move.to,victim:move.captured,attacker:move.piece,canRecapture:replies.length>0,recaptures:replies.map(r=>r.san),hanging:replies.length===0});
 }
 return result;
}
export function tacticalMotifs(before,move){
 const c=new Chess(before);const m=typeof move==='string'?c.move(move):c.move({from:move.from,to:move.to,promotion:move.promotion||'q'});
 const events=[];
 if(c.isCheckmate())events.push({type:'mate',text:`${m.san} is checkmate: the king has no legal escape, capture, or block.`});
 else if(c.isCheck())events.push({type:'check',text:`${m.san} gives check, so the opponent must answer the king threat.`});
 const targets=attackSquares(c,m.to).map(s=>({square:s,piece:c.get(s)})).filter(x=>x.piece&&x.piece.color!==m.color&&(x.piece.type==='k'||values[x.piece.type]>=3));
 if(targets.length>=2)events.push({type:'fork',text:`The ${names[m.piece]} on ${m.to} attacks ${targets.map(x=>`${names[x.piece.type]} ${x.square}`).join(' and ')}. This is a fork pattern; verify which targets can actually be won.`});
 if(['b','r','q'].includes(m.piece)){
  const dirs=m.piece==='b'?[[1,1],[1,-1],[-1,1],[-1,-1]]:m.piece==='r'?[[1,0],[-1,0],[0,1],[0,-1]]:[[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
  for(const [df,dr]of dirs){let f=m.to.charCodeAt(0)-97+df,r=Number(m.to[1])+dr,seen=[];while(f>=0&&f<8&&r>=1&&r<=8){const sq=String.fromCharCode(97+f)+r,p=c.get(sq);if(p){if(p.color===m.color)break;seen.push({sq,p});if(seen.length===2)break}f+=df;r+=dr}if(seen.length===2){if(seen[1].p.type==='k'&&seen[0].p.type!=='k')events.push({type:'pin',text:`The ${names[seen[0].p.type]} on ${seen[0].sq} is pinned along the line to its king on ${seen[1].sq}.`});if(seen[0].p.type==='k')events.push({type:'skewer',text:`The king and ${names[seen[1].p.type]} are aligned. The check may expose the piece behind the king.`})}}
 }
 const old=new Chess(before);
 for(const p of c.board().flat().filter(p=>p?.color===m.color&&['b','r','q'].includes(p.type)&&p.square!==m.to)){
  const targetsNow=attackSquares(c,p.square).filter(s=>{const q=c.get(s);return q&&q.color!==m.color&&(q.type==='k'||q.type==='q')});
  const oldAttacks=attackSquares(old,p.square);
  for(const sq of targetsNow.filter(s=>!oldAttacks.includes(s)))events.push({type:'discovered',text:`Moving the ${names[m.piece]} opens the ${names[p.type]} on ${p.square} against the ${names[c.get(sq).type]} on ${sq}: a discovered-attack pattern.`});
 }
 return {move:m,events,after:c};
}
export function inspectLine(fen,line){
 const board=new Chess(fen),color=board.turn(),initial=materialBalance(board,color),san=[],events=[];let first=null;
 for(const u of (line?.uci||[]).slice(0,10)){
  try{const before=board.fen();const move=playUci(board,u);if(!first)first=move;san.push(move.san);if(move.color===color)events.push(...tacticalMotifs(before,move).events)}catch{break}
 }
 return {first,san,events,materialChange:materialBalance(board,color)-initial,finalFen:board.fen()};
}
export function reviewClassification(before,after,mover){
 if(!before||!after)return {label:'Analyze to compare',code:'unrated',loss:null};
 const sign=mover==='w'?1:-1;
 if(after.terminal==='checkmate')return {label:'Checkmate delivered',code:'good',loss:0};
 if(after.mateWhite!=null&&after.mateWhite*sign>0)return {label:before.mateWhite!=null&&before.mateWhite*sign>0?'Keeps a mating line':'Finds a mating line',code:'good',loss:0};
 if(before.mateWhite!==null&&before.mateWhite!==undefined&&before.mateWhite*sign>0&&!(after.mateWhite*sign>0))return {label:'Missed mating line',code:'blunder',loss:null};
 if(after.mateWhite!==null&&after.mateWhite!==undefined&&after.mateWhite*sign<0&&!(before.mateWhite*sign<0))return {label:'Allows a mating line',code:'blunder',loss:null};
 if(!Number.isFinite(before.scoreWhite)||!Number.isFinite(after.scoreWhite))return {label:'Mate estimate — inspect the line',code:'unrated',loss:null};
 const loss=(before.scoreWhite-after.scoreWhite)*sign;
 return {code:loss>=2?'blunder':loss>=1?'mistake':loss>=.4?'inaccuracy':loss<-.4?'unrated':'good',label:loss>=2?'Blunder estimate':loss>=1?'Mistake estimate':loss>=.4?'Inaccuracy estimate':loss<-.4?'Search assessment changed':'Close to the earlier estimate',loss};
}
export function coachReport(chess,analysis){
 const fen=chess.fen(),position=positionFacts(chess),captures=legalCaptureOpportunities(chess),alerts=[];
 for(const item of captures.filter(x=>x.hanging).slice(0,3))alerts.push({type:'hanging',title:'Hanging-piece candidate',text:`${side(chess.turn())} can play ${item.san}, capturing the ${names[item.victim]} on ${item.to}, with no immediate legal recapture on that square. Check checks and counterthreats before taking it.`});
 if(!analysis||analysis.fen!==fen)return {alerts,classification:null,best:null,summary:'Ask Stockfish to analyze candidates, or review the last move for a before-and-after comparison.',position};
 const best=analysis.lines?.[0],line=best?inspectLine(fen,best):null;
 if(line?.first){const m=line.first;alerts.push({type:'better',title:'Stockfish’s current candidate',text:`${side(chess.turn())}: ${m.san}. ${m.captured?`It captures a ${names[m.captured]}. `:''}${tacticalMotifs(fen,m).events[0]?.text||explainMove(tacticalMotifs(fen,m).after,{}).facts[0]||'Compare the resulting piece activity.'} Sample line: ${line.san.slice(0,8).join(' ')}.`});}
 let classification=null;const review=analysis.moveReview;
 if(review){const last=chess.history({verbose:true}).at(-1),root=last?.before||review.beforeFen,top=review.before?.[0],after=review.after?.[0]||best;
  if(last&&root&&top&&after){classification=reviewClassification(top,after,last.color);const suggested=inspectLine(root,top),different=suggested.first?.san!==last.san;
   if(different&&suggested.first){alerts.push({type:'alternative',title:'Alternative before your move',text:`Before ${side(last.color)} played ${last.san}, Stockfish preferred ${suggested.first.san}. Example: ${suggested.san.slice(0,8).join(' ')}. This line starts before your move, not from the current board.`});
    if(classification.loss>=.4||classification.code==='blunder'){
     const cap=legalCaptureOpportunities(new Chess(root)).find(x=>x.san===suggested.first.san);
     if(cap&&(cap.hanging||suggested.materialChange>0))alerts.push({type:'missed-capture',title:'Missed capture',text:`${suggested.first.san} was a capture to investigate: it takes the ${names[cap.victim]} on ${cap.to}${cap.hanging?' without an immediate legal recapture on that square':''}. The engine comparison favored this opportunity over ${last.san}.`});
     const tactic=suggested.events.find(x=>['mate','fork','pin','skewer','discovered'].includes(x.type));
     if(tactic)alerts.push({type:'missed-tactic',title:'Missed tactical idea',text:tactic.text+' Follow the engine line to see the defender’s response.'});
    }
   }
   const reply=best?inspectLine(fen,best):null;
   if(reply?.first?.captured&&reply.first.to===last.to)alerts.push({type:'exposed',title:'Your moved piece can be captured',text:`The engine’s reply ${reply.first.san} captures your ${names[last.piece]} on ${last.to}. Look at the legal recapture and the rest of the line before deciding whether the move was a sacrifice or an oversight.`});
  }
 }
 return {alerts,classification,best:line,summary:classification?`${classification.label}${classification.loss!==null?` · estimated loss ${Math.max(0,classification.loss).toFixed(2)} pawn units for the mover`:''}. Labels use short engine searches and can change with deeper analysis.`:'Stockfish candidates and legal board patterns, explained locally.',position};
}
export function freeCoachReply(question,chess,lesson,analysis){
 const q=question.toLowerCase(),report=coachReport(chess,analysis);
 if(/blunder|mistake|miss|better|tactic|hanging|capture|wrong|lose|lost/.test(q))return [report.summary,...report.alerts.map(a=>`${a.title}: ${a.text}`),report.alerts.length?'':answerGuided(question,chess,lesson)].filter(Boolean).join('\n\n');
 return answerGuided(question,chess,lesson);
}
function safeHistory(history){return String(history||'').replace(/^\s*\[[^\n]*\]\s*$/gm,'').trim()||'No moves recorded; this may be a loaded FEN position.'}
function score(line){if(!line)return 'Not analyzed yet — do not invent an evaluation.';if(line.mateWhite!==null&&line.mateWhite!==undefined)return `Mate estimate ${line.mateWhite} (positive favors White, negative favors Black).`;return Number.isFinite(line.scoreWhite)?`${line.scoreWhite>=0?'+':''}${line.scoreWhite.toFixed(2)} pawn units, White’s perspective; depth ${line.depth||'unknown'}.`:'Evaluation unavailable.'}
export function buildChatGPTPrompt(context,question){
 const analysis=context.engine||{},last=context.lastMove,review=analysis.review,previous=review?.before?.[0],current=analysis.lines?.[0];
 return `Please be my personal chess coach. Explain the theory and WHY ideas work in plain language. Define unfamiliar terms, discuss both players’ plans, and help me learn rather than only giving a move. Treat the FEN as the authoritative board. Use the supplied Stockfish results as limited-search evidence, not proof. If analysis is missing, say so. Do not invent move legality or evaluation numbers.\n\nMY QUESTION\n${String(question||'Explain this position, my last move, the opponent’s threats, and a useful plan.').trim()}\n\nCURRENT POSITION (FEN)\n${context.fen}\n\nSIDE TO MOVE\n${context.turn||((context.fen||'').split(' ')[1]==='b'?'Black':'White')}\n\nMOVE HISTORY (PGN / SAN, headers omitted)\n${safeHistory(context.history)}\n\nPLAYER’S LAST MOVE\n${last?`${side(last.color)} played ${last.san}. Position before this move: ${last.before}`:'No last move recorded; evaluate the loaded position.'}\n\nSTOCKFISH BEFORE THE PLAYER’S MOVE\n${score(previous)}\nRecommended alternative in that earlier position: ${previous?.san?.[0]||'Not analyzed yet.'}\nEarlier continuation: ${previous?.san?.join(' ')||'Not available.'}\n\nSTOCKFISH IN THE CURRENT POSITION\n${score(current)}\nRecommended move for the CURRENT side to move: ${current?.san?.[0]||'Not analyzed yet.'}\nCurrent continuation: ${current?.san?.join(' ')||'Not available.'}\n\nLESSON / STUDY CONTEXT\n${context.lesson||'Free practice'}\n${context.studyNotes||''}\n\nPlease distinguish an alternative before my move from the opponent’s best reply now. Explain hanging pieces, missed captures or tactics, and strategic tradeoffs only where supported. Finish with one focused question to check my understanding.`;
}
