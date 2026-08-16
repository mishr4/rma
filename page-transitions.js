(() => {
  const style = document.createElement('style');
  style.textContent = `
    html { background: #101010; }
    body { opacity: 0; transform: translateY(22px); transition: opacity .34s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1); }
    body.rma-page-ready { opacity: 1; transform: translateY(0); }
    body.rma-page-leaving { opacity: 0; transform: translateY(-30px); pointer-events: none; }
    .rma-nav-dropdown { position: relative; display: inline-flex; align-items: center; }
    .rma-nav-trigger { appearance: none; border: 0; padding: 0; background: transparent; color: #ddd; font: inherit; font-size: .96rem; cursor: pointer; display: inline-flex; gap: 4px; align-items: center; }
    .rma-nav-trigger::after { content: '⌄'; color: #d700ff; font-size: 1rem; transition: transform .18s ease; }
    .rma-nav-dropdown.is-open .rma-nav-trigger::after { transform: rotate(180deg); }
    .rma-nav-menu { position: absolute; z-index: 30; top: calc(100% + 12px); left: -14px; width: 176px; display: grid; gap: 3px; padding: 8px; border: 1px solid #4e315e; border-radius: 14px; background: #1b1420; box-shadow: 0 18px 36px #0008; opacity: 0; visibility: hidden; transform: translateY(-6px); transition: .18s ease; }
    .rma-nav-dropdown.is-open .rma-nav-menu { opacity: 1; visibility: visible; transform: translateY(0); }
    nav .rma-nav-menu a { padding: 10px 11px; border-radius: 9px; color: #eee; font-size: .9rem; text-decoration: none; }
    nav .rma-nav-menu a:hover { background: #351442; color: #fff; }
    @media (prefers-reduced-motion: reduce) { body, body.rma-page-ready, body.rma-page-leaving { opacity: 1; transform: none; transition: none; } }
  `;
  document.head.appendChild(style);

  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('rma-page-ready')));

  document.querySelectorAll('nav').forEach((nav) => {
    const shows = nav.querySelector('a[href="shows.html"]');
    const channels = nav.querySelector('a[href="channels.html"]');
    if (!shows || !channels) return;
    const dropdown = document.createElement('div');
    dropdown.className = 'rma-nav-dropdown';
    dropdown.innerHTML = '<button class="rma-nav-trigger" type="button" aria-expanded="false">Explore</button><div class="rma-nav-menu"><a href="shows.html">Shows</a><a href="channels.html">Channels</a></div>';
    shows.replaceWith(dropdown);
    channels.remove();
    const trigger = dropdown.querySelector('button');
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', () => document.querySelectorAll('.rma-nav-dropdown.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
    menu.querySelector('button').setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') document.querySelectorAll('.rma-nav-dropdown.is-open').forEach((menu) => {
      menu.classList.remove('is-open');
      menu.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.href === window.location.href || destination.hash && destination.pathname === window.location.pathname) return;
    event.preventDefault();
    document.body.classList.remove('rma-page-ready');
    document.body.classList.add('rma-page-leaving');
    window.setTimeout(() => { window.location.href = destination.href; }, 310);
  });

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('rma-page-leaving');
    document.body.classList.add('rma-page-ready');
  });
})();
