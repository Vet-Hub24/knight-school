import {Chess} from './vendor/chess.js?v=9';
export function searchPosition(fen,{time=1800,multipv=3,skill=null}={}){
 const worker=new Worker('./vendor/stockfish-19-lite-single.js');
 let rejectTask,finished=false,ready=false,timer;
 const lines=new Map();
 const promise=new Promise((resolve,reject)=>{
  rejectTask=reject;
  const finish=(error,result)=>{if(finished)return;finished=true;clearTimeout(timer);worker.terminate();error?reject(error):resolve(result)};
  timer=setTimeout(()=>finish(new Error('Stockfish did not respond. Please try again.')),25000);
  worker.onerror=()=>finish(new Error('Stockfish could not load. Your browser needs WebAssembly and Worker support.'));
  worker.onmessage=e=>{for(const msg of String(e.data).split('\n')){
   if(msg==='uciok'){worker.postMessage('setoption name Hash value 32');worker.postMessage('setoption name MultiPV value '+multipv);if(skill!==null)worker.postMessage('setoption name Skill Level value '+skill);worker.postMessage('isready')}
   if(msg==='readyok'&&!ready){ready=true;worker.postMessage('position fen '+fen);worker.postMessage('go movetime '+time)}
   if(msg.startsWith('info ')&&msg.includes(' score ')&&msg.includes(' pv ')){
    const score=msg.match(/score (cp|mate) (-?\d+)/);if(!score)continue;
    const n=Number(msg.match(/multipv (\d+)/)?.[1]||1),sign=new Chess(fen).turn()==='w'?1:-1;
    const uci=msg.split(' pv ')[1].trim().split(' ');const c=new Chess(fen),san=[];
    for(const mv of uci){try{san.push(c.move({from:mv.slice(0,2),to:mv.slice(2,4),promotion:mv[4]||'q'}).san)}catch{break}}
    lines.set(n,{depth:Number(msg.match(/depth (\d+)/)?.[1]||0),scoreWhite:score[1]==='cp'?Number(score[2])/100*sign:null,mateWhite:score[1]==='mate'?Number(score[2])*sign:null,uci:uci.slice(0,san.length),san});
   }
   if(msg.startsWith('bestmove ')){const bestMove=msg.split(' ')[1];finish(null,{fen,bestMove,lines:[...lines.entries()].sort((a,b)=>a[0]-b[0]).map(x=>x[1])})}
  }};worker.postMessage('uci');
 });
 return {promise,terminate(){if(finished)return;finished=true;clearTimeout(timer);worker.terminate();const e=new Error('Analysis canceled.');e.name='AbortError';rejectTask(e)}};
}
