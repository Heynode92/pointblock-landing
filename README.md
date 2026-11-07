# PointBlock — Official Game Landing Page

The standalone public-facing landing page for the PointBlock browser FPS. This repository is intentionally separate from the [game frontend](https://github.com/Heynode92/blockbudies) and does not connect wallets, issue tokens, or collect player credentials.

## Stack
- Vite + vanilla JavaScript
- Tailwind CSS v4 via `@tailwindcss/vite`
- Mobile-first tactical UI inspired by the game frontend

## Local development (Windows PowerShell)
```powershell
git clone https://github.com/Heynode92/pointblock-landing.git
cd pointblock-landing
npm install
npm run dev
```

To create a production bundle, run `npm run build`. Output: `dist/`.

## Content policy and project status
All mode, map, progression, economy, and network details are derived from the [PointBlock frontend](https://github.com/Heynode92/blockbudies) at the time of implementation. Source references are documented in `src/content.js` and `docs/SOURCE-OF-TRUTH.md`.

**The PBT token and EARN conversion are not live.** vPBT is the in-game balance managed by the game backend. Do not present the converter's 1:1 UI preview as a market rate or price. The landing page does not connect wallets or promise rewards, an active token, release dates or matchmaking availability.

Gameplay video sources are the existing FE assets on the same owner's GitHub repository, loaded only on user interaction, not embedded from unrelated sites. See `src/content.js`.

## Game CTA
Set `VITE_POINTBLOCK_GAME_URL` to the real, approved HTTPS game deployment when available. Without this variable the CTA safely links to the verified game frontend repository and says **VIEW GAME SOURCE**, not **PLAY NOW**. Never expose API secrets through `VITE_*`.

## Deployment
This is a static Vite site. Configure your host to serve `dist/` with `index.html` as the default route. Add security headers (CSP, HSTS and referrer policy) at the host level after confirming the deployment origin and media rules.

No analytics, wallets, smart-contract approvals, or background API requests are shipped in this repository.
