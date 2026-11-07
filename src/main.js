import './style.css';
import { MODES, MAPS, ARSENAL, FAQ, PBT_LOGO_URL, gameDestination } from './content.js';

const get = (selector, root = document) => root.querySelector(selector);
const all = (selector, root = document) => [...root.querySelectorAll(selector)];

function element(tag, className = '', text = null) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== null) node.textContent = String(text);
  return node;
}

function setupGameLinks() {
  const destination = gameDestination(import.meta.env.VITE_POINTBLOCK_GAME_URL);
  all('[data-game-link]').forEach((link) => {
    link.href = destination.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const label = get('[data-game-label]', link);
    if (label) label.textContent = destination.label;
    if (destination.configured && link.classList.contains('text-link')) {
      link.replaceChildren('LAUNCH GAME ', element('span', '', '↗'));
    }
  });
}

function setupNavigation() {
  const trigger = get('#mobileTrigger');
  const mobile = get('#mobileNav');
  if (!trigger || !mobile) return;

  function closeMenu() {
    mobile.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Open navigation');
  }

  trigger.addEventListener('click', () => {
    const shouldOpen = mobile.hidden;
    mobile.hidden = !shouldOpen;
    trigger.setAttribute('aria-expanded', String(shouldOpen));
    trigger.setAttribute('aria-label', shouldOpen ? 'Close navigation' : 'Open navigation');
  });

  all('a', mobile).forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!mobile.hidden && !mobile.contains(event.target) && !trigger.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1090) closeMenu();
  });

  if ('IntersectionObserver' in window) {
    const navLinks = all('a[href^="#"]', get('#desktopNav'));
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver((items) => {
      const visible = items.filter((item) => item.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const current = '#' + visible[0].target.id;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === current;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.1, 0.2, 0.4] });
    sections.forEach((section) => observer.observe(section));
  }
}

function renderModes(onWatch) {
  const root = get('#modeGrid');
  if (!root) return;
  root.replaceChildren();
  for (const mode of MODES) {
    const card = element('article', 'mode-card');
    card.setAttribute('aria-label', mode.name);
    const top = element('div', 'mode-card-top');
    top.append(element('span', 'mode-card-number', mode.number + ' / ' + mode.eyebrow),
      element('span', 'mode-card-type', '5V5'));
    const icon = element('div', 'mode-icon');
    icon.setAttribute('aria-hidden', 'true');
    const content = element('div', 'mode-card-content');
    content.append(element('h3', '', mode.name), element('p', '', mode.summary));
    const footer = element('div', 'mode-card-footer');
    const detail = element('span', '', mode.details);
    const watch = element('button', 'mode-watch', 'WATCH GAMEPLAY ↗');
    watch.type = 'button';
    watch.setAttribute('aria-label', 'Watch ' + mode.name + ' gameplay');
    watch.addEventListener('click', () => onWatch(mode.id));
    footer.append(detail, watch);
    card.append(top, icon, content, footer);
    root.append(card);
  }
}

