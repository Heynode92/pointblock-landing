import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MODES, MAPS, ARSENAL, FAQ, GAME_REPOSITORY, GAME_SOURCE_REVISION, gameDestination } from '../src/content.js';

const read = (file) => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const html = read('index.html');
const css = read('src/style.css');
const main = read('src/main.js');

test('brand and stack match the game frontend', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.type, 'module');
  assert.equal(pkg.devDependencies.vite === '8.3.5', true);
  assert.equal(pkg.devDependencies.tailwindcss === '4.3.0', true);
  assert.equal(pkg.devDependencies['@tailwindcss/vite'] === '4.3.0', true);
  assert.match(css, /@import "tailwindcss";/);
  assert.match(html, /POINT/);
  assert.match(html, /BLOCK/);
  assert.match(html, /src\/main\.js/);
  assert.match(read('vite.config.js'), /tailwindcss\(\)/);
});
test('public content contains only sourced modes and maps', () => {
  assert.deepEqual(MODES.map((m) => m.id), ['deathmatch', 'bomb']);
  assert.deepEqual(MAPS.map((m) => m.id),
    ['block-district', 'block-labs', 'lockdown', 'block-town', 'hospital']);
  assert.equal(MAPS.filter((m) => m.mode === 'deathmatch').length, 2);
  assert.equal(MAPS.filter((m) => m.mode === 'bomb').length, 3);
  assert.equal(ARSENAL.length, 4);
  assert.ok(FAQ.length >= 4);
  assert.equal(GAME_SOURCE_REVISION.length, 40);
  assert.equal(MODES[0].video.endsWith('/deatch_match_demo.mp4'), true);
  assert.equal(MODES[1].video.endsWith('/bomb_mission_demo.mp4'), true);
  for (const mode of MODES) {
    assert.ok(mode.video.startsWith('https://raw.githubusercontent.com/Heynode92/blockbudies/'));
    assert.ok(mode.video.includes(GAME_SOURCE_REVISION));
  }
});
test('game launch cannot become an unsafe or fabricated URL', () => {
  const fallback = gameDestination();
  assert.equal(fallback.href, GAME_REPOSITORY);
  assert.equal(fallback.label, 'VIEW GAME SOURCE');
  assert.equal(fallback.configured, false);
  for (const value of ['javascript:alert(1)', 'data:text/html,broken',
    'http://external.example/', 'https://user:pass@example.com/', 'invalid']) {
    assert.equal(gameDestination(value).href, GAME_REPOSITORY);
  }
  assert.equal(gameDestination('https://example.com/game').label, 'LAUNCH GAME');
  assert.equal(gameDestination('http://127.0.0.1:5173/').configured, true);
});
test('navigation and controls have accessible labels', () => {
  for (const id of ['main', 'overview', 'modes', 'maps', 'arsenal',
    'progression', 'ecosystem', 'faq', 'mobileNav', 'mobileTrigger', 'gameplayVideo',
    'playFootage', 'mapGrid', 'faqList']) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
  assert.match(html, /aria-controls="mobileNav"/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(main, /IntersectionObserver/);
  assert.match(main, /visibilitychange/);
  assert.match(main, /replaceChildren/);
});
test('landing never offers unauthorized token transactions or wallet requests', () => {
  assert.match(html, /COMING SOON/);
  assert.match(html, /No on-chain swaps, token approvals or transfers/);
  assert.doesNotMatch(main, /window\.ethereum|eth_requestAccounts|wagmi|sendTransaction|ethers\.|innerHTML\s*=/);
  assert.doesNotMatch(html, /https:\/\/.*(?:discord\.gg|t\.me)\/|connect your wallet to claim/i);
});
