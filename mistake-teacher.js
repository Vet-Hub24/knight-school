import {Chess} from './vendor/chess.js?v=32';
export function mistakeLesson(review){const before=new Chess(review.move.before),after=new Chess(review.move.after);const best=review.analysis.moveReview.before[0]?.uci?.[0];let candidate=null;try{candidate=before.move({from:best.slice(0,2),to:best.slice(2,4),promotion:best[4]||'q'})}catch{}
 const board=new Chess(after.fen()),replies=[];for(const u of (review.analysis.lines[0]?.uci||[]).slice(0,6)){try{const m=board.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});replies.push({san:m.san,from:m.from,to:m.to})}catch{break}}
 return {candidate,replies,why:review.report.alerts.filter(a=>['exposed','missed-tactic','missed-capture','alternative'].includes(a.type)),before:review.move.before,after:review.move.after};}
