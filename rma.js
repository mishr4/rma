(()=>{'use strict';const button=document.querySelector('.menu-toggle'),nav=document.querySelector('#rma-navigation');
const close=()=>{button?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');};
button?.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=button?.getAttribute('aria-expanded')==='true';close();if(open)button.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.rma-header'))close();});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))close();});
window.matchMedia('(min-width: 901px)').addEventListener('change',e=>{if(e.matches)close();});
})();
