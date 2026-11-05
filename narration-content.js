// Speech is composed from teaching data, never from rendered cards or controls.
export function buildNarration(context={},scope='move'){
 if(context.hidden)return '';
 const text=[context.lead,context.reason];
 if(scope==='theory'&&context.allowTheory!==false){text.push(context.theory);if(context.whitePlan)text.push('White’s plan. '+context.whitePlan);if(context.blackPlan)text.push('Black’s plan. '+context.blackPlan)}
 const seen=new Set();return text.filter(s=>typeof s==='string'&&s.trim()).map(s=>s.trim()).filter(s=>{if(seen.has(s))return false;seen.add(s);return true}).join('\n\n');
}
export const narrationSettingsKey='knight-school-narration-v1';
export function validateNarrationSettings(x){if(!x||typeof x!=='object'||typeof x.voiceURI!=='string'||x.voiceURI.length>1000||typeof x.rate!=='number'||!Number.isFinite(x.rate)||x.rate<.6||x.rate>1.4||!['move','theory'].includes(x.scope))throw Error('Invalid narration preferences.');return {voiceURI:x.voiceURI,rate:x.rate,scope:x.scope}}
export function loadNarrationSettings(storage){try{return validateNarrationSettings(JSON.parse(storage.getItem(narrationSettingsKey)))}catch{return {voiceURI:'',rate:.75,scope:'move'}}}
export function saveNarrationSettings(storage,settings){storage.setItem(narrationSettingsKey,JSON.stringify(validateNarrationSettings(settings)))}
export function orderedVoices(list=[]){const seen=new Set();return list.filter(v=>v&&typeof v.voiceURI==='string'&&!seen.has(v.voiceURI)&&seen.add(v.voiceURI)).sort((a,b)=>{const rank=v=>(/^en(?:[-_]|$)/i.test(v.lang)?100:0)+(v.localService===true?20:0)+(/enhanced|premium|natural|neural/i.test(v.name)?10:0)+(v.default?1:0);return rank(b)-rank(a)||String(a.name).localeCompare(String(b.name))})}

export function selectedVoiceURI(list=[],saved=''){if(saved==='__default__'||list.some(v=>v.voiceURI===saved))return saved;const choices=orderedVoices(list);return (choices.find(v=>v.localService===true&&String(v.name).trim().toLowerCase()==='samantha'&&String(v.lang).replace('_','-').toLowerCase()==='en-us')||choices.find(v=>v.localService===true&&/^en(?:[-_]|$)/i.test(v.lang))||choices.find(v=>v.localService===true))?.voiceURI||'__default__'}

export function createAutoExplanationGate(){let previous='';return {reset(){previous=''},accept({enabled,blocked,fen,san,text}){if(!enabled||blocked||!fen||!san||!text)return false;const key=fen+'|'+san+'|'+text;if(key===previous)return false;previous=key;return true}}}
