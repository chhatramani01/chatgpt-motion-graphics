import{spawnSync}from'node:child_process';
function run(cmd,args){const r=spawnSync(cmd,args,{stdio:'inherit'});if(r.status!==0)throw Error(cmd+' failed with '+r.status)}
run('node',['scripts/contact-sheet.mjs','examples/demo/scene.html','output/contact.png','8']);
run('node',['scripts/render.mjs','examples/demo/scene.html','output/silent.mp4','8','30','1280','720']);
run('node',['scripts/sfx.mjs','output/effects.wav']);
run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i','output/silent.mp4','-i','output/effects.wav','-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','output/demo.mp4']);
run('node',['scripts/verify.mjs','output/demo.mp4','1280','720']);
console.log('Complete: output/demo.mp4 and output/contact.png');
