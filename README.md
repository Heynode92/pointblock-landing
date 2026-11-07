# PointBlock Landing Website

Independent marketing website for PointBlock, a desktop-browser 5v5 tactical FPS built for the Robinhood Chain ecosystem. Not affiliated with or endorsed by Robinhood Markets, Inc.

## Stack
Vite 8, React 19, React Router 8, Tailwind CSS v4, React Icons. Pages: Home (/), About (/about), Tokenomics (/tokenomics), Play to Earn (/play-to-earn), Map (/maps). Routes use the browser History API, not URL hashes.

## Windows PowerShell
```powershell
cd D:\robinhood\blockbuddies\pointblock-landing
git pull origin main
npm install
npm run dev
```
Dev server: http://127.0.0.1:5174 . Local PLAY NOW defaults to http://localhost:5173 when game FE is running.

Build production bundle with npm run build; run focused checks with npm run check. Static hosting requires SPA fallback to index.html. Netlify uses public/_redirects and Vercel uses vercel.json.

## Public environment (see .env.example)
- VITE_POINTBLOCK_GAME_URL: real approved HTTPS game deployment. When unset in production, PLAY NOW remains visibly disabled rather than leading to a fake game URL.
- VITE_PBT_CONTRACT_ADDRESS: official token contract, leave empty until announced.
- VITE_POINTBLOCK_X_URL, VITE_POINTBLOCK_TELEGRAM_URL, VITE_POINTBLOCK_DISCORD_URL: optional official PointBlock community channels. Unconfigured icons remain inactive.

All VITE_ variables are publicly visible in a deployed frontend; never put secrets in them.

## Verified game information
Robinhood Chain Mainnet ID 4663, ETH gas, browser FPS Team Deathmatch and Bomb Mission, five game maps, server-based EXP/vPBT progression. The PBT token is not announced as live. No verified official token contract, allocations, token exchange, market rate, launch date or public social channels are assumed.

Game currently runs on desktop web browsers only. Mobile gameplay is in development; the landing page itself is mobile responsive.

## Copied media
The FE's lightweight operator artwork is copied to public/media/operator-hero.webp. The FE's vPBT icon is stored locally in src/assets/vpbt-logo.png. Videos larger than 8 MB were deliberately excluded after scroll performance issues. This site does not load media from the game source repository and shows no links to its future-private source.

## Security
The website never asks for wallet signatures, token approvals or transfers. Token contract links are shown only after the owner configures a valid address; official community domains are allowlisted. Robinhood Chain explorer and documentation links point to official network resources.
