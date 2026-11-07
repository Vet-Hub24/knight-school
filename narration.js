import {orderedVoices,selectedVoiceURI} from './narration-content.js?v=21';
export function spokenChess(text){return String(text).replace(/O-O-O/g,'castle queenside').replace(/O-O/g,'castle kingside').replace(/\b([KQRBN]|[a-h](?=x))?(x)?([a-h])([1-8])(?:=([QRBN]))?([+#])?/g,(_,p,x,f,r,prom,check)=>`${({K:'king',Q:'queen',R:'rook',B:'bishop',N:'knight'})[p]||'pawn'} ${x?'takes on':'to'} ${f}-${({1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight'})[r]}${prom?' promotes to '+({Q:'queen',R:'rook',B:'bishop',N:'knight'})[prom]:''}${check==='#'?', checkmate':check==='+'?', check':''}`).replace(/[★✓×]/g,'');}
export function createNarrator({synth,Utterance,onStatus=()=>{},schedule=setTimeout,unschedule=clearTimeout}={}){
 let run=0,paused=false,last=null,active=null,timer=null,status='';
 const emit=message=>{status=message;onStatus(message)};
 const supported=()=>!!synth&&typeof synth.speak==='function'&&typeof Utterance==='function';
 const voiceOptions=()=>{try{return orderedVoices(synth?.getVoices?.()||[])}catch{return []}};
 const voices=()=>voiceOptions().filter(v=>v.localService===true);
 const clearTimer=()=>{if(timer!==null){unschedule(timer);timer=null}};
 function stop(){run++;clearTimer();active=null;paused=false;synth?.cancel?.();emit('Stopped.')}
 function availability(){return !supported()?'Speech is not supported in this browser. Use the written explanation.':voices().length?'On-device voice available. Tap Test voice to check sound.':'No on-device voice is listed. Choose Browser default and tap Test voice. The preview may have no speech engine.'}
 function read(text,{voiceURI='',rate=.75,allowBrowserDefault=false,allowBrowserVoice=false}={}){
  stop();if(!supported()){emit(availability());return false}
  const local=voices(),explicit=allowBrowserVoice?voiceOptions().find(v=>v.voiceURI===voiceURI):null,voice=explicit||local.find(v=>v.voiceURI===voiceURI)||local.find(v=>v.voiceURI===selectedVoiceURI(local))||local[0],useDefault=allowBrowserDefault&&voiceURI==='__default__';
  if(!voice&&!useDefault){emit(availability());return false}
  const content=spokenChess(text).trim();if(!content){emit('There is no explanation to read in this position.');return false}
  last={text,options:{voiceURI,rate,allowBrowserDefault,allowBrowserVoice}};const token=run;
  // Keep a strong reference until speech ends. Begin speaking inside the tap handler.
  // Queue each sentence; never claim audio started until the browser sends onstart.
  const parts=content.match(/[^.!?]+[.!?]?/g)||[content];let i=0;
  function next(){
   if(token!==run)return;clearTimer();if(i>=parts.length){active=null;paused=false;emit('Finished.');return}
   const u=new Utterance(parts[i++]);active=u;if(!useDefault&&voice)u.voice=voice;u.lang=useDefault?'en-US':voice.lang;u.rate=Math.max(.6,Math.min(1.4,Number(rate)||.75));u.volume=1;
   u.onstart=()=>{if(token!==run)return;clearTimer();emit('Reading aloud…')};
   u.onend=()=>{if(token===run)next()};
   u.onerror=event=>{if(token!==run)return;clearTimer();active=null;paused=false;run++;const code=event?.error||'unknown';emit(code==='not-allowed'?'Speech was blocked. Tap Test voice directly in Safari, then try again.':(['voice-unavailable','language-unavailable','synthesis-unavailable'].includes(code)||(code==='synthesis-failed'&&!voices().length))?'This browser has no working speech voice. Try Knight School directly in Safari on your device.':code==='audio-busy'?'Audio is busy. Stop other playback and tap Test voice again.':'Speech could not play ('+code+'). Check device volume and audio output, then tap Test voice.')};
   emit('Starting speech…');timer=schedule(()=>{if(token!==run||active!==u)return;active=null;run++;synth.cancel();emit('Speech did not start. This preview may not support audio. Try Test voice in Safari on your device and check volume and audio output.')},6000);timer?.unref?.();
   try{synth.speak(u)}catch{clearTimer();active=null;run++;emit('This browser could not start speech. Try Test voice directly in Safari.')}
  }
  next();return true;
 }
 return {voices,voiceOptions,supported,availability,status:()=>status,read,stop,repeat(){if(last)return read(last.text,last.options);emit('Tap Explain aloud or Test voice first.');return false},pause(){if(!active){emit('Nothing is speaking. Tap Explain aloud to start.');return}paused=!paused;paused?synth.pause():synth.resume();emit(paused?'Paused.':'Resuming speech…')}};
}
