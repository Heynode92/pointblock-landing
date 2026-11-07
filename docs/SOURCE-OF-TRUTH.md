# PointBlock landing — verified game source

This site presents existing game features and must not imply a public backend, wallet login on this site, a token launch, or any trading service.

## Game source snapshot

Official FE: https://github.com/Heynode92/blockbudies

Pinned revision: dacb4da39ade296d8bcd94b3a62e741ed22461db

| Section | Verified FE file | Facts |
| --- | --- | --- |
| Branding | index.html, src/styles/13-home-header.css | Point Block, dark navy and orange tactical HUD, Police vs Terrorist FPS |
| Gameplay videos | docs/HOME_MENU_SHOWCASE.md and src/game/82-home-showcase.js | Original Deathmatch and Bomb Mission clips, including exact filename deatch_match_demo.mp4 |
| Bomb mode | src/game/11-bomb-map.js | 5v5 objective play, planting and defusing, bomb sites A/B |
| Deathmatch maps | src/game/13-block-labs.js | Block District (Outdoor Urban Combat) and Block Labs (Indoor Research Facility) |
| Bomb maps | src/game/12-block-town.js | Lockdown (Indoor Tactical Arena), Block Town (Outdoor Urban Town), Hospital (Indoor Medical Center) |
| Inventory | src/game/89-inventory.js | Main Weapon, Secondary, Melee, Explosive; also Helm and Item in game |
| Progression | src/game/81-rank-insignia.js and src/game/89-leaderboard.js | Trainee progression and Top 10 by server-ranked progression, with total kills and headshot kill percentage |
| Economy | src/game/89-earn.js | vPBT is tracked in-game; PBT and converter are coming soon |
| Chain | docs/ROBINHOOD_CHAIN_WALLET.md | Game sign-in requires Robinhood Chain Mainnet |

## No fabricated launch claims

The site does not claim live player counts, an active PBT token, prices, withdrawals, conversion, trading, yields, contract address, active marketplace or matchmaking uptime. It does not present a deployment address not provided by the project owner.

When the actual public game URL is known, set VITE_POINTBLOCK_GAME_URL to its approved HTTPS URL. Without it, every game CTA says VIEW GAME SOURCE and links to the FE GitHub repository. Loopback HTTP is allowed for developer testing only.

## Media

Actual gameplay videos are owner-controlled FE files on raw.githubusercontent.com, pinned to the revision above, loaded only after a user clicks Play. The local vPBT coin image is copied from the FE. Other abstract illustrations are decorative CSS/SVG artwork and not represented as real in-game screenshots or map layouts. No unrelated stock images.

## Tech and privacy

Vite 8 + vanilla JS, Tailwind v4 and the official Vite plugin. Installation follows https://vite.dev/guide/ and https://tailwindcss.com/docs/installation/using-vite .

No wallet connectors, token contracts, analytics SDKs, authentication forms or invisible user-data requests are included in this landing page.
