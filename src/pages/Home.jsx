import { Link } from 'react-router';
import { FiArrowRight, FiArrowUpRight, FiCrosshair, FiMap, FiMonitor, FiShield, FiTarget, FiZap } from 'react-icons/fi';
import { ContractTable, DesktopNotice, NetworkBadge, PlayButton, SectionHeading } from '../components.jsx';
import { MODES, MAPS } from '../content.js';

const highlights=[
 {number:'05',label:'BATTLE MAPS',sub:'URBAN + INDOOR',Icon:FiMap},
 {number:'02',label:'GAME MODES',sub:'DEATHMATCH + BOMB',Icon:FiTarget},
 {number:'5V5',label:'TEAM COMBAT',sub:'POLICE VS TERRORISTS',Icon:FiCrosshair}
];

export default function Home(){
 return <>
   <section className="home-hero">
     <div className="container hero-grid">
       <div className="hero-copy">
         <NetworkBadge/>
         <p className="eyebrow hero-kicker"><span className="accent-slice"/> THE NEXT FRONTLINE</p>
         <h1 className="display-title">POINT<span>BLOCK</span><strong>THE BATTLE BEGINS.</strong></h1>
         <p className="hero-lead">A competitive 5v5 browser FPS. Built for players. <b>Built for Robinhood Chain.</b></p>
         <p className="hero-muted">Take your position as Police or Terrorists. Enter Team Deathmatch or Bomb Mission and fight for victory across five arenas.</p>
         <div className="hero-cta"><PlayButton/><Link className="btn btn-outline" to="/about">EXPLORE THE GAME <FiArrowRight aria-hidden="true"/></Link></div>
         <div className="hero-disclaimer"><FiMonitor aria-hidden="true"/> DESKTOP BROWSERS SUPPORTED · MOBILE GAMEPLAY IN DEVELOPMENT</div>
       </div>
       <div className="hero-visual" aria-label="PointBlock visual composition">
         <div className="hero-visual-head"><span><FiCrosshair aria-hidden="true"/> POINTBLOCK // FIELD OPS</span><span>RH / 4663</span></div>
         <div className="battle-art">
           <div className="battle-ring ring-one"/><div className="battle-ring ring-two"/>
           <div className="battle-skyline"><i/><i/><i/><i/><i/><i/></div>
           <div className="battle-accent-slash"/>
           <div className="battle-insignia">PB<span>///</span></div>
           <img className="hero-operator" src="/media/operator-hero.webp" alt="PointBlock tactical operator artwork" loading="eager" decoding="async"/>
           <div className="battle-corner-label">POLICE <b>05</b> <span>VS</span> <b>05</b> TERRORIST</div>
         </div>
         <div className="hero-visual-bottom"><span><span className="tiny-orange"/> BROWSER FPS</span><span>BUILT FOR ROBINHOOD CHAIN</span></div>
       </div>
     </div>
     <div className="container hero-stats">
       {highlights.map(x=><div className="hero-stat" key={x.label}><x.Icon aria-hidden="true"/><strong>{x.number}</strong><div><b>{x.label}</b><small>{x.sub}</small></div></div>)}
     </div>
   </section>

   <section className="section section-night">
     <div className="container">
       <div className="section-head-row"><SectionHeading eyebrow="01 / THE EXPERIENCE" title="PICK YOUR" accent="BATTLE." subtitle="Two established FPS modes, each with its own rhythm and tactical decisions."/>
         <Link to="/about" className="inline-link">ABOUT POINTBLOCK <FiArrowUpRight/></Link></div>
       <div className="mode-grid">
         {MODES.map((m,i)=><article className={'mode-feature '+m.accent} key={m.id}>
           <div className="feature-number">{m.id==='bomb'?<FiShield/>:<FiCrosshair/>} / 0{i+1}</div>
           <div className="mode-artwork" aria-hidden="true"><span>{m.id==='bomb'?'A / B':'5 VS 5'}</span></div>
           <div className="mode-content"><small>{m.subtitle}</small><h3>{m.title}</h3><p>{m.description}</p>
             <Link to="/about" className="inline-link">VIEW MODE <FiArrowRight/></Link></div>
         </article>)}
       </div>
     </div>
   </section>

   <section className="section section-slate">
     <div className="container">
       <div className="section-head-row"><SectionHeading eyebrow="02 / THE WORLD" title="FIVE ARENAS." accent="ONE FRONTLINE." subtitle="Purpose-built arenas spanning urban environments, indoor facilities and close-quarters sites."/><Link className="inline-link" to="/maps">EXPLORE ALL MAPS <FiArrowUpRight/></Link></div>
       <div className="map-strip">{MAPS.slice(0,3).map(m=><Link to="/maps" className={'mini-map '+m.theme} key={m.id}>
         <div className="mini-map-art"><span>{m.number}</span><FiMap aria-hidden="true"/></div>
         <small>{m.category}</small><strong>{m.name}</strong><span>{m.type}</span><FiArrowUpRight className="mini-map-arrow"/></Link>)}</div>
     </div>
   </section>

   <section className="section section-night">
     <div className="container">
       <div className="section-head-row"><SectionHeading eyebrow="03 / ROBINHOOD CHAIN" title="BUILT FOR THE" accent="ECOSYSTEM." subtitle="PointBlock integrates wallet-based player identity on Robinhood Chain Mainnet."/><Link to="/tokenomics" className="inline-link">VIEW TOKENOMICS <FiArrowUpRight/></Link></div>
       <div className="network-grid">
         <article className="chain-feature"><FiZap className="chain-icon"/><div className="eyebrow">ONCHAIN FOUNDATION</div>
           <h3>ROBINHOOD <span>CHAIN</span></h3><p>An Ethereum-compatible Layer 2 network. PointBlock uses Robinhood Chain Mainnet for wallet-based player identity.</p>
           <div className="chain-metrics"><span>NETWORK <b>MAINNET</b></span><span>CHAIN ID <b>4663</b></span><span>GAS <b>ETH</b></span></div>
         </article>
         <div className="network-aside"><div className="network-aside-top"><FiMonitor/><b>DESKTOP WEB GAME</b></div>
           <p>Built for desktop browsers today, with mobile gameplay in development.</p>
           <Link to="/play-to-earn" className="inline-link">IN-GAME ECONOMY <FiArrowRight/></Link></div>
       </div>
       <div className="contract-home"><div className="panel-title-row"><b>PBT TOKEN / CONTRACT INFORMATION</b><span>OFFICIAL STATUS</span></div><ContractTable compact/></div>
     </div>
   </section>

   <section className="section section-cta"><div className="container">
     <div className="cta-banner"><div className="cta-mark"><FiCrosshair aria-hidden="true"/></div>
       <div><div className="eyebrow">POINTBLOCK // GAME ACCESS</div><h2>READY FOR THE <em>NEXT ROUND?</em></h2><p>Join the fight from a desktop browser.</p></div>
       <PlayButton/></div><DesktopNotice compact/>
   </div></section>
 </>;
}
