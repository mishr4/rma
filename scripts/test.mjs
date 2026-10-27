import assert from 'node:assert/strict';import{readFile,readdir,stat}from'node:fs/promises';import{resolve,dirname,join}from'node:path';import{fileURLToPath}from'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');let checks=0;const check=(condition,message)=>{assert.ok(condition,message);checks++;};
for(const file of(await readdir(root)).filter(f=>f.endsWith('.html'))){
 const html=await readFile(join(root,file),'utf8');
 check((html.match(/class="rma-header"/g)||[]).length===1,file+' one shared header');
 check((html.match(/class="rma-footer"/g)||[]).length===1,file+' one shared footer');
 check(html.includes('mavion-identity.js?v=1')&&!html.includes('class="network-identity"'),file+' actual shared identity');
 check(html.includes('material-icons.js?v=1'),file+' Material SVGs');
 check((html.match(/<main\b/g)||[]).length===1,file+' one main');
 check(!html.includes('page-transitions.js'),file+' no competing injected style layers');
 check(html.includes('id="main"'),file+' skip destination');
 check(html.includes('rma-redesign.css?v=3'),file+' design');
 check(html.includes('rel="canonical"'),file+' canonical');
 for(const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)){
  if(/^(https?:|mailto:|data:|javascript:)/.test(m[1]))continue;
  await stat(resolve(root,m[1].replace(/^\//,'')));checks++;
 }
}
const js=await readFile(join(root,'rma.js'),'utf8');check(js.includes("e.key==='Escape'"),'keyboard dismissal');check((await readFile(join(root,'rma-redesign.css'),'utf8')).includes('prefers-reduced-motion'),'reduced motion');check((await readFile(join(root,'index.html'),'utf8')).includes('illustrative concepts'),'no fake releases');console.log('RMA: '+checks+' page, navigation, asset, and accessibility checks passed.');
