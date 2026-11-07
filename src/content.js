/**
 * Public-facing copy derived from PointBlock FE on GitHub.
 * Internal provenance is maintained in docs/SOURCE-OF-TRUTH.md.
 * Never publish a token address or community destination by guessing it.
 */
export const NETWORK = Object.freeze({
  name: 'Robinhood Chain',
  chainId: 4663,
  nativeCurrency: 'ETH',
  explorer: 'https://robinhoodchain.blockscout.com',
  documentation: 'https://docs.robinhood.com/chain/connecting/'
});

export const MODES = Object.freeze([
  {
    id: 'deathmatch', title: 'TEAM DEATHMATCH', short: 'DEATHMATCH',
    subtitle: 'Team-score combat',
    description: 'Fast 5v5 firefights, team eliminations and respawns. Take control of the battlefield.',
    accent: 'orange'
  },
  {
    id: 'bomb', title: 'BOMB MISSION', short: 'BOMB MISSION',
    subtitle: 'Plant. Defend. Defuse.',
    description: 'Round-based 5v5 objective play. Terrorists plant the bomb while Police defend and defuse.',
    accent: 'cyan'
  }
]);

export const MAPS = Object.freeze([
  { id: 'district', name: 'BLOCK DISTRICT', category: 'DEATHMATCH', type: 'Outdoor Urban Combat', terrain: 'URBAN', theme: 'orange', number: '01' },
  { id: 'labs', name: 'BLOCK LABS', category: 'DEATHMATCH', type: 'Indoor Research Facility', terrain: 'FACILITY', theme: 'cyan', number: '02' },
  { id: 'lockdown', name: 'LOCKDOWN', category: 'BOMB MISSION', type: 'Indoor Tactical Arena', terrain: 'INDOOR', theme: 'blue', number: '03' },
  { id: 'town', name: 'BLOCK TOWN', category: 'BOMB MISSION', type: 'Outdoor Urban Town', terrain: 'URBAN', theme: 'orange', number: '04' },
  { id: 'hospital', name: 'HOSPITAL', category: 'BOMB MISSION', type: 'Indoor Medical Center', terrain: 'INDOOR', theme: 'mint', number: '05' }
]);

export const LOADOUT = Object.freeze([
  { number:'01', name: 'MAIN WEAPON', description: 'Rifles, submachine guns, shotguns, sniper rifles and launchers.' },
  { number:'02', name: 'SECONDARY', description: 'A trusted backup for close engagements.' },
  { number:'03', name: 'MELEE', description: 'Fast close-quarters knife combat.' },
  { number:'04', name: 'EXPLOSIVE', description: 'Grenade equipment for tactical engagements.' }
]);

export const FAQ = Object.freeze([
  { question:'Is PointBlock playable on mobile?', answer:'Not yet. PointBlock gameplay is currently designed for desktop web browsers. Mobile support remains in development. The informational website can be viewed on mobile.' },
  { question:'Which network does PointBlock use?', answer:'PointBlock uses Robinhood Chain Mainnet (Chain ID 4663) for wallet-based player identity. PointBlock is an independent project built for the Robinhood Chain ecosystem.' },
  { question:'Is the PBT token contract live?', answer:'An official PBT token contract address has not been announced in the verified project source. Do not trust addresses shared by unverified accounts.' },
  { question:'Can I exchange vPBT for PBT?', answer:'No. The in-game conversion interface is a coming-soon preview. No on-chain swaps, approvals or transfers are currently offered.' }
]);

export const NAV = Object.freeze([
  { label:'Home', path:'/' },
  { label:'About', path:'/about' },
  { label:'Tokenomics', path:'/tokenomics' },
  { label:'Play to Earn', path:'/play-to-earn' },
  { label:'Map', path:'/maps' }
]);

export function validLaunchUrl(input, isDev=false) {
  if (typeof input !== 'string' || !input.trim()) return '';
  try {
    const url=new URL(input.trim());
    const local=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
    const secure=url.protocol==='https:' || (isDev && local && url.protocol==='http:');
    if (!secure || url.username || url.password) return '';
    return url.href;
  } catch { return ''; }
}

export function validContract(input) {
  return typeof input === 'string' && /^0x[a-fA-F0-9]{40}$/.test(input.trim())
    ? input.trim() : '';
}

export function safeCommunityUrl(input, service) {
  const hosts={
    x: ['x.com','www.x.com','twitter.com','www.twitter.com'],
    telegram: ['t.me','www.t.me'],
    discord: ['discord.gg','www.discord.gg','discord.com','www.discord.com']
  };
  try {
    const url=new URL(input);
    if(url.protocol!=='https:'||url.username||url.password||!hosts[service]?.includes(url.hostname))
      return '';
    return url.href;
  }catch{return '';}
}
