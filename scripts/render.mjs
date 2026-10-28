// Offline deterministic frame renderer: node scripts/render.mjs scene.html out.mp4 seconds fps width height
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const [source='examples/demo/scene.html',destination='output/silent.mp4',seconds='8',fps='30',width='1280',height='720']=process.argv.slice(2);
const D=Number(seconds),FPS=Number(fps),W=Number(width),H=Number(height);
if(!Number.isFinite(D)||D<=0||!Number.isInteger(FPS)||FPS<1||!Number.isInteger(W)||!Number.isInteger(H)||W<2||H<2||W%2||H%2)
 throw Error('Expected duration >0; integer FPS; positive even width/height');
mkdirSync(dirname(resolve(destination)),{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined});
try {
 const cx=await browser.newContext({viewport:{width:W,height:H},deviceScaleFactor:1});
 await cx.addInitScript(()=>{
   Object.defineProperty(window,'__MOTION_RENDER_MODE__',{value:true});
   // The agent draws via renderAt(t); never use wall-clock or RAF during export.
   window.requestAnimationFrame=()=>0;
   window.cancelAnimationFrame=()=>{};
 });
 const page=await cx.newPage();
 await page.goto(pathToFileURL(resolve(source)).href,{waitUntil:'load'});
 await page.evaluate(async({W,H})=>{
   const canvas=document.querySelector('canvas');
   if(!canvas)throw Error('scene.html must contain a canvas');
   canvas.width=W; canvas.height=H;
   canvas.style.width=W+'px'; canvas.style.height=H+'px'; canvas.style.maxWidth='none'; canvas.style.maxHeight='none';
   await document.fonts.ready;
   await Promise.all([...document.images].map(img=>img.decode?.().catch(()=>{})||Promise.resolve()));
 },{W,H});
 const ff=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate',String(FPS),'-i','-','-an','-c:v','libx264','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',resolve(destination)],{stdio:['pipe','inherit','inherit']});
 const completion=new Promise((yes,no)=>{ff.on('error',no);ff.stdin.on('error',no);ff.on('close',code=>code===0?yes():no(Error('ffmpeg exited '+code)))});
 const count=Math.ceil(D*FPS);
 for(let f=0;f<count;f++){
   await page.evaluate(t=>{
     const draw=window.renderAt||window.seek;
     if(typeof draw!=='function')throw Error('scene must expose window.renderAt(t)');
     draw(t);
   },f/FPS);
   const png=await page.locator('canvas').first().screenshot({type:'png',animations:'disabled'});
   if(!ff.stdin.write(png))await new Promise(done=>ff.stdin.once('drain',done));
 }
 ff.stdin.end();await completion;
 console.log('OK rendered',destination,'frames',count,'resolution',W+'x'+H);
} finally {await browser.close()}
