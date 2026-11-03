import {coachReport} from './free-coach.js?v=9';
export const trainingKey='knight-school-training-v1';
export const DAY=86400000;
export const reviewKey=(lessonId,side)=>`${lessonId}::${side}`;
export function emptyTraining(){return {version:1,reviews:{},mistakes:[],sessions:[]}}
export function loadTraining(storage){try{const x=JSON.parse(storage.getItem(trainingKey));if(x?.version===1&&x.reviews&&Array.isArray(x.mistakes)&&Array.isArray(x.sessions))return x}catch{}return emptyTraining()}
export function scheduleReview(previous,{lessonId,side,grade,now=Date.now()}){
 if(!['again','hard','good','easy'].includes(grade)||!['w','b','both'].includes(side)||!lessonId)throw Error('Invalid opening review');
 const old=previous||{},ease=Math.max(1.3,Math.min(3,(old.ease||2.5)+(grade==='easy'?.15:grade==='hard'?-.15:grade==='again'?-.2:0)));
 const repetitions=grade==='again'?0:(old.repetitions||0)+1;
 const intervalDays=grade==='again'?0:grade==='hard'?Math.max(1,Math.round((old.intervalDays||0)*1.2)):grade==='easy'?Math.min(365,Math.max(4,Math.round((old.intervalDays||1)*ease*1.3))):Math.min(365,repetitions===1?1:repetitions===2?3:Math.max(1,Math.round((old.intervalDays||1)*ease)));
 return {lessonId,side,grade,ease,intervalDays,repetitions,lapses:(old.lapses||0)+(grade==='again'?1:0),lastReviewed:new Date(now).toISOString(),due:new Date(now+(grade==='again'?600000:intervalDays*DAY)).toISOString()};
}
export function dueReviews(training,now=Date.now()){return Object.values(training.reviews).filter(x=>Date.parse(x.due)<=now).sort((a,b)=>Date.parse(a.due)-Date.parse(b.due))}
export function createMistake(chess,analysis,lessonId,now=Date.now()){
 if(!analysis||analysis.fen!==chess.fen()||!analysis.moveReview)return null;
 const report=coachReport(chess,analysis),grade=report.classification,last=chess.history({verbose:true}).at(-1),best=analysis.moveReview.before?.[0];
 if(!last||!best?.uci?.[0]||!grade||!['blunder','mistake','inaccuracy'].includes(grade.code))return null;
 return {id:`${last.before}|${last.san}`,lessonId:lessonId||'practice',fenBefore:last.before,fenAfter:chess.fen(),played:last.san,mover:last.color,bestMove:best.san?.[0]||best.uci[0],bestUci:best.uci[0],line:best.san||[],grade:grade.label,loss:grade.loss,explanation:[report.summary,...report.alerts.map(x=>`${x.title}: ${x.text}`)].join('\n\n'),createdAt:new Date(now).toISOString(),updatedAt:new Date(now).toISOString(),reviewCount:0};
}
export function rememberMistake(training,mistake){if(!mistake)return false;const old=training.mistakes.find(x=>x.id===mistake.id);if(old)Object.assign(old,mistake,{createdAt:old.createdAt,reviewCount:old.reviewCount||0,reviewedAt:old.reviewedAt});else training.mistakes.unshift(mistake);return true}
