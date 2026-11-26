'use strict';

const byId = (id) => document.getElementById(id);

function setupMenu() {
  const trigger = document.querySelector('.menu-trigger');
  const nav = byId('mobile-nav');
  function setOpen(open) {
    nav.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    trigger.querySelector('path').setAttribute('d', open ? 'm6 6 12 12M18 6 6 18' : 'M5 6h14M5 12h14M5 18h14');
  }
  trigger.addEventListener('click', () => setOpen(nav.hidden));
  nav.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !nav.hidden) {
      setOpen(false);
      trigger.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!nav.hidden && !event.target.closest('.site-head')) setOpen(false);
  });
  matchMedia('(min-width:781px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

function setupFridge() {
  const last = 31;
  const root = byId('fridge');
  const picture = byId('fridge-image');
  const toggle = byId('fridge-toggle');
  const handle = root.querySelector('.photo-opener');
  const notes = byId('fridge-links');
  const hint = byId('fridge-hint');
  const caption = root.querySelector('.photo-name');
  const live = byId('fridge-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const closedAlt = picture.alt;
  const images = new Array(last + 1);
  let loading;
  let position = 0;
  let target = 0;
  let revision = 0;
  let raf = 0;
  const url = (index) => 'assets/frames/frame-' + String(index).padStart(2, '0') + '.webp';

  function load(index) {
    if (images[index]) return images[index].ready;
    const img = new Image();
    const ready = new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
    images[index] = {img, ready};
    img.src = url(index);
    return ready;
  }
  function prepare() {
    if (!loading) {
      load(last);
      loading = Promise.all(Array.from({length:last + 1}, (_, index) => load(index)));
    }
    return loading;
  }
  function draw(index) {
    if (position !== index || index === last || index === 0) {
      position = index;
      picture.src = url(index);
    }
  }
  function settle(open, keyboard) {
    draw(open ? last : 0);
    handle.hidden = open;
    hint.hidden = open;
    caption.textContent = open ? 'Choisissez un post-it.' : 'Le mot sur le frigo.';
    notes.hidden = !open;
    picture.alt = open ? 'Frigo ouvert avec six boîtes en verre et six post-it de navigation.' : closedAlt;
    toggle.querySelector('span').textContent = open ? 'Refermer le frigo' : 'Ouvrir le frigo';
    live.textContent = open ? 'Frigo ouvert. Choisissez l’un des six post-it.' : 'Frigo refermé.';
    if (open && keyboard && root.contains(document.activeElement)) notes.querySelector('a').focus({preventScroll:true});
  }
  async function move(open, keyboard = false) {
    const request = ++revision;
    cancelAnimationFrame(raf);
    target = open ? last : 0;
    if (document.activeElement === handle || document.activeElement === hint || notes.contains(document.activeElement)) {
      toggle.focus({preventScroll:true});
    }
    hint.hidden = true;
    handle.hidden = true;
    notes.hidden = true;
    toggle.setAttribute('aria-expanded', String(open));
    handle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? 'Ouverture…' : 'Fermeture…';
    const endpoint = await load(target);
    if (revision !== request) return;
    if (!endpoint) {
      target = 0;
      handle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      settle(false, false);
      live.textContent = 'La photo n’a pas pu se charger. Les rubriques restent accessibles depuis le menu.';
      return;
    }
    if (reduced.matches || target === position) {
      settle(open, keyboard);
      return;
    }
    let timeout;
    const frames = await Promise.race([
      prepare(),
      new Promise((resolve) => { timeout = setTimeout(() => resolve(null), 700); })
    ]);
    clearTimeout(timeout);
    if (revision !== request) return;
    if (!frames || frames.some((ok) => !ok)) {
      settle(open, keyboard);
      return;
    }
    const from = position;
    const duration = Math.abs(target - from) * 32;
    const start = performance.now();
    function tick(now) {
      if (revision !== request) return;
      const fraction = Math.min(1, (now - start) / duration);
      draw(Math.round(from + (target - from) * fraction));
      if (fraction < 1 && !reduced.matches) raf = requestAnimationFrame(tick);
      else settle(open, keyboard);
    }
    raf = requestAnimationFrame(tick);
  }
  function warm() {
    if (reduced.matches || navigator.connection?.saveData) load(last);
    else prepare();
  }
  root.addEventListener('pointerenter', warm, {once:true});
  root.addEventListener('focusin', warm, {once:true});
  root.addEventListener('touchstart', warm, {once:true, passive:true});
  handle.addEventListener('click', (event) => move(true, event.detail === 0));
  hint.addEventListener('pointerenter', warm, {once:true});
  hint.addEventListener('click', (event) => move(true, event.detail === 0));
  toggle.addEventListener('click', (event) => move(target === 0, event.detail === 0));
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && target !== 0) {
      event.preventDefault();
      toggle.focus({preventScroll:true});
      move(false);
    }
  });
}

