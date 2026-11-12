import {Chess} from './vendor/chess.js?v=32';
import {reviewClassification,coachReport} from './free-coach.js?v=32';
export function practiceSample(board,color,limit=6){return board.history({verbose:true}).filter(m=>m.color===color).slice(-limit).map(m=>({before:m.before,after:m.after,san:m.san,color:m.color,uci:m.from+m.to+(m.promotion||'')}))}
export function selectPracticeMoment(reviews){const ranks={blunder:3,mistake:2,inaccuracy:1,good:0,unrated:-1};return reviews.map(r=>({...r,grade:reviewClassification(r.analysis.moveReview.before[0],r.analysis.moveReview.after[0],r.move.color)})).sort((a,b)=>(ranks[b.grade.code]??-1)-(ranks[a.grade.code]??-1)||(b.grade.loss??0)-(a.grade.loss??0))[0]||null}
export function practiceMomentReport(moment){const board=new Chess(moment.move.before);board.move(moment.move.san);return coachReport(board,moment.analysis)}

export function selectPracticeMoments(reviews,limit=3){const pending=[...reviews],out=[];while(pending.length&&out.length<limit){const best=selectPracticeMoment(pending);out.push(best);pending.splice(pending.findIndex(r=>r.move.before===best.move.before&&r.move.uci===best.move.uci),1)}return out}
