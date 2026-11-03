import {Chess} from './vendor/chess.js?v=12';
export const backupKeys=['knight-school-v1','knight-school-chats-v2','knight-school-questions-v1','knight-school-training-v1','knight-school-chatgpt-destination','knight-school-chatgpt-destination-v1','knight-school-board-theme'];
const textKeys=new Set(['knight-school-chatgpt-destination','knight-school-chatgpt-destination-v1','knight-school-board-theme']);
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const strings=x=>Array.isArray(x)&&x.length<=30000&&x.every(v=>typeof v==='string'&&v.length<=2000);
const count=x=>Number.isSafeInteger(x)&&x>=0;
const iso=x=>typeof x==='string'&&Number.isFinite(Date.parse(x));
function rejectUnsafe(x,depth=0){if(depth>20)throw Error('Backup nesting is too deep.');if(typeof x==='string'&&x.length>100000)throw Error('Backup text is too long.');if(x&&typeof x==='object'){for(const [k,v]of Object.entries(x)){if(['__proto__','prototype','constructor'].includes(k))throw Error('Invalid backup property.');rejectUnsafe(v,depth+1)}}}
export function validateRecord(key,x){
 rejectUnsafe(x);
 if(key==='knight-school-v1'){
  if(!object(x)||!['done','saved','weak','days'].every(k=>strings(x[k]))||!['attempts','correct'].every(k=>count(x[k]))||x.correct>x.attempts||!x.days.every(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)))throw Error('Invalid training progress.');
 }else if(key==='knight-school-chats-v2'||key==='knight-school-questions-v1'){
  if(!Array.isArray(x)||x.length>20000||!x.every(pair=>Array.isArray(pair)&&pair.length===2&&typeof pair[0]==='string'))throw Error('Invalid conversation or question history.');
  for(const [,value]of x){if(key.includes('chats')){if(!Array.isArray(value)||!value.every(m=>object(m)&&['user','assistant'].includes(m.role)&&typeof m.text==='string'))throw Error('Invalid chat messages.')}else if(!object(value)||!count(value.cursor)||!count(value.run)||typeof value.draft!=='string'||!Array.isArray(value.history)||!value.history.every(h=>object(h)&&['question','answer','explanation'].every(k=>typeof h[k]==='string')))throw Error('Invalid question sessions.')}
 }else if(key==='knight-school-training-v1'){
  if(!object(x)||x.version!==1||!object(x.reviews)||!Array.isArray(x.mistakes)||!Array.isArray(x.sessions))throw Error('Invalid spaced repetition data.');
  for(const [key,r]of Object.entries(x.reviews)){if(!object(r)||typeof r.lessonId!=='string'||!['w','b','both'].includes(r.side)||key!==`${r.lessonId}::${r.side}`||!iso(r.due)||!iso(r.lastReviewed)||!Number.isFinite(r.ease)||r.ease<1.3||r.ease>3||!count(r.intervalDays)||r.intervalDays>365||!count(r.repetitions)||!count(r.lapses)||!['again','hard','good','easy'].includes(r.grade))throw Error('Invalid scheduled review.')}
  for(const m of x.mistakes){if(!object(m)||!['id','fenBefore','fenAfter','played','bestMove','bestUci','explanation','grade'].every(k=>typeof m[k]==='string')||!iso(m.createdAt)||!iso(m.updatedAt)||!count(m.reviewCount)||!Array.isArray(m.line)||!m.line.every(s=>typeof s==='string'))throw Error('Invalid mistake record.');try{new Chess(m.fenBefore);new Chess(m.fenAfter)}catch{throw Error('Invalid mistake position.')}}
  if(!x.sessions.every(s=>object(s)&&typeof s.id==='string'&&iso(s.at)))throw Error('Invalid training sessions.');
 }else if(key.includes('destination')){
  if(typeof x!=='string')throw Error('Invalid destination setting.');if(x){let url;try{url=new URL(x)}catch{throw Error('Invalid ChatGPT URL.')}if(url.protocol!=='https:'||!['chatgpt.com','chat.openai.com'].includes(url.hostname)||url.username||url.password||url.port)throw Error('Invalid ChatGPT URL.')}
 }else if(key==='knight-school-board-theme'){if(!['walnut','tournament','slate'].includes(x))throw Error('Invalid board theme.')}else throw Error('Unrecognized backup record.');
 return x;
}
export function makeBackup(storage,now=Date.now()){
 const records={};for(const key of backupKeys){const raw=storage.getItem(key);if(raw===null)continue;records[key]=validateRecord(key,textKeys.has(key)?raw:JSON.parse(raw))}
 return {format:'knight-school-backup',version:1,createdAt:new Date(now).toISOString(),records};
}
export function parseBackup(text){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>8*1024*1024)throw Error('Choose a JSON backup smaller than 8 MB.');
 let x;try{x=JSON.parse(text)}catch{throw Error('This is not readable JSON. Choose a Knight School backup.')}
 if(!x.format&&Array.isArray(x.done)&&Array.isArray(x.saved))x={format:'knight-school-backup',version:1,createdAt:new Date().toISOString(),records:{'knight-school-v1':{done:[],saved:[],weak:[],attempts:0,correct:0,days:[],...x}}};
 if(x.format!=='knight-school-backup'||x.version!==1||!object(x.records)||!Object.keys(x.records).length)throw Error('Unsupported or empty Knight School backup.');
 for(const [key,value]of Object.entries(x.records))validateRecord(key,value);
 return x;
}
const union=(a=[],b=[])=>[...new Set([...a,...b])];
function combineRecords(a=[],b=[]){const seen=new Set(a.map(x=>JSON.stringify(x)));return [...a,...b.filter(x=>{const k=JSON.stringify(x);if(seen.has(k))return false;seen.add(k);return true})]}
export function mergeRecord(key,current,incoming){
 if(current===undefined)return incoming;
 if(key==='knight-school-v1')return {...current,...Object.fromEntries(['done','saved','weak','days'].map(k=>[k,union(current[k],incoming[k])])),attempts:Math.max(current.attempts,incoming.attempts),correct:Math.max(current.correct,incoming.correct)};
 if(key==='knight-school-chats-v2'||key==='knight-school-questions-v1'){
  const map=new Map(current);for(const [id,value]of incoming){const old=map.get(id);if(!old){map.set(id,value);continue}map.set(id,key.includes('chats')?combineRecords(old,value):{...old,cursor:Math.max(old.cursor,value.cursor),run:Math.max(old.run,value.run),draft:old.draft||value.draft,history:combineRecords(old.history,value.history)})}return [...map];
 }
 if(key==='knight-school-training-v1'){
  const reviews={...current.reviews};for(const [id,r]of Object.entries(incoming.reviews))if(!reviews[id]||Date.parse(r.lastReviewed)>Date.parse(reviews[id].lastReviewed))reviews[id]=r;
  const map=new Map(current.mistakes.map(m=>[m.id,m]));for(const m of incoming.mistakes){const old=map.get(m.id);if(!old)map.set(m.id,m);else map.set(m.id,{...(Date.parse(m.updatedAt)>Date.parse(old.updatedAt)?m:old),reviewCount:Math.max(old.reviewCount,m.reviewCount),reviewedAt:old.reviewedAt||m.reviewedAt})}
  return {version:1,reviews,mistakes:[...map.values()],sessions:[...new Map([...current.sessions,...incoming.sessions].map(s=>[s.id,s])).values()]};
 }
 return current||incoming; // Preserve this device's existing destination/theme preference.
}
export function restoreBackup(storage,backup){
 const originals=[],writes=[];
 for(const [key,incoming]of Object.entries(backup.records)){
  validateRecord(key,incoming);const raw=storage.getItem(key);originals.push([key,raw]);let current;
  if(raw!==null){current=validateRecord(key,textKeys.has(key)?raw:JSON.parse(raw))}
  const merged=validateRecord(key,mergeRecord(key,current,incoming));writes.push([key,textKeys.has(key)?merged:JSON.stringify(merged)]);
 }
 try{for(const [key,value]of writes)storage.setItem(key,value)}catch{
  let rolledBack=true;for(const [key,raw]of originals){try{raw===null?storage.removeItem(key):storage.setItem(key,raw)}catch{rolledBack=false}}
  throw Error(rolledBack?'Restore failed because browser storage is unavailable or full. Original data was retained.':'Storage failed during restore and rollback. Keep your downloaded safety backup and restore it when storage is available.');
 }
 return writes.length;
}
