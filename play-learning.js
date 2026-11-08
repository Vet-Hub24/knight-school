import {Chess} from './vendor/chess.js?v=27';
import {coachReport,reviewClassification} from './free-coach.js?v=27';
export function terminalAnalysis(board){if(!board.isGameOver())return null;return {lines:[{terminal:board.isCheckmate()?'checkmate':'draw',scoreWhite:board.isCheckmate()?null:0,mateWhite:board.isCheckmate()?(board.turn()==='b'?1:-1):null,uci:[],san:[]}]};}
export function learningMoveReport(move,before,after){
 const board=new Chess(move.before),actual=board.move(move.san);if(board.fen()!==move.after)throw Error('Move does not match reviewed position.');
 const analysis={fen:move.after,lines:after.lines,moveReview:{before:before.lines,after:after.lines}},grade=reviewClassification(before.lines?.[0],after.lines?.[0],move.color),top=before.lines?.[0]?.uci?.[0];let alternative=null;
 try{if(top)alternative=new Chess(move.before).move({from:top.slice(0,2),to:top.slice(2,4),promotion:top[4]||'q'});}catch{}
 const matchedTop=!!alternative&&top===actual.from+actual.to+(actual.promotion||'')&&!!after.lines?.[0];const best=matchedTop;const finalGrade=matchedTop?{code:'good',label:'Matched the earlier top choice',loss:null}:grade;const report=coachReport(board,analysis);if(matchedTop){report.classification=finalGrade;report.summary=actual.san+' matched Stockfish’s top choice before your move. Short searches are estimates, not proof that a move is always best.';if(grade.code!=='good')report.summary+=' The later search changed its assessment, so no loss grade is assigned for matching the earlier candidate.';}
 const symbol=best?'★':grade.code==='good'?'✓':grade.code==='inaccuracy'?'?!':['mistake','blunder'].includes(grade.code)?'×':null;
 return {move:actual,analysis,grade:finalGrade,matchedTop,symbol,kind:best?'engine':grade.code==='good'?'good':grade.code==='inaccuracy'?'warning':'mistake',label:best?'Top choice · short search':grade.code==='good'?'Good move · short search':grade.label,alternative,report,displayFen:move.after};
}
export function learningMoveGuidance(review,fen){if(!review||review.displayFen!==fen||!review.symbol)return {arrows:[],badges:[],caption:''};return {arrows:[],badges:[{square:review.move.to,kind:review.kind,symbol:review.symbol}],caption:review.move.san+': '+review.label+'. Marker refers to your last move, even after Stockfish replies. Short searches can change with deeper analysis.'};}
export function undoPlayerTurn(board,color,playing=true){const history=board.history({verbose:true});if(!playing)return board.undo()?[history.at(-1)]:[];let index=history.length-1;while(index>=0&&history[index].color!==color)index--;if(index<0)return [];const removed=[];while(board.history().length>index)removed.push(board.undo());return removed;}

export function learningReviewTarget(board,playing=false,color='w'){const moves=board.history({verbose:true});return playing?moves.findLast(m=>m.color===color)||null:moves.at(-1)||null;}
