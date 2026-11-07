/**
 * Content sourced from verified PointBlock FE, never generic filler:
 * https://github.com/Heynode92/blockbudies
 *
 * Snapshot dacb4da39ade296d8bcd94b3a62e741ed22461db
 * src/game/13-block-labs.js, src/game/12-block-town.js (map registries)
 * src/game/11-bomb-map.js and src/game/82-home-showcase.js (modes/video)
 * src/game/89-inventory.js (loadout categories)
 * src/game/89-leaderboard.js (top 10, kills and headshot %)
 * src/game/89-earn.js (vPBT and unavailable converter)
 * docs/ROBINHOOD_CHAIN_WALLET.md (network)
 */
export const GAME_REPOSITORY = 'https://github.com/Heynode92/blockbudies';
export const GAME_SOURCE_REVISION = 'dacb4da39ade296d8bcd94b3a62e741ed22461db';
export const GAME_SOURCE_ROOT = GAME_REPOSITORY + '/blob/' + GAME_SOURCE_REVISION;
export const PBT_LOGO_URL = 'https://raw.githubusercontent.com/Heynode92/blockbudies/' + GAME_SOURCE_REVISION + '/src/assets/icon/pb-logo.png';
const footageRoot = 'https://raw.githubusercontent.com/Heynode92/blockbudies/' + GAME_SOURCE_REVISION + '/src/assets/video/';

export const MODES = Object.freeze([
  {
    id: 'deathmatch', number: '01',
    name: 'TEAM DEATHMATCH', label: 'DEATHMATCH', eyebrow: 'ALL-OUT COMBAT',
    summary: 'Take the fight to the opposing team. Every elimination brings your squad closer to victory.',
    details: '5V5 · RESPAWNS · TEAM SCORE',
    video: footageRoot + 'deatch_match_demo.mp4',
    source: 'src/game/82-home-showcase.js'
  },
  {
    id: 'bomb', number: '02',
    name: 'BOMB MISSION', label: 'BOMB MISSION', eyebrow: 'PLANT OR DEFUSE',
    summary: 'Terrorists fight to plant the bomb. Police defend the sites and defuse before detonation.',
    details: '5V5 · BOMB SITES A / B · ROUND BASED',
    video: footageRoot + 'bomb_mission_demo.mp4',
    source: 'src/game/11-bomb-map.js'
  }
]);

export const MAPS = Object.freeze([
  { id: 'block-district', number: '01', name: 'BLOCK DISTRICT', description: 'Outdoor Urban Combat', mode: 'deathmatch', type: 'URBAN', tone: 'orange' },
  { id: 'block-labs', number: '02', name: 'BLOCK LABS', description: 'Indoor Research Facility', mode: 'deathmatch', type: 'FACILITY', tone: 'cyan' },
  { id: 'lockdown', number: '03', name: 'LOCKDOWN', description: 'Indoor Tactical Arena', mode: 'bomb', type: 'TACTICAL', tone: 'blue' },
  { id: 'block-town', number: '04', name: 'BLOCK TOWN', description: 'Outdoor Urban Town', mode: 'bomb', type: 'URBAN', tone: 'orange' },
  { id: 'hospital', number: '05', name: 'HOSPITAL', description: 'Indoor Medical Center', mode: 'bomb', type: 'INDOOR', tone: 'mint' }
]);

export const ARSENAL = Object.freeze([
  { name: 'MAIN WEAPON', description: 'Rifles, SMGs, shotguns, snipers and launchers.', number: '01' },
  { name: 'SECONDARY', description: 'Your sidearm when the primary is not enough.', number: '02' },
  { name: 'MELEE', description: 'Close-quarters knife combat.', number: '03' },
  { name: 'EXPLOSIVE', description: 'Grenade equipment for tactical engagements.', number: '04' }
]);

export const FAQ = Object.freeze([
  {
    question: 'What is PointBlock?',
    answer: 'PointBlock is a browser-based 5v5 first-person shooter built with Three.js and Vite. Players fight as Police or Terrorists across Team Deathmatch and Bomb Mission.'
  },
  {
    question: 'Which game modes are included?',
    answer: 'Team Deathmatch features team-score combat and respawns. Bomb Mission uses plant-and-defuse objectives across two bomb sites, with round-based play.'
  },
  {
    question: 'Do I need a wallet?',
    answer: 'The game uses wallet sign-in on Robinhood Chain Mainnet for player identity and progression. This landing page does not request wallet access or signatures.'
  },
  {
    question: 'What is vPBT?',
    answer: 'vPBT is the in-game balance tracked by the PointBlock backend and displayed in the game economy. This landing page does not represent it as a tradable token.'
  },
  {
    question: 'Can I convert vPBT to PBT?',
    answer: 'Not yet. The in-game EARN converter is a coming-soon interface only. It does not execute swaps, withdrawals, or token transfers.'
  },
  {
    question: 'Where can I follow development?',
    answer: 'The official game frontend and this landing page are maintained in the project owner’s GitHub repositories. Features are described according to the game source, not a promised release schedule.'
  }
]);

/** Do not invent a deployed game address or allow a javascript: destination. */
export function gameDestination(envValue = '') {
  if (typeof envValue === 'string' && envValue.trim()) {
    try {
      const url = new URL(envValue.trim());
      const isLoopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
      if ((url.protocol === 'https:' || (url.protocol === 'http:' && isLoopback))
          && !url.username && !url.password) {
        return { href: url.href, label: 'LAUNCH GAME', configured: true };
      }
    } catch { /* malformed URL falls back to the verified source */ }
  }
  return { href: GAME_REPOSITORY, label: 'VIEW GAME SOURCE', configured: false };
}
