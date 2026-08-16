(() => {
  const style = document.createElement('style');
  style.textContent = `
    html { background: #101010; }
    body { opacity: 0; transform: translateY(22px); transition: opacity .34s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1); }
    body.rma-page-ready { opacity: 1; transform: translateY(0); }
    body.rma-page-leaving { opacity: 0; transform: translateY(-30px); pointer-events: none; }
    @media (prefers-reduced-motion: reduce) { body, body.rma-page-ready, body.rma-page-leaving { opacity: 1; transform: none; transition: none; } }
  `;
  document.head.appendChild(style);

  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('rma-page-ready')));

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
