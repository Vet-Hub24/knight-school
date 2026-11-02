// Keep one coherent ES-module graph and defeat stale GitHub Pages browser caches.
import {readdir,readFile,writeFile} from 'node:fs/promises';
const version=process.argv[2];if(!/^[A-Za-z0-9.-]+$/.test(version||''))throw Error('Usage: node scripts/version-assets.mjs <version>');
for(const file of (await readdir('.')).filter(f=>f.endsWith('.js')&&f!=='sw.js')){const source=await readFile(file,'utf8');await writeFile(file,source.replace(/(from\s+['"]\.\/[^'"?]+\.js)(?:\?v=[^'"]+)?(['"])/g,`$1?v=${version}$2`))}
const index=await readFile('index.html','utf8');await writeFile('index.html',index.replace(/((?:app\.js|style\.css)\?v=)[^'"]+/g,`$1${version}`));
const sw=await readFile('sw.js','utf8');await writeFile('sw.js',sw.replace(/(const CACHE=PREFIX\+')[^']+/,`$1release-${version}`));
console.log('Versioned module graph, stylesheet, and offline cache:',version);
