import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = read('index.html');
const css = read('src/style.css');
const js = read('src/main.js');

test('scroll does not composite a fullscreen blended scanline layer', () => {
  assert.doesNotMatch(html, /class="site-noise"/);
  assert.doesNotMatch(css, /\.site-noise\s*\{/);
  assert.doesNotMatch(css, /mix-blend-mode:\s*screen/);
  const header = css.match(/\.site-header\{([^}]+)\}/)?.[1] ?? '';
  assert.match(header, /position:sticky/);
  assert.match(header, /background:#061421/);
  assert.doesNotMatch(header, /backdrop-filter|blur\(/);
});
test('far-offscreen content may skip layout and paint with a stable placeholder', () => {
  assert.match(css, /@supports\s*\(content-visibility:\s*auto\)/);
  assert.match(css, /\.content-section\{content-visibility:auto;contain-intrinsic-size:auto 880px\}/);
  assert.match(css, /@media\(max-width:767px\)/);
  assert.match(css, /\.maps-section\{contain-intrinsic-size:auto 1650px\}/);
});
test('game footage is explicit play only and pauses when hidden or outside the viewport', () => {
  assert.match(html, /id="gameplayVideo"[^>]*preload="none"/);
  assert.doesNotMatch(html, /id="gameplayVideo"[^>]*\bautoplay\b/);
  assert.match(js, /playButton\.addEventListener\('click'/);
  assert.match(js, /document\.addEventListener\('visibilitychange'/);
  assert.match(js, /observer\.observe\(showcase\)/);
  assert.match(js, /!entry\.isIntersecting && !video\.paused\) video\.pause\(\)/);
  assert.doesNotMatch(js, /addEventListener\(['"]scroll['"]/);
  assert.doesNotMatch(js, /requestAnimationFrame\(/);
  assert.doesNotMatch(js, /setInterval\(/);
});
test('navigation remains functional without scroll-driven DOM work', () => {
  assert.match(js, /if \(current === activeSection\) return;/);
  assert.match(js, /mobile\.hidden = !shouldOpen/);
  for (const section of ['modes', 'maps', 'arsenal', 'progression', 'ecosystem', 'faq']) {
    assert.match(html, new RegExp('id="' + section + '"'));
  }
});
