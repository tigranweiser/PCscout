/* PCScout – optionale Interaktion. Die Inhalte und Links sind bereits als HTML vorhanden. */
(() => {
  'use strict';
  const offline = document.body.hasAttribute('data-offline');
  const main = document.querySelector('main');
  const menu = document.getElementById('main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const metaBlock = document.getElementById('seiten-info');
  const metadata = metaBlock ? JSON.parse(metaBlock.textContent) : {};
  const pages = new Map([...main.querySelectorAll('.offline-view')].map(page => [page.id, page]));
  const navItems = menu ? [...menu.querySelectorAll('a')] : [];
  const mediaSmall = window.matchMedia('(max-width: 700px)');
  let activeRoute;
  let articleHeadings = [];
  let chapterLinks = [];
  let scrollPending = false;

  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  }

  function targetNode() {
    try {
      return document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch (_) {
      return null;
    }
  }

  function setMetadata(route) {
    const info = metadata[route];
    if (!info) return;
    document.title = info.title;
    for (const [key,value] of Object.entries(info.meta)) {
      const tag = document.head.querySelector('meta[name="' + key + '"]') || document.head.querySelector('meta[property="' + key + '"]');
      if (tag) tag.content = value;
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = info.canonical;
    const schema = document.getElementById('seiten-schema');
    if (schema) schema.textContent = JSON.stringify(info.schema);
  }

  function showChapter() {
    if (!articleHeadings.length) return;
    const mast = document.querySelector('.mast');
    const start = (mast ? mast.getBoundingClientRect().height : 0) + 65;
    let index = 0;
    for (let i = 0; i < articleHeadings.length; i++) {
      if (articleHeadings[i].getBoundingClientRect().top <= start) index = i;
    }
    chapterLinks.forEach((link,i) => {
      if (i === index) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  function onScroll() {
    if (!articleHeadings.length || scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => { scrollPending = false; showChapter(); });
  }
  function refreshRoute(initial) {
    const target = targetNode();
    const root = offline ? ((target && target.closest('.offline-view')) || pages.get('/')) : main;
    if (!root) return;
    const route = offline ? root.id : document.body.dataset.route;
    const changed = route !== activeRoute;
    if (changed) {
      activeRoute = route;
      if (offline) setMetadata(route);
      navItems.forEach(item => {
        const base = item.dataset.route;
        const matches = base === route || (base !== '/' && route.startsWith(base));
        item.classList.toggle('section-on', !!matches);
        item.removeAttribute('aria-current');
        if (matches) item.setAttribute('aria-current', base === route ? 'page' : 'location');
      });
      chapterLinks = [...root.querySelectorAll('.toc-fold nav a')];
      articleHeadings = chapterLinks.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
    }
    setMenu(false);
    showChapter();
    if (offline && !initial && changed && (!target || target === root)) {
      const focus = root.querySelector('h1');
      if (focus) {
        focus.tabIndex = -1;
        focus.focus({preventScroll:true});
      }
    }
  }
  const tocBoxes = [...document.querySelectorAll('.toc-fold')];
  function setTocDefault() {
    tocBoxes.forEach(box => { box.open = !mediaSmall.matches; });
    setMenu(false);
  }
  setTocDefault();
  if (mediaSmall.addEventListener) mediaSmall.addEventListener('change', setTocDefault);
  window.addEventListener('scroll', onScroll, {passive: true});
  if (offline) window.addEventListener('hashchange', () => refreshRoute(false));
  if (menu) menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  const skip = document.querySelector('a.skip');
  if (skip && offline) skip.addEventListener('click', event => {
    event.preventDefault();
    const region = pages.get(activeRoute) || main;
    region.tabIndex = -1;
    region.focus();
  });

  for (const select of main.querySelectorAll('[data-sort]')) {
    const listing = select.closest('.listing');
    const grid = listing && listing.querySelector('[data-cards]');
    if (!grid) continue;
    select.closest('label').hidden = false;
    select.addEventListener('change', () => {
      const direction = select.value === 'price-down' ? -1 : 1;
      const cards = [...grid.children].sort((a,b) => direction * (Number(a.dataset.price) - Number(b.dataset.price)));
      grid.append(...cards);
    });
  }

  const guideControl = main.querySelector('.guide-controls');
  if (guideControl) {
    const grid = guideControl.nextElementSibling;
    const buttons = [...guideControl.querySelectorAll('button[data-topic]')];
    const count = guideControl.querySelector('.guide-count');
    for (const button of buttons) button.addEventListener('click', () => {
      const topic = button.dataset.topic;
      const all = topic === 'alle';
      grid.classList.toggle('is-filtered', !all);
      for (const card of grid.children) card.hidden = !all && card.dataset.topic !== topic;
      buttons.forEach(other => {
        other.classList.toggle('selected',other === button);
        other.setAttribute('aria-pressed',String(other === button));
      });
      count.textContent = [...grid.children].filter(card => !card.hidden).length + ' Artikel';
    });
  }

  document.addEventListener('keydown',event => {
    if (event.key === 'Escape' && toggle && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.documentElement.classList.add('js');
  refreshRoute(true);
})();
