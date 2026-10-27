(()=>{'use strict';const button=document.querySelector('.menu-toggle'),nav=document.querySelector('#rma-navigation');
const icons=window.MaterialIcons||{},login=document.querySelector('.rma-login');
if(login&&icons.face){login.innerHTML=icons.face+'<span>Log in</span>';login.setAttribute('aria-label','Log in');login.href='https://sso.tmc.gg/?return=https%3A%2F%2Frma.tmc.gg%2F';}
if(button&&icons.menu)button.querySelector('svg').outerHTML=icons.menu;
document.querySelectorAll('span[aria-hidden="true"]').forEach(el=>{if(el.textContent.trim()==='↗'&&icons.arrow)el.outerHTML=icons.arrow;});
fetch('https://sso.tmc.gg/api/me',{credentials:'include',signal:AbortSignal.timeout(6000)}).then(r=>r.ok?r.json():null).then(data=>{if(!data?.user||!login)return;window.MavionIdentity?.setUser(data.user);login.href='https://sso.tmc.gg/account';login.setAttribute('aria-label','Your account');const label=login.querySelector('span');if(label)label.textContent='Your account';if(data.user.avatar_url){try{const url=new URL(data.user.avatar_url,'https://sso.tmc.gg');if(url.protocol==='https:'){const image=document.createElement('img');image.src=url.href;image.alt='';image.width=26;image.height=26;image.referrerPolicy='no-referrer';image.onerror=()=>image.replaceWith(new DOMParser().parseFromString(icons.face,'image/svg+xml').documentElement);login.querySelector('svg')?.replaceWith(image);}}catch{}}}).catch(()=>{});
const close=()=>{button?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');};
button?.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=button?.getAttribute('aria-expanded')==='true';close();if(open)button.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.rma-header'))close();});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))close();});
window.matchMedia('(min-width: 901px)').addEventListener('change',e=>{if(e.matches)close();});
})();