function setupEstimator() {
  const rates = {Essentiel:15, 'Sweet Home':20, Prestige:25};
  const euros = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR', maximumFractionDigits:2, minimumFractionDigits:2, trailingZeroDisplay:'stripIfInteger'});
  const form = byId('sim-form');
  const contact = byId('contact-form').elements;
  const rate = byId('night-rate');
  const nights = byId('nights');
  const city = byId('sim-city');
  const type = byId('sim-type');
  const pack = byId('sim-pack');
  function calculate() {
    byId('occupancy').textContent = Math.round(Number(nights.value) / 30 * 100) + ' % d’occupation sur 30 jours';
    document.querySelector('.income-track').style.setProperty('--owner', (100 - rates[pack.value]) + '%');
    const gross = Number(rate.value) * Number(nights.value);
    const fee = gross * rates[pack.value] / 100;
    byId('rate-out').value = euros.format(Number(rate.value));
    byId('nights-out').value = nights.value + (Number(nights.value) <= 1 ? ' nuit' : ' nuits');
    byId('receipt-place').textContent = type.value + ' · ' + city.value;
    byId('fee-label').textContent = (pack.value === 'Prestige' ? 'Commission de base ' : 'Commission ') + pack.value + ' · ' + rates[pack.value] + ' %';
    byId('gross').textContent = euros.format(gross);
    byId('fee').textContent = euros.format(fee);
    byId('net').value = euros.format(gross - fee);
  }
  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  form.addEventListener('submit', (event) => event.preventDefault());
  calculate();
  document.querySelectorAll('[data-plan]').forEach((link) => {
    link.addEventListener('click', () => {
      pack.value = link.dataset.plan;
      calculate();
    });
  });
  let lastGenerated = '';
  byId('sim-contact').addEventListener('click', () => {
    contact.ville.value = city.value === 'Autre commune' ? '' : city.value;
    contact.formule.value = pack.value;
    const message = 'J’aimerais affiner ma simulation pour mon logement de type '+type.value+' : '+nights.value+' nuitées à '+byId('rate-out').value+' par nuit, soit '+byId('net').value+' après commission AJ. Pourrions-nous en discuter ?';
    if (!contact.message.value.trim() || contact.message.value === lastGenerated) {
      contact.message.value = message;
      lastGenerated = message;
    }
  });
  document.querySelectorAll('[data-city]').forEach((button) => {
    button.addEventListener('click', () => {
      contact.ville.value = button.dataset.city === 'Autre commune' ? '' : button.dataset.city;
      if (contact.message.value === lastGenerated) contact.message.value = '';
      if (location.hash !== '#contact') location.hash = 'contact';
      else byId('contact').scrollIntoView();
    });
  });
}

function setupContact() {
  const form = byId('contact-form');
  const status = byId('contact-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const prenom = data.get('prenom').trim();
    const ville = data.get('ville').trim();
    const formule = data.get('formule');
    const message = data.get('message').trim();
    const lines = ['Bonjour Asma et Jalil,', prenom ? 'Je m’appelle '+prenom+'.' : '', ville ? 'Mon logement se situe à '+ville+'.' : '', formule ? 'Je m’intéresse à la formule '+formule+'.' : '', '', message || 'J’aimerais échanger avec vous au sujet de mon logement.'];
    const body = encodeURIComponent(lines.filter((line, i) => line || i === 4).join('\n'));
    const email = event.submitter?.value === 'email';
    const href = email ? 'mailto:ajprestige.conciergerie@gmail.com?subject=Mon%20logement%20-%20AJ%20Prestige&body='+body : 'https://wa.me/33622185785?text='+body;
    status.replaceChildren(document.createTextNode('Pour reprendre votre message, '));
    const again = document.createElement('a');
    again.className = 'link-rule';
    again.href = href;
    again.textContent = email ? 'ouvrir ma messagerie' : 'ouvrir WhatsApp';
    if (!email) {again.target = '_blank'; again.rel = 'noopener noreferrer';}
    status.append(again, '.');
    again.click();
  });
}

