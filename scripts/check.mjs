import{existsSync,readFileSync,readdirSync}from'node:fs';import assert from'node:assert/strict';
const a=JSON.parse(readFileSync('assets/atlas/styles.json','utf8'));
assert.equal(a.length,86);assert.equal(new Set(a.map(s=>s.id)).size,86);
for(const s of a){for(const p of ['STYLE.md','PROMPT.md'])assert(existsSync('styles/atlas/'+s.id+'/'+p));for(const k of ['description','motion','explainerNote','poster','clip','explainer'])assert(s[k]);}
const skills=readdirSync('skills',{withFileTypes:true}).filter(d=>d.isDirectory());assert.equal(skills.length,47);for(const d of skills)assert(existsSync('skills/'+d.name+'/SKILL.md'));
for(const p of ['prompts/PASTE_IN_CHATGPT.md','docs/INSTALL_CHATGPT.md','tools/align.py','tools/mouth.py','tools/transcribe.sh'])assert(existsSync(p));
const readme=readFileSync('README.md','utf8');assert(readme.includes(a[85].poster));assert(readme.includes('46 detailed video-format skills'));for(const p of ['scripts/contact-sheet.mjs','claude-video-render.mjs','templates/production_report.md'])assert(existsSync(p));
for(const p of ['.agents/skills/motion-graphics/SKILL.md','.claude/skills/motion-graphics/SKILL.md','skills/motion-video-studio/SKILL.md']){const s=readFileSync(p,'utf8');assert(s.includes('window.renderAt(t)'));assert(s.includes('Storyboards')||s.includes('Storyboard'));assert(s.includes('contact sheet'));assert(s.includes('awesomeclaude.ai'));}
console.log('Validated authoritative renderAt(t) storyboard/contact-sheet contract.');
console.log('Validated 86 full visual prompts + 46 workflow agents + master instructions + tools.');
