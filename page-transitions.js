(() => {
  const style = document.createElement('style');
  style.textContent = `
    html { background: #101010; }
    body { opacity: 0; transform: translateY(22px); transition: opacity .34s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1); }
    body.rma-page-ready { opacity: 1; transform: translateY(0); }
    body.rma-page-leaving { opacity: 0; transform: translateY(-30px); pointer-events: none; }
    .rma-nav-dropdown { position: relative; display: inline-flex; align-items: center; }
    .rma-nav-trigger { appearance: none; border: 0; outline: 0; padding: 0; background: transparent; color: #ddd; font: inherit; font-size: .96rem; cursor: pointer; display: inline-flex; gap: 8px; align-items: center; }
    .rma-nav-trigger::after { content: ''; width: 6px; height: 6px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; transform: rotate(45deg) translateY(-2px); transition: transform .18s ease; }
    .rma-nav-trigger:focus-visible { outline: 2px solid #d700ff; outline-offset: 5px; border-radius: 3px; }
    .rma-nav-dropdown.is-open .rma-nav-trigger::after { transform: rotate(225deg) translateY(-1px); }
    .rma-nav-menu { position: absolute; z-index: 30; top: calc(100% + 12px); left: -14px; width: 176px; display: grid; gap: 3px; padding: 8px; border: 1px solid #4e315e; border-radius: 14px; background: #1b1420; box-shadow: 0 18px 36px #0008; opacity: 0; visibility: hidden; transform: translateY(-6px); transition: .18s ease; }
    .rma-nav-dropdown.is-open .rma-nav-menu { opacity: 1; visibility: visible; transform: translateY(0); }
    nav .rma-nav-menu a { padding: 10px 11px; border-radius: 9px; color: #eee; font-size: .9rem; text-decoration: none; }
    nav .rma-nav-menu a:hover { background: #351442; color: #fff; }
    @media (prefers-reduced-motion: reduce) { body, body.rma-page-ready, body.rma-page-leaving { opacity: 1; transform: none; transition: none; } }
  `;
  document.head.appendChild(style);

  const tmcStyle = document.createElement('style');
  tmcStyle.textContent = `
    :root { --tmc-blue:#0a43e8; --tmc-lime:#caff36; --tmc-ink:#080b12; --tmc-paper:#f6f7fa; --tmc-line:#d7dbe4; }
    html { background:var(--tmc-paper); } body { background:var(--tmc-paper); color:var(--tmc-ink); font-family:Inter,Arial,Helvetica,sans-serif; }
    .topbar { max-width:none; height:72px; padding-inline:6vw; background:var(--tmc-blue); border-bottom:1px solid rgba(255,255,255,.26); }
    .topbar .brand img { width:112px; height:34px; } nav { gap:25px; } nav a,.rma-nav-trigger { color:rgba(255,255,255,.84); font-size:.9rem; } nav a:hover,.rma-nav-trigger:hover { color:var(--tmc-lime); }
    .tmc-login { color:#fff; text-decoration:none; font-size:.9rem; font-weight:700; white-space:nowrap; } .tmc-login:hover { color:var(--tmc-lime); }
    .watch-button,.primary-button { background:var(--tmc-lime); color:var(--tmc-ink); border-radius:0; box-shadow:none; } .watch-button:hover,.primary-button:hover { background:#dcff65; }
    .rma-nav-trigger:focus-visible,.rma-page-ready a:focus-visible { outline-color:var(--tmc-lime); }.rma-nav-menu { border-color:#264fce; border-radius:0; background:#0735b8; box-shadow:7px 7px 0 #071c60; } nav .rma-nav-menu a { color:#fff; } nav .rma-nav-menu a:hover { background:#0a43e8; color:var(--tmc-lime); }
    .hero { min-height:570px; margin-top:0; padding:clamp(72px,10vw,126px) 6vw 80px; border:0; border-radius:0; background:#fff; box-shadow:none; }
    .hero h1,.page-hero h1,h2,h3 { font-family:Inter,Arial,Helvetica,sans-serif; font-weight:800; letter-spacing:-.065em; }.hero h1 { max-width:760px; color:var(--tmc-ink); }.hero h1::first-line { color:var(--tmc-blue); }.hero-copy { color:#3c4250; max-width:540px; }.eyebrow,.tag { color:var(--tmc-blue); font-family:"DM Sans",Arial,sans-serif; letter-spacing:.12em; }
    .signal { border-radius:0; box-shadow:none; }.signal-one { width:45%;height:100%;right:0;top:0;opacity:1;background:var(--tmc-blue);clip-path:polygon(30% 0,100% 0,100% 100%,0 100%,20% 54%); }.signal-one::after { background:linear-gradient(135deg,transparent 0 42%,#ffffff38 42.3% 43%,transparent 43.3% 59%,#caff36 59.3% 60%,transparent 60.3%); }.signal-two { display:none; }
    .section { padding:86px 6vw; }.section-heading { border-top:2px solid var(--tmc-blue); padding-top:17px; }.section-heading h2,.association h2 { color:var(--tmc-ink); }.text-link { color:var(--tmc-ink); }.text-link:hover { color:var(--tmc-blue); }
    .story-grid { gap:0; border:1px solid var(--tmc-line); }.story { min-height:392px; border-radius:0; box-shadow:none; border-right:1px solid var(--tmc-line); }.story:last-child { border-right:0; }.story:hover { box-shadow:inset 0 -4px 0 var(--tmc-blue); }.art { height:188px; border-bottom:1px solid var(--tmc-line); }.orbital{background:var(--tmc-blue);}.orbital::after{border-radius:0;border-color:var(--tmc-lime);}.dusk{background:#e8eeff;color:var(--tmc-blue);}.neon{background:#111827;color:#fff;}.story-content{padding:20px;}.story h3{color:var(--tmc-ink);}.story p:not(.tag){color:#5e6472;}
    .show-grid{gap:0;border:1px solid var(--tmc-line);}.show-card{border-radius:0;box-shadow:none;border-right:1px solid var(--tmc-line);}.show-card:last-child{border-right:0;}.show-card:hover img{transform:scale(1.02);}.association{margin:0;padding:72px 6vw;background:var(--tmc-blue);}.association .eyebrow,.association h2,.association p:not(.eyebrow){color:#fff;}.association .primary-button{background:var(--tmc-lime);color:var(--tmc-ink);border-radius:0;}.channel-list{gap:0;border:1px solid var(--tmc-line);}.channel-list a,.channel-list span{min-height:160px;padding:24px;border:0;border-radius:0;border-right:1px solid var(--tmc-line);background:#fff;color:var(--tmc-ink);font-family:Inter,Arial,sans-serif;box-shadow:none;}.channel-list>*:last-child{border-right:0;}.channel-list a:hover{transform:none;border-color:var(--tmc-line);box-shadow:inset 0 -4px 0 var(--tmc-blue);}
    .page-hero{max-width:none;padding:88px 6vw 66px;background:#fff;border-bottom:1px solid var(--tmc-line);}.page-hero:after{border-radius:0;border:0;width:38%;height:100%;right:0;top:0;background:var(--tmc-blue);clip-path:polygon(42% 0,100% 0,100% 100%,0 100%);opacity:1;}.page-hero p:not(.eyebrow){color:#4f5665;}.page-main{background:var(--tmc-paper);max-width:none;padding:66px 6vw 100px;}.news-card,.show-feature,.channel-card,.feature,.details-list details{border-radius:0;background:#fff;color:var(--tmc-ink);border-color:var(--tmc-line);box-shadow:none;}.news-card:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--tmc-blue);}.news-card p,.channel-card p,.feature p,.details-list p{color:#5e6472;}.news-card .material-symbols-rounded,.channel-card .material-symbols-rounded,.feature .material-symbols-rounded{color:var(--tmc-blue);}.value-list,.value{border-color:var(--tmc-line);}.value span{color:var(--tmc-blue);}.value p{color:#5e6472;}
    footer{max-width:none;padding:30px 6vw;background:#111;color:#c7cad2;border:0;} footer .brand img{content:url('assets/rma-light.svg');} footer a:hover{color:var(--tmc-lime);}
    .rbsc-page { background:var(--tmc-paper); color:var(--tmc-ink); }.rbsc-page .topbar{background:var(--tmc-blue);}.rbsc-hero{min-height:560px;background:#fff;}.rbsc-stage-lines{background:repeating-linear-gradient(0deg,transparent 0 65px,#0a43e80c 66px 67px);mask-image:none;}.rbsc-hero:after{border-radius:0;border:0;width:44%;height:100%;right:0;bottom:0;background:var(--tmc-blue);box-shadow:none;transform:none;clip-path:polygon(35% 0,100% 0,100% 100%,0 100%);}.rbsc-hero h1{font-family:Inter,Arial,sans-serif;color:var(--tmc-ink);}.rbsc-hero h1 em{color:var(--tmc-blue);-webkit-text-stroke:0;}.rbsc-intro{color:#3c4250;}.rbsc-kicker,.rbsc-page .eyebrow{color:var(--tmc-blue);}.rbsc-event-card{border-color:var(--tmc-ink);border-radius:0;background:#fff;box-shadow:10px 10px 0 var(--tmc-lime);}.rbsc-card-label,.lineup-number,.entry .flag{color:var(--tmc-blue);}.rbsc-date{border-color:var(--tmc-line);}.rbsc-date p,.rbsc-event-card dt,.rbsc-hero-note{color:#5e6472;}.rbsc-event-card dd{color:var(--tmc-ink);}.rbsc-overview{border-color:var(--tmc-line);}.rbsc-overview-copy p,.rbsc-section-heading>p{color:#4f5665;}.rbsc-lineup{border-color:var(--tmc-line);}.rbsc-lineup li{border-color:var(--tmc-line);}.rbsc-lineup li:hover{background:#e8eeff;}.rbsc-lineup li.is-host{background:#e8eeff;box-shadow:inset 4px 0 var(--tmc-blue);}.rbsc-lineup p{color:var(--tmc-blue);}.lineup-song{color:var(--tmc-ink);}.lineup-song small,.lineup-song.muted{color:#5e6472;}.rbsc-vote-panel{border-radius:0;border-color:var(--tmc-blue);background:var(--tmc-blue);}.rbsc-vote-panel .eyebrow,.rbsc-vote-panel h2,.rbsc-vote-panel p:not(.eyebrow),.rbsc-vote-panel-action small{color:#fff;}.rbsc-vote-panel-action>span{color:var(--tmc-lime);}.ballot-title{color:var(--tmc-ink);font-family:Inter,Arial,sans-serif;}.ballot-title span{color:var(--tmc-blue);-webkit-text-stroke:0;}.vote-note{color:#4f5665;}.entry{border-radius:0;border-color:var(--tmc-line);background:#fff;color:var(--tmc-ink);}.entry:hover,.entry:focus-visible{border-color:var(--tmc-blue);background:#e8eeff;}.entry.selected{border-color:var(--tmc-blue);background:#e8eeff;box-shadow:inset 0 -4px 0 var(--tmc-blue);}.entry h3{color:var(--tmc-ink);}.entry p{color:#5e6472;}.ballot-bar{border-radius:0;border-color:var(--tmc-ink);background:#fff;}.ballot-bar p{color:var(--tmc-ink);}.rbsc-page footer{border:0;}
    @media(max-width:800px){.topbar{padding-inline:5vw;}.tmc-login{display:none;}.hero,.page-hero{padding-inline:5vw;}.signal-one{width:66%;clip-path:polygon(55% 0,100% 0,100% 100%,0 100%,27% 58%);}.section{padding:58px 5vw;}.story-grid,.show-grid,.channel-list{border:0;}.story,.show-card,.channel-list a,.channel-list span{border:1px solid var(--tmc-line);margin-bottom:12px;}.page-main{padding-inline:5vw;}.rbsc-hero:after{width:45%;clip-path:polygon(75% 0,100% 0,100% 100%,0 100%);}.rbsc-event-card{background:#fff;}.rbsc-vote-panel{margin-left:5vw;margin-right:5vw;}}
  `;
  tmcStyle.textContent += '.rbsc-page .primary-button{background:var(--tmc-lime);color:var(--tmc-ink);border-radius:0}.rbsc-page .primary-button:hover{background:#dcff65}@media(max-width:800px){.tmc-login{display:inline-flex}.topbar .watch-button{display:none}}';
  document.head.appendChild(tmcStyle);

  const kitStyle = document.createElement('style');
  kitStyle.textContent = `
    @font-face{font-family:"Mavion Sans";src:url("fonts/BBC-Reith-Sans-Regular.ttf") format("truetype");font-weight:400;font-style:normal;font-display:swap}
    :root{--mavion-background:#000222;--mavion-surface:#090B2C;--mavion-text:#FAFAFA;--mavion-muted:#A4A5BC;--mavion-accent:#968EFF;--mavion-accent-dim:rgb(150 142 255 / .14);--mavion-line:rgb(250 250 250 / .10);--mavion-content:1200px;--mavion-outer:1280px;--mavion-gutter:clamp(20px,4vw,40px);--mavion-card-radius:12px;--mavion-card-padding:26px;--mavion-card-gap:18px;--mavion-button-radius:8px;--mavion-ease:cubic-bezier(.16,1,.3,1)}
    html,body,.rbsc-page{background:var(--mavion-background);color:var(--mavion-text)}body{font-family:"Mavion Sans","Helvetica Neue",Arial,sans-serif}.topbar{height:76px;max-width:var(--mavion-outer);margin:auto;padding-inline:var(--mavion-gutter);background:var(--mavion-background);border-bottom:1px solid var(--mavion-line)}.topbar .brand{gap:12px;min-width:128px}.topbar .brand img{width:143px;height:41px;object-fit:contain}.rma-identity{padding-left:12px;border-left:1px solid var(--mavion-line);color:var(--mavion-muted);font:400 .78rem/1.2 "Mavion Sans",Arial,sans-serif;white-space:nowrap}.topbar nav{gap:24px}.topbar nav a,.rma-nav-trigger,.tmc-login{color:var(--mavion-muted);font-family:"Mavion Sans",Arial,sans-serif}.topbar nav a:hover,.rma-nav-trigger:hover,.tmc-login:hover{color:var(--mavion-text)}.watch-button,.primary-button,.rbsc-page .primary-button{min-height:44px;padding:0 18px;background:var(--mavion-accent);color:var(--mavion-background);border-radius:var(--mavion-button-radius);box-shadow:none;font-family:"Mavion Sans",Arial,sans-serif;font-weight:400}.watch-button:hover,.primary-button:hover,.rbsc-page .primary-button:hover{background:#b4afff;color:var(--mavion-background);transform:translateY(-1px)}.tmc-identity{max-width:var(--mavion-outer);margin:0 auto;padding:0 var(--mavion-gutter);background:var(--mavion-surface);border-bottom:1px solid var(--mavion-line);color:var(--mavion-muted);font-size:.84rem}.tmc-identity summary{min-height:42px;display:flex;align-items:center;cursor:pointer;color:var(--mavion-text);list-style:none}.tmc-identity summary::-webkit-details-marker{display:none}.tmc-identity summary::after{content:"+";margin-left:10px;color:var(--mavion-accent);font-size:1.1rem}.tmc-identity[open] summary::after{content:"−"}.tmc-identity p{max-width:720px;margin:0;padding:0 0 16px;line-height:1.55}.tmc-identity strong{font-weight:400;color:var(--mavion-accent)}
    .hero,.rbsc-hero{max-width:var(--mavion-outer);min-height:540px;margin:0 auto;padding:clamp(72px,10vw,112px) var(--mavion-gutter) 72px;background:var(--mavion-surface);border:1px solid var(--mavion-line);border-top:0;border-radius:0;box-shadow:none}.hero h1,.page-hero h1,.rbsc-hero h1,.section-heading h2,.association h2,.rbsc-section h2,.rbsc-vote-panel h2{font-family:Arial,"Helvetica Neue",sans-serif;font-weight:700;letter-spacing:-.04em;color:var(--mavion-text)}.hero h1::first-line{color:var(--mavion-text)}.hero-copy,.rbsc-intro{color:var(--mavion-muted);font-size:17px;line-height:1.75}.eyebrow,.tag,.rbsc-kicker,.rbsc-page .eyebrow{font-family:"Mavion Sans",Arial,sans-serif;color:var(--mavion-accent);letter-spacing:normal;text-transform:none;font-size:.95rem;font-weight:400}.signal-one{width:34%;height:100%;right:0;top:0;background:var(--mavion-accent-dim);clip-path:none;border-left:1px solid var(--mavion-line)}.signal-one::after{background:linear-gradient(135deg,transparent 0 46%,rgb(150 142 255 / .28) 46.2% 46.7%,transparent 46.9%)}.signal-two{display:none}.text-link,.rbsc-text-link{color:var(--mavion-text)}.text-link:hover,.rbsc-text-link:hover{color:var(--mavion-accent)}
    .section,.rbsc-section{max-width:var(--mavion-outer);padding:76px var(--mavion-gutter);background:var(--mavion-background)}.section-heading{border-top:1px solid var(--mavion-line)}.story-grid,.show-grid,.channel-list{gap:var(--mavion-card-gap);border:0}.story,.show-card,.channel-list a,.channel-list span,.news-card,.show-feature,.channel-card,.feature,.details-list details,.entry{border:1px solid var(--mavion-line);border-radius:var(--mavion-card-radius);background:var(--mavion-surface);color:var(--mavion-text);box-shadow:none}.story{border-right:1px solid var(--mavion-line)}.story:hover,.channel-list a:hover{border-color:var(--mavion-accent);box-shadow:none;transform:translateY(-2px)}.art{border-color:var(--mavion-line)}.orbital,.dusk,.neon{background:var(--mavion-accent-dim);color:var(--mavion-accent)}.orbital::after{border-color:var(--mavion-accent);border-radius:50%}.story h3,.news-card h2,.channel-card h2,.feature h2{color:var(--mavion-text)}.story p:not(.tag),.news-card p,.channel-card p,.feature p,.details-list p{color:var(--mavion-muted)}.association,.rbsc-vote-panel{max-width:var(--mavion-outer);margin:0 auto;background:var(--mavion-surface);border:1px solid var(--mavion-line);border-radius:0}.association .eyebrow,.association h2,.association p:not(.eyebrow),.rbsc-vote-panel .eyebrow,.rbsc-vote-panel h2,.rbsc-vote-panel p:not(.eyebrow),.rbsc-vote-panel-action small{color:var(--mavion-text)}.channel-list a,.channel-list span{min-height:134px;padding:var(--mavion-card-padding)}
    .page-hero{max-width:var(--mavion-outer);padding:86px var(--mavion-gutter) 64px;background:var(--mavion-surface);border:1px solid var(--mavion-line);border-top:0}.page-hero:after{background:var(--mavion-accent-dim);clip-path:none;width:28%;opacity:1}.page-hero p:not(.eyebrow){color:var(--mavion-muted)}.page-main{max-width:var(--mavion-outer);background:var(--mavion-background);padding:66px var(--mavion-gutter) 100px}.news-card:hover{box-shadow:0 0 0 1px var(--mavion-accent);transform:translateY(-2px)}
    .rbsc-page .topbar{background:var(--mavion-background)}.rbsc-hero{background:var(--mavion-surface)}.rbsc-stage-lines{background:repeating-linear-gradient(0deg,transparent 0 65px,rgb(250 250 250 / .035) 66px 67px)}.rbsc-hero:after{background:var(--mavion-accent-dim);clip-path:none;width:31%;border-left:1px solid var(--mavion-line)}.rbsc-hero h1,.rbsc-hero h1 em{color:var(--mavion-text);-webkit-text-stroke:0}.rbsc-event-card{border-color:var(--mavion-line);border-radius:var(--mavion-card-radius);background:var(--mavion-background);box-shadow:none}.rbsc-card-label,.lineup-number,.entry .flag{color:var(--mavion-accent)}.rbsc-date,.rbsc-overview,.rbsc-lineup,.rbsc-lineup li{border-color:var(--mavion-line)}.rbsc-date p,.rbsc-event-card dt,.rbsc-hero-note,.rbsc-overview-copy p,.rbsc-section-heading>p,.lineup-song small,.lineup-song.muted,.vote-note,.entry p{color:var(--mavion-muted)}.rbsc-event-card dd,.lineup-song,.entry h3{color:var(--mavion-text)}.rbsc-lineup li:hover,.rbsc-lineup li.is-host,.entry:hover,.entry:focus-visible,.entry.selected{background:var(--mavion-accent-dim);border-color:var(--mavion-accent);box-shadow:none}.rbsc-lineup li.is-host{box-shadow:inset 3px 0 var(--mavion-accent)}.ballot-bar{border:1px solid var(--mavion-line);border-radius:var(--mavion-card-radius);background:var(--mavion-surface)}.ballot-bar p{color:var(--mavion-text)}
    footer{max-width:var(--mavion-outer);padding:36px var(--mavion-gutter);background:var(--mavion-surface);border-top:1px solid var(--mavion-line);color:var(--mavion-muted)}footer .brand img{content:none;width:42px;height:42px;object-fit:contain}footer a:hover{color:var(--mavion-accent)}
    @media(max-width:800px){.topbar{height:68px}.topbar .brand img{width:128px;height:37px}.rma-identity{display:none}.tmc-identity{padding-inline:var(--mavion-gutter)}.hero,.rbsc-hero{padding:66px var(--mavion-gutter) 56px;min-height:0}.signal-one,.rbsc-hero:after{display:none}.section,.rbsc-section{padding:56px var(--mavion-gutter)}.story-grid,.show-grid,.channel-list{gap:12px}.story,.show-card,.channel-list a,.channel-list span{margin-bottom:0}.page-hero,.page-main{padding-left:var(--mavion-gutter);padding-right:var(--mavion-gutter)}.page-hero:after{display:none}.tmc-login{display:inline-flex}.topbar .watch-button{display:none}}
  `;
  document.head.appendChild(kitStyle);

  if (!document.querySelector('link[rel="icon"]')) {
    const icon = document.createElement('link'); icon.rel = 'icon'; icon.href = 'assets/favicon.ico'; document.head.appendChild(icon);
  }

  document.querySelectorAll('.topbar .brand img').forEach((image) => {
    image.src = 'assets/mavion-wordmark.png'; image.alt = 'Mavion';
    if (!image.parentElement.querySelector('.rma-identity')) {
      const label = document.createElement('span'); label.className = 'rma-identity'; label.textContent = 'Roblox Media Association'; image.insertAdjacentElement('afterend', label);
    }
  });
  document.querySelectorAll('footer .brand img').forEach((image) => { image.src = 'assets/mavion-symbol.png'; image.alt = 'Mavion'; });
  document.querySelectorAll('.topbar').forEach((header) => {
    if (header.nextElementSibling?.classList.contains('tmc-identity')) return;
    const strip = document.createElement('details'); strip.className = 'tmc-identity';
    strip.innerHTML = '<summary>A Mavion Corporation website <strong>· Here’s how you know</strong></summary><p>RMA is operated by Mavion Corporation. Check that the address is <strong>rma.tmc.gg</strong> before entering information. External websites linked from RMA have their own terms and privacy practices.</p>';
    header.insertAdjacentElement('afterend', strip);
  });
  document.querySelectorAll('.topbar').forEach((header) => {
    if (header.querySelector('.tmc-login')) return;
    const login = document.createElement('a');
    login.className = 'tmc-login'; login.href = 'https://sso.tmc.gg'; login.textContent = 'Log in';
    const action = header.querySelector('.watch-button');
    action ? header.insertBefore(login, action) : header.appendChild(login);
  });

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
