export const studySessionKey='knight-school-study-v1';
export function validateStudySession(x){
 if(!x||x.version!==1||!Array.isArray(x.answers)||x.answers.length>1000||!x.answers.every(p=>Array.isArray(p)&&p.length===2&&typeof p[0]==='string'&&p[0].length<200&&Number.isInteger(p[1])&&p[1]>=0&&p[1]<20))throw Error('Invalid saved lesson answers.');
 if(x.last!==null){const s=x.last;if(!s||typeof s.id!=='string'||s.id.length>200||!['learn','test','plan'].includes(s.mode)||!['w','b','both'].includes(s.side)||!['step','errors','hints'].every(k=>Number.isSafeInteger(s[k])&&s[k]>=0&&s[k]<10000)||!Number.isFinite(Date.parse(s.updatedAt)))throw Error('Invalid saved lesson position.');}return x;
}
export function loadStudySession(storage){try{const raw=storage.getItem(studySessionKey);return raw?validateStudySession(JSON.parse(raw)):{version:1,last:null,answers:[]}}catch{return {version:1,last:null,answers:[]}}}
export function saveStudySession(storage,value){validateStudySession(value);storage.setItem(studySessionKey,JSON.stringify(value))}