function setupEditions() {
  const buttons = [...document.querySelectorAll('[data-theme]')];
  function apply(name) {
    if (!buttons.some((button) => button.dataset.theme === name)) return;
    document.documentElement.dataset.edition = name;
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.theme === name)));
  }
  try {apply(localStorage.getItem('aj-carnet-edition'));} catch {}
  buttons.forEach((button) => button.addEventListener('click', () => {
    apply(button.dataset.theme);
    try {localStorage.setItem('aj-carnet-edition', button.dataset.theme);} catch {}
  }));
}

setupMenu();
setupFridge();
setupEstimator();
setupContact();
setupEditions();

function setupJourney() {
  const rail = document.querySelector('.journey');
  const stops = [...rail.querySelectorAll('.waypoint')];
  const buttons = [...document.querySelectorAll('[data-stop]')];
  const previous = byId('prev-stop');
  const next = byId('next-stop');
  let current = 0;
  function select(index) {
    current = index;
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    stops.forEach((stop, i) => stop.classList.toggle('current', i === index));
    byId('journey-place').textContent = (index + 1) + ' sur ' + stops.length + ' · ' + stops[index].querySelector('h3').textContent;
    previous.disabled = index === 0;
    next.disabled = index === stops.length - 1;
  }
  function go(index) {
    if (index < 0 || index >= stops.length) return;
    const left = rail.scrollLeft + stops[index].getBoundingClientRect().left - rail.getBoundingClientRect().left + (stops[index].offsetWidth - rail.clientWidth) / 2;
    rail.scrollTo({left, behavior:matchMedia('(prefers-reduced-motion:reduce)').matches ? 'instant' : 'smooth'});
  }
  rail.addEventListener('scroll', () => {
    const middle = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    const distances = stops.map(stop => Math.abs(stop.getBoundingClientRect().left + stop.offsetWidth / 2 - middle));
    const index = distances.indexOf(Math.min(...distances));
    if (index !== current) select(index);
  }, {passive:true});
  buttons.forEach((button,i) => button.addEventListener('click', () => go(i)));
  previous.addEventListener('click', () => go(current-1));
  next.addEventListener('click', () => go(current+1));
  rail.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    go(current + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  select(0);
}
function setupSector() {
  const pins = [...document.querySelectorAll('.map-pin')];
  const map = document.querySelector('.sector-map');
  const label = byId('map-label');
  const select = byId('sector-city');
  const contact = byId('sector-contact');
  function show(pin) {
    label.textContent = pin.dataset.place;
    label.style.top = pin.style.top;
    const center = map.clientWidth * parseFloat(pin.style.left) / 100;
    const half = label.offsetWidth / 2 + 6;
    label.style.left = Math.max(half, Math.min(map.clientWidth - half, center)) + 'px';
  }
  function selected() {return pins.find(pin => pin.dataset.place === select.value);}
  function choose(pin) {
    select.value = pin.dataset.place;
    pins.forEach(item => item.setAttribute('aria-pressed',String(item === pin)));
    contact.dataset.city = pin.dataset.place;
    contact.textContent = 'Parler de mon bien à ' + pin.dataset.place;
    show(pin);
  }
  pins.forEach(pin => {
    pin.addEventListener('pointerenter', () => show(pin));
    pin.addEventListener('focus', () => show(pin));
    pin.addEventListener('blur', () => show(selected()));
    pin.addEventListener('click', () => choose(pin));
  });
  map.addEventListener('pointerleave', () => show(selected()));
  select.addEventListener('change', () => choose(selected()));
  new ResizeObserver(() => show(selected())).observe(map);
  choose(selected());
}
setupJourney();
setupSector();
