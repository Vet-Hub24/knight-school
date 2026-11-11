// Scope-qualified caches cannot evict another GitHub Pages project's data.
const BASE=new URL(self.registration.scope);
const PREFIX='knight-school:'+BASE.pathname+':';
const CACHE=PREFIX+'release-31';
const CORE=['deep-opening.js','added-openings.js','daily-training.js','mistake-teacher.js','home.js','more-guided.js','play-learning.js','opening-side.js','narration-content.js','deviations.js','practice-review.js','narration.js','study-session.js','plan-lessons.js','./','index.html','app.js','teach-me.js','teach-branches.js','board-guidance.js','style.css','pieces.js','engine.js','coach.js','free-coach.js','coach-questions.js','training.js','backup.js','pwa.js','content.js','extra-openings.js','advanced.js','opening-theory.js','master-notes.js','openings.json','master-games.json','manifest.webmanifest','vendor/chess.js','vendor/stockfish-19-lite-single.js','vendor/stockfish-19-lite-single.wasm','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/apple-touch-icon.png',...['w','b'].flatMap(c=>['K','Q','R','B','N','P'].map(p=>'assets/pieces/'+c+p+'.svg'))];
const ALLOWED=new Set(CORE.map(path=>new URL(path,BASE).pathname));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE.map(path=>new URL(path,BASE).href)))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);await self.clients.claim()})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||!ALLOWED.has(url.pathname))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE),isStaticAsset=/\.(svg|png|wasm)$/.test(url.pathname);
  if(isStaticAsset){const cached=await cache.match(request,{ignoreSearch:true});if(cached)return cached}
  try{const response=await fetch(request);if(response.ok){const key=request.mode==='navigate'?new URL('index.html',BASE).href:request;await cache.put(key,response.clone())}return response}catch{
   const cached=await cache.match(request,{ignoreSearch:true})||(request.mode==='navigate'?await cache.match(new URL('index.html',BASE).href):null);
   return cached||new Response('This study file is not cached yet. Reconnect and open Knight School once.',{status:503,headers:{'Content-Type':'text/plain'}});
  }
 })());
});