function setupShowcase() {
  const video = get('#gameplayVideo');
  const stage = get('#showcaseStage');
  const playButton = get('#playFootage');
  const error = get('#mediaError');
  const modeTitle = get('#showcaseModeTitle');
  const modeDetail = get('#showcaseModeDetail');
  const index = get('#showcaseIndex');
  if (!video || !stage || !playButton || !error) return;

  let selected = MODES[0];
  let playbackRequest = 0;

  function resetVideo() {
    ++playbackRequest;
    video.pause();
    video.removeAttribute('src');
    video.removeAttribute('controls');
    video.load();
    stage.dataset.state = 'idle';
    playButton.hidden = false;
    error.hidden = true;
  }

  function selectMode(id, scrollToPreview = false) {
    const candidate = MODES.find((mode) => mode.id === id);
    if (!candidate) return;
    selected = candidate;
    resetVideo();
    if (modeTitle) modeTitle.textContent = selected.label;
    if (modeDetail) modeDetail.textContent = selected.details;
    if (index) index.textContent = selected.number + ' / 02';
    all('[data-mode-select]').forEach((button) => {
      const active = button.dataset.modeSelect === id;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (scrollToPreview) {
      const preview = get('#showcase');
      preview?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
      playButton.focus({ preventScroll: true });
    }
  }

  function showMediaError() {
    stage.dataset.state = 'idle';
    playButton.hidden = false;
    video.removeAttribute('controls');
    error.hidden = false;
  }

  async function playSelected() {
    error.hidden = true;
    const requestId = ++playbackRequest;
    video.pause();
    video.src = selected.video;
    video.muted = true;
    video.controls = true;
    video.load();
    playButton.hidden = true;
    stage.dataset.state = 'loading';

    try {
      await video.play();
      if (requestId !== playbackRequest) return;
      stage.dataset.state = 'playing';
    } catch {
      if (requestId === playbackRequest) showMediaError();
    }
  }

  playButton.addEventListener('click', () => void playSelected());
  all('[data-mode-select]').forEach((button) => {
    button.addEventListener('click', () => selectMode(button.dataset.modeSelect));
  });
  video.addEventListener('error', () => {
    if (video.currentSrc) showMediaError();
  });
  video.addEventListener('playing', () => { stage.dataset.state = 'playing'; });
  video.addEventListener('pause', () => {
    if (stage.dataset.state === 'playing') stage.dataset.state = 'paused';
  });
  video.addEventListener('ended', () => {
    stage.dataset.state = 'paused';
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !video.paused) video.pause();
  });
  renderModes((id) => selectMode(id, true));
  selectMode('deathmatch');
}

function createMapCard(map) {
  const card = element('article', 'map-card');
  card.dataset.tone = map.tone;
  const graphic = element('div', 'map-graphic');
  graphic.setAttribute('aria-hidden', 'true');
  graphic.append(element('span', 'map-number', map.number), element('span', 'map-tag', map.type));
  const info = element('div', 'map-info');
  const label = map.mode === 'bomb' ? 'BOMB MISSION' : 'TEAM DEATHMATCH';
  info.append(element('span', 'map-mode', label), element('h3', '', map.name), element('p', '', map.description));
  card.append(graphic, info);
  return card;
}

function setupMapFilters() {
  const root = get('#mapGrid');
  if (!root) return;

  function update(filter) {
    const visible = MAPS.filter((map) => filter === 'all' || map.mode === filter);
    root.replaceChildren(...visible.map(createMapCard));
    if (!visible.length) root.append(element('p', 'map-empty', 'No maps available for this mode.'));
    all('[data-map-filter]').forEach((button) => {
      const selected = button.dataset.mapFilter === filter;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  all('[data-map-filter]').forEach((button) => {
    button.addEventListener('click', () => update(button.dataset.mapFilter));
  });
  update('all');
}

function renderArsenal() {
  const root = get('#arsenalList');
  if (!root) return;
  root.replaceChildren(...ARSENAL.map((entry) => {
    const item = element('div', 'arsenal-item');
    const head = element('div', 'arsenal-item-head');
    head.append(element('small', '', entry.number), element('span', '', entry.name));
    item.append(head, element('p', '', entry.description));
    return item;
  }));
}

function renderFAQ() {
  const root = get('#faqList');
  if (!root) return;
  root.replaceChildren(...FAQ.map((entry) => {
    const details = element('details', 'faq-item');
    details.append(element('summary', '', entry.question), element('p', '', entry.answer));
    return details;
  }));
}

function initialize() {
  const pbtLogo = get('#pbtLogo');
  if (pbtLogo) {
    pbtLogo.addEventListener('load', () => { pbtLogo.dataset.state = 'ready'; }, { once: true });
    pbtLogo.addEventListener('error', () => { pbtLogo.dataset.state = 'error'; }, { once: true });
    pbtLogo.src = PBT_LOGO_URL;
  }
  setupGameLinks();
  setupNavigation();
  setupShowcase();
  setupMapFilters();
  renderArsenal();
  renderFAQ();
  const year = get('#copyrightYear');
  if (year) year.textContent = String(new Date().getFullYear());
  // All external sources are owner-controlled or official; no wallet, tracking, or
  // player-facing token transaction is performed by this landing page.
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
else initialize();
