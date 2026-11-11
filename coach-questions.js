import {explainMove,planText,side} from './coach.js?v=31';
import {getOpeningTheory} from './opening-theory.js?v=31';
export function questionDeck(chess,lesson,analysis){
 const e=explainMove(chess,lesson),theory=lesson?.decision?null:getOpeningTheory(lesson?.name)||e.theory,study=lesson?.study,move=e.move;
 const changes=move?`${move.color==='w'?'White':'Black'} played ${move.san}. ${e.authored||e.facts.join(' ')}`:'Compare the center, king safety, and useful development squares before choosing a move.';
 return [
  {id:'lesson',question:study?.question||theory?.question||'What changed after the last move?',explanation:study?.answer||theory?.answer||changes},
  {id:'last-move',question:move?`Why might ${side(move.color)} have played ${move.san}?`:'What should you examine before choosing your first move?',explanation:changes},
  {id:'threats',question:`It is ${side(chess.turn())} to move. Which checks or captures would you calculate first?`,explanation:`Legal checks: ${e.position.checks.slice(0,8).join(', ')||'none'}. Legal captures: ${e.position.captures.slice(0,8).join(', ')||'none'}. Compare the opponent’s strongest reply before deciding. A check or capture is not automatically best.`},
  {id:'white-plan',question:'What is a useful plan for White, and what could Black do against it?',explanation:`White: ${planText(chess,'w',lesson)}\n\nBlack: ${planText(chess,'b',lesson)}`},
  {id:'black-plan',question:'What is a useful plan for Black, and what could White do against it?',explanation:`Black: ${planText(chess,'b',lesson)}\n\nWhite: ${planText(chess,'w',lesson)}`},
  {id:'piece-safety',question:'Which pieces should you check for safety before moving?',explanation:`White’s attacked, geometrically undefended pieces: ${e.position.loose.w.join(', ')||'none detected'}. Black’s: ${e.position.loose.b.join(', ')||'none detected'}. Verify legal captures and recaptures with the free engine; pinned defenders and forcing threats can matter.`},
  {id:'candidate',question:analysis?.lines?.[0]?.san?.[0]?`Stockfish suggests ${analysis.lines[0].san[0]}. What would you calculate to understand it?`:'How would you compare two candidate moves in this position?',explanation:analysis?.lines?.[0]?.san?.length?`Study this limited-search line: ${analysis.lines[0].san.slice(0,8).join(' ')}. Identify threats, captures, king safety, and the resulting structure. Try the strongest defensive reply, not only a cooperative one.`:'Use Analyze candidates to get a free Stockfish line. Compare forcing replies, material changes, and the final position instead of only the first move.'},
  {id:'reflection',question:'What is one idea from this position you could use in your next game?',explanation:study?.why||theory?.structure||'Use a repeatable process: check threats, choose candidate moves, calculate the strongest response, then evaluate the resulting position.'}
 ];
}
export function makeQuestionState(saved={}){return {cursor:Math.max(0,Number(saved.cursor)||0),run:Math.max(0,Number(saved.run)||0),history:Array.isArray(saved.history)?saved.history:[],draft:String(saved.draft||'')}}
export function currentQuestion(state,deck){return {item:deck[state.cursor%deck.length],number:state.cursor%deck.length+1,round:Math.floor(state.cursor/deck.length)+1}}
export function submitQuestion(state,deck,answer){
 const text=String(answer||'').trim();if(!text)return false;
 const current=currentQuestion(state,deck);
 state.history.push({question:current.item.question,answer:text,explanation:current.item.explanation,number:current.number,round:current.round,run:state.run});
 state.draft='';state.cursor++;return true;
}
export function nextQuestion(state){state.draft='';state.cursor++}
export function previousQuestion(state){state.draft='';state.cursor=Math.max(0,state.cursor-1)}
export function restartQuestions(state){state.draft='';state.cursor=0;state.run++}
