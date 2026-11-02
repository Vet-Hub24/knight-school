let deferredInstall=null,registration=null;
const $=id=>document.getElementById(id);
export function initPWA(showModal){
 const button=$('installApp');
 function installed(){return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}
 function openInstructions(){
  showModal(`<p class="eyebrow">KNIGHT SCHOOL · FREE HOME-SCREEN APP</p><h2>Your chess room. On your iPhone.</h2><img class="install-icon" src="./assets/icons/apple-touch-icon.png" width="90" height="90" alt="Knight School app icon"><p>${installed()?'You are already using the home-screen app.':'No App Store purchase, developer membership, or subscription is needed.'}</p><ol class="install-steps"><li>Open Knight School in <b>Safari</b>.</li><li>Open the <b>Share</b> menu and choose <b>Add to Home Screen</b> (look under More if needed).</li><li>Leave <b>Open as Web App</b> on if offered, then tap <b>Add</b>.</li><li>Launch <b>Knight School</b> from its home-screen icon.</li></ol><p id="offlineStatus" role="status">${registration?.active?'Offline study files are installed. Allow the first download to finish before going offline.':'Offline caching becomes available on HTTPS after the site is approved and published.'}</p><p>Lessons and Stockfish can work offline once their files are cached. Ask ChatGPT needs an internet connection. This is a web app, not an App Store download.</p><div class="button-row">${deferredInstall?'<button class="primary" id="browserInstall">Install on this device</button>':''}${registration?.waiting?'<button class="secondary" id="updateApp">Load available update</button>':''}<button class="secondary" id="backupBeforeInstall">Back up progress first</button></div><p class="notice">Safari and home-screen apps can keep separate storage. Download a complete backup first; use Training progress → Restore on the home-screen app if your progress is missing. Browser storage may be cleared by the device.</p>`);
  if($('browserInstall'))$('browserInstall').onclick=async()=>{const prompt=deferredInstall;if(!prompt)return;await prompt.prompt();deferredInstall=null};
  if($('updateApp'))$('updateApp').onclick=()=>registration.waiting?.postMessage({type:'SKIP_WAITING'});
  $('backupBeforeInstall').onclick=()=>{document.querySelector('#modal').close();document.querySelector('#progressButton').click()};
 }
 button.onclick=openInstructions;
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstall=event;button.textContent='Install app';button.hidden=false});
 window.addEventListener('appinstalled',()=>{deferredInstall=null;button.textContent='App ready'});
 function connectivity(){document.documentElement.dataset.connection=navigator.onLine?'online':'offline';$('connectionStatus').textContent=navigator.onLine?'Local engine · no API calls':'Offline · cached study';}
 window.addEventListener('online',connectivity);window.addEventListener('offline',connectivity);connectivity();
 if('serviceWorker' in navigator&&window.isSecureContext){
  navigator.serviceWorker.register(new URL('./sw.js',import.meta.url),{scope:'./',updateViaCache:'none'}).then(reg=>{
   registration=reg;
   function waiting(){if(reg.waiting&&navigator.serviceWorker.controller){button.textContent='App update ready';button.title='Finish your study, then open this button to load the update.'}}
   waiting();reg.addEventListener('updatefound',()=>reg.installing?.addEventListener('statechange',waiting));
  }).catch(()=>{button.title='Install help; offline cache is currently unavailable.'});
  let refreshing=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(refreshing)return;refreshing=true;/* Only a waiting update requested from the install panel reloads. */if(registration?.waiting===null&&button.textContent==='App update ready')window.location.reload()});
 }
}
