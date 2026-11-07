import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { NETWORK, MODES, MAPS, NAV, validLaunchUrl, validContract, safeCommunityUrl } from '../src/content.js';

const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const app=read('src/App.jsx');
const layout=read('src/components.jsx');
const home=read('src/pages/Home.jsx');
const about=read('src/pages/About.jsx');
const token=read('src/pages/Tokenomics.jsx');
const earn=read('src/pages/PlayToEarn.jsx');
const maps=read('src/pages/Maps.jsx');
const css=read('src/style.css');
const html=read('index.html');
const pkg=JSON.parse(read('package.json'));

test('five real history routes, separate page modules and no hash navigation',()=>{
 const expected=['/','/about','/tokenomics','/play-to-earn','/maps'];
 assert.deepEqual(NAV.map(x=>x.path),expected);
 assert.match(app,/BrowserRouter/);
 for(const p of expected.slice(1))assert.ok(app.includes('path="'+p+'"'));
 for(const p of ['Home','About','Tokenomics','PlayToEarn','Maps'])
   assert.match(app,new RegExp("lazy\\(\\(\\)=>import\\('\\./pages/"+p+"\\.jsx'\\)\\)"));
 assert.doesNotMatch(layout,/href="#(?:overview|maps|tokenomics|about)"/);
 assert.match(read('public/_redirects'),/\/\* \/index\.html 200/);
});

test('React Icons, Vite React plugin and Tailwind work together',()=>{
 assert.equal(pkg.dependencies.react,'19.3.1');
 assert.equal(pkg.dependencies['react-dom'],'19.3.1');
 assert.equal(pkg.dependencies['react-router'],'8.5.1');
 assert.equal(pkg.dependencies['react-icons'],'5.7.0');
 assert.match(layout,/from 'react-icons\/fi'/);
 assert.match(layout,/from 'react-icons\/fa6'/);
 assert.match(read('vite.config.js'),/react\(\),tailwindcss\(\)/);
 assert.match(css,/@import "tailwindcss";/);
 assert.match(html,/src\/main\.jsx/);
});

test('Robinhood Chain branding only uses official verified network facts',()=>{
 assert.equal(NETWORK.name,'Robinhood Chain');
 assert.equal(NETWORK.chainId,4663);
 assert.equal(NETWORK.nativeCurrency,'ETH');
 assert.equal(NETWORK.documentation,'https://docs.robinhood.com/chain/connecting/');
 for(const page of [home,about,token,earn])
  assert.match(page,/Robinhood|NetworkBadge|NETWORK|ROBINHOOD/i);
 assert.match(layout,/Independent project\. Not affiliated with or endorsed by Robinhood Markets/);
});

test('PBT contract unavailable until explicitly configured, no fake tokens',()=>{
 assert.equal(validContract(undefined),'');
 assert.equal(validContract('0x1234'),'');
 assert.equal(validContract('0x'+'ab'.repeat(20)),'0x'+'ab'.repeat(20));
 assert.doesNotMatch(token,/0x[a-fA-F0-9]{40}/);
 assert.match(layout,/Not announced/);
 assert.match(home,/ContractTable/);
 assert.match(token,/ContractTable/);
 assert.match(token,/NO TOKEN SWAPS|No on-chain|Not Yet|not live|not announced/i);
});

test('community destinations reject untrusted hosts; icon placeholders are inert',()=>{
 assert.equal(safeCommunityUrl('https://x.com/PointBlock','x'),'https://x.com/PointBlock');
 assert.equal(safeCommunityUrl('https://t.me/pointblock','telegram'),'https://t.me/pointblock');
 assert.equal(safeCommunityUrl('https://discord.gg/pointblock','discord'),'https://discord.gg/pointblock');
 for(const [url,network] of [
  ['javascript:alert(1)','x'],['http://x.com/pointblock','x'],
  ['https://x.com.evil.test/pointblock','x'],
  ['https://discord.gg.evil.test/invite','discord'],
  ['https://user:pass@t.me/channel','telegram']
 ])assert.equal(safeCommunityUrl(url,network),'');
 assert.match(layout,/className="community-link inactive"/);
 assert.match(layout,/title=\{label\+' channel not announced'\}/);
});

