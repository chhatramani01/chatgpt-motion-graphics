import{existsSync,readFileSync,readdirSync}from'node:fs';import assert from'node:assert/strict';
const a=JSON.parse(readFileSync('assets/atlas/styles.json','utf8'));
assert.equal(a.length,86);assert.equal(new Set(a.map(s=>s.id)).size,86);
for(const s of a){for(const p of ['STYLE.md','PROMPT.md'])assert(existsSync('styles/atlas/'+s.id+'/'+p));for(const k of ['description','motion','explainerNote','poster','clip','explainer'])assert(s[k]);}
const skills=readdirSync('skills',{withFileTypes:true}).filter(d=>d.isDirectory());assert.equal(skills.length,47);for(const d of skills)assert(existsSync('skills/'+d.name+'/SKILL.md'));
for(const p of ['prompts/PASTE_IN_CHATGPT.md','docs/INSTALL_CHATGPT.md','tools/align.py','tools/mouth.py','tools/transcribe.sh'])assert(existsSync(p));
const readme=readFileSync('README.md','utf8');assert(readme.includes(a[85].poster));assert(readme.includes('46 detailed video-format skills'));console.log('Validated 86 full visual prompts + 46 workflow agents + master instructions + tools.');
