# PointBlock landing — FE source audit

This is internal project documentation. The public website does not link to the original game source repository.

| Site content | Existing FE source | Verified data |
| --- | --- | --- |
| Network | docs/ROBINHOOD_CHAIN_WALLET.md | Robinhood Chain Mainnet, ID 4663, ETH gas |
| Combat | src/game/11-bomb-map.js and src/game/82-home-showcase.js | 5v5 Team Deathmatch and Bomb Mission |
| Maps | src/game/13-block-labs.js and src/game/12-block-town.js | District, Labs, Lockdown, Town, Hospital |
| Inventory | src/game/89-inventory.js | Main weapon, secondary, melee, explosive |
| Progression | src/game/81-rank-insignia.js and src/game/89-leaderboard.js | Trainee ranks and top 10 |
| Rewards | src/game/89-earn.js | Backend-tracked vPBT; 1:1 converter is UI preview only |
| Media | src/assets/registration/operator-hero.webp and src/assets/icon/vPBT-logo.png | Local copies on landing |

Official network documentation: https://docs.robinhood.com/chain/connecting/

PBT contract address, total supply, distribution, public game deployment URL and project social links have not been provided or verified. The site avoids fabricated information and requires owner configuration.

Selected FE media copied into landing: tiny operator artwork (2.7 KB) and vPBT icon. Original FE videos (8.5 MB and 21.3 MB) are excluded for responsiveness and future source-repository privacy.

Playable PointBlock currently targets desktop web browsers; mobile gameplay remains under development. The informational landing is responsive on mobile.

BrowserRouter provides /, /about, /tokenomics, /play-to-earn, /maps. Static hosts need SPA fallback to index.html.