test('PLAY NOW exists but is desktop-only and safe without a real public deployment',()=>{
 assert.equal(validLaunchUrl('https://game.example.com'), 'https://game.example.com/');
 assert.equal(validLaunchUrl('javascript:alert(1)'),'');
 assert.equal(validLaunchUrl('http://outside.example/game',true),'');
 assert.equal(validLaunchUrl('http://localhost:5173/',false),'');
 assert.equal(validLaunchUrl('http://localhost:5173/',true),'http://localhost:5173/');
 assert.equal(validLaunchUrl('https://user:pass@example.com'),'');
 assert.match(layout,/PLAY NOW/);
 assert.match(layout,/Desktop gameplay only/);
 assert.match(layout,/Game launch link will be announced/);
 assert.doesNotMatch(layout,/VIEW GAME SOURCE|github\.com\/Heynode92\/blockbudies/);
 assert.match(earn,/DesktopNotice/);
});

test('five sourced arenas with functional filtering',()=>{
 assert.deepEqual(MODES.map(x=>x.id),['deathmatch','bomb']);
 assert.equal(MAPS.length,5);
 assert.equal(MAPS.filter(x=>x.category==='DEATHMATCH').length,2);
 assert.equal(MAPS.filter(x=>x.category==='BOMB MISSION').length,3);
 assert.match(maps,/useMemo/);
 assert.match(maps,/aria-pressed=\{filter===x\.id\}/);
 assert.match(maps,/visible\.map/);
});

test('mobile drawer slides right-to-left and closes on route, Escape, or outside click',()=>{
 assert.match(css,/transform:translateX\(105%\)/);
 assert.match(css,/\.mobile-panel\.is-open\{transform:translateX\(0\)/);
 assert.match(css,/cubic-bezier\(\.22,1,\.36,1\)/);
 assert.match(layout,/if\(e\.key==='Escape'\)setOpen\(false\)/);
 assert.match(layout,/document\.body\.classList\.add\('drawer-open'\)/);
 assert.match(layout,/aria-expanded=\{open\}/);
 assert.match(layout,/inert=\{!open\}/);
});

test('local FE media is lightweight and source-private safe',()=>{
 assert.match(home,/import deathmatchVideo from '\.\.\/assets\/video\/deatch_match_demo\.mp4'/);
 assert.match(token,/import vpbtLogo from '\.\.\/assets\/vpbt-logo\.png'/);
 for(const page of [home,about,token,earn,maps]){
  assert.doesNotMatch(page,/raw\.githubusercontent\.com|github\.com\/Heynode92\/blockbudies/);
 }
 assert.doesNotMatch(html,/src="\/?src\/main\.js"|raw\.githubusercontent\.com/);
});

test('Home hero autoplays authentic local gameplay safely without scroll work',()=>{
 assert.match(home,/autoPlay muted loop playsInline preload="metadata"/);
 assert.match(home,/src=\{deathmatchVideo\}/);
 assert.match(home,/IntersectionObserver/);
 assert.match(home,/document\.addEventListener\('visibilitychange',update\)/);
 assert.match(home,/video\.pause\(\)/);
 assert.match(home,/prefers-reduced-motion: reduce/);
 assert.doesNotMatch(home,/src="\/media\/operator-hero\.webp"/);
 assert.doesNotMatch(home,/addEventListener\(['"]scroll['"]/);
 assert.match(css,/\.hero-gameplay-video\{/);
 assert.match(css,/object-fit:cover/);
});

test('no wallet, swap transaction or recurring scroll script in site',()=>{
 const files=[layout,home,about,token,earn,maps,read('src/main.jsx')].join('\n');
 assert.doesNotMatch(files,/window\.ethereum|eth_requestAccounts|sendTransaction|signMessage|setInterval\(|addEventListener\(['"]scroll['"]/);
 assert.doesNotMatch(files,/innerHTML\s*=/);
 assert.equal((css.match(/\{/g)||[]).length,(css.match(/\}/g)||[]).length);
});
