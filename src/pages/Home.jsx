import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import deathmatchVideo from '../assets/video/deatch_match_demo.mp4';
import { FiArrowRight, FiArrowUpRight, FiCrosshair, FiMap, FiMonitor, FiPause, FiPlay, FiShield, FiTarget } from 'react-icons/fi';
import { ContractTable, DesktopNotice, PlayButton, SectionHeading } from '../components.jsx';
import { MODES, MAPS, MAP_GROUPS } from '../content.js';
import robinhoodLogo from '../assets/robinhood-logo.webp';
import pbtLogo from '../assets/pbt-logo.webp';
import { ArenaVideo, ArenaGroupHeading } from '../components/ArenaShowcase.jsx';

const highlights=[
 {number:'05',label:'BATTLE MAPS',sub:'URBAN + INDOOR',Icon:FiMap},
 {number:'02',label:'GAME MODES',sub:'DEATHMATCH + BOMB',Icon:FiTarget},
 {number:'5V5',label:'TEAM COMBAT',sub:'POLICE VS TERRORISTS',Icon:FiCrosshair}
];

function HeroGameplayVideo(){
 const ref=useRef(null);
 const [failed,setFailed]=useState(false);
 const [playing,setPlaying]=useState(false);
 useEffect(()=>{
  const video=ref.current;
  if(!video)return;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData=navigator.connection?.saveData===true;
  // Respect accessibility and metered connections while autoplaying on
  // normal desktop browsers. The fallback keeps the visual present.
  if(reduceMotion.matches||saveData)return;
  let visible=false;
  const play=()=>{
   if(!visible||document.hidden||reduceMotion.matches)return;
   const pending=video.play();
   if(pending?.catch)pending.catch(()=>{/* Browser policy may block autoplay. */});
  };
  const update=()=>{
   if(visible&&!document.hidden)play();
   else video.pause();
  };
  const observer=new IntersectionObserver(([entry])=>{
   visible=Boolean(entry?.isIntersecting);
   update();
  },{threshold:0.1});
  const onMotion=()=>{if(reduceMotion.matches)video.pause();else update();};
  observer.observe(video);
  document.addEventListener('visibilitychange',update);
  reduceMotion.addEventListener?.('change',onMotion);
  return()=>{
   observer.disconnect();
   document.removeEventListener('visibilitychange',update);
   reduceMotion.removeEventListener?.('change',onMotion);
   video.pause();
  };
 },[]);
 return <div className="hero-gameplay">
   <video ref={ref} className="hero-gameplay-video" src={deathmatchVideo}
     autoPlay muted loop playsInline preload="metadata" disablePictureInPicture
     aria-label="PointBlock Team Deathmatch gameplay footage"
     onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}
     onError={()=>setFailed(true)} />
   {failed&&<div className="hero-gameplay-fallback" role="status">GAMEPLAY PREVIEW UNAVAILABLE</div>}
   <div className="hero-gameplay-caption">
     <button type="button" className="hero-video-control"
       onClick={()=>{
         const video=ref.current;
         if(!video)return;
         if(video.paused){void video.play().catch(()=>{});}
         else video.pause();
       }}
       aria-label={playing?'Pause PointBlock gameplay video':'Play PointBlock gameplay video'}>
       {playing?<FiPause aria-hidden="true"/>:<FiPlay aria-hidden="true"/>}
     </button>
     <div className="hero-video-label"><span>GAMEPLAY FOOTAGE</span><small>ACTUAL POINTBLOCK MATCH</small></div>
     <span className="hero-video-divider" aria-hidden="true"/>
     <strong>TEAM DEATHMATCH</strong>
     <span className="hero-video-signature">5V5 // POINTBLOCK</span>
   </div>
 </div>;
}

export default function Home(){
 return <>
   <section className="home-hero">
     <div className="container hero-grid">
       <div className="hero-copy">
         <p className="eyebrow hero-kicker"><span className="accent-slice"/> THE NEXT FRONTLINE <span className="hero-kicker-bars" aria-hidden="true">////</span></p>
         <h1 className="display-title">POINT<span>BLOCK</span><strong>THE BATTLE BEGINS.</strong></h1>
         <p className="hero-lead">A competitive 5v5 browser FPS. Built for players. <b className="hero-chain-support"><img src={robinhoodLogo} alt="" aria-hidden="true" width="24" height="24"/>Built for Robinhood Chain.</b></p>
         <p className="hero-muted">Take your position as Police or Terrorists. Enter Team Deathmatch or Bomb Mission and fight for victory across five arenas.</p>
         <div className="hero-cta"><PlayButton/><Link className="btn btn-outline" to="/about">EXPLORE THE GAME <FiArrowRight aria-hidden="true"/></Link></div>
         <div className="hero-disclaimer"><FiMonitor aria-hidden="true"/> DESKTOP BROWSERS SUPPORTED · MOBILE GAMEPLAY IN DEVELOPMENT</div>
       </div>
       <div className="hero-visual" aria-label="PointBlock live gameplay showcase">
         <div className="hero-visual-inner">
           <div className="hero-visual-head">
             <span><FiCrosshair aria-hidden="true"/> POINTBLOCK // FIELD OPS</span>
             <span className="hero-frame-track" aria-hidden="true"/>
             <span className="hero-frame-signal" aria-hidden="true">///</span>
             <span>RH / 4663</span>
           </div>
           <HeroGameplayVideo/>
           <div className="hero-visual-bottom"><span><span className="tiny-orange"/> DESKTOP BROWSER FPS</span><span>ROBINHOOD CHAIN / 4663</span></div>
         </div>
         <span className="hero-frame-corner" aria-hidden="true"/>
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
       <div className="arena-showcase">
         {MAP_GROUPS.map(group=>{
           const arenas=MAPS.filter(map=>map.category===group.category);
           return <section className={'arena-group arena-group-'+group.id} key={group.id}
             aria-labelledby={'home-'+group.id}>
             <ArenaGroupHeading group={group} count={arenas.length} headingId={'home-'+group.id}/>
             <div className={'map-strip map-strip-'+group.id}>
               {arenas.map(map=><Link to="/maps" className="mini-map" key={map.id}>
                 <div className="mini-map-art map-preview"><ArenaVideo map={map}/></div>
                 <div className="mini-map-info">
                   <div className="mini-map-meta"><span>MAP / {map.number}</span><span>{map.terrain}</span></div>
                   <div className="mini-map-main"><strong>{map.name}</strong><FiArrowUpRight aria-hidden="true"/></div>
                   <p>{map.type}</p>
                 </div>
               </Link>)}
             </div>
           </section>;
         })}
       </div>
     </div>
   </section>

   <section className="section section-night">
     <div className="container">
       <div className="section-head-row"><SectionHeading eyebrow="03 / ROBINHOOD CHAIN" title="BUILT FOR THE" accent="ECOSYSTEM." subtitle="PointBlock integrates wallet-based player identity on Robinhood Chain Mainnet."/><Link to="/tokenomics" className="inline-link">VIEW TOKENOMICS <FiArrowUpRight/></Link></div>
       <div className="network-grid">
         <article className="chain-feature"><img className="chain-feature-logo" src={robinhoodLogo} alt="Robinhood Chain logo" width="76" height="76"/><div className="eyebrow">ONCHAIN FOUNDATION</div>
           <h3>ROBINHOOD <span>CHAIN</span></h3><p>An Ethereum-compatible Layer 2 network. PointBlock uses Robinhood Chain Mainnet for wallet-based player identity.</p>
           <div className="chain-metrics"><span>NETWORK <b>MAINNET</b></span><span>CHAIN ID <b>4663</b></span><span>GAS <b>ETH</b></span></div>
         </article>
         <div className="network-aside"><div className="network-aside-top"><FiMonitor/><b>DESKTOP WEB GAME</b></div>
           <p>Built for desktop browsers today, with mobile gameplay in development.</p>
           <Link to="/play-to-earn" className="inline-link">IN-GAME ECONOMY <FiArrowRight/></Link></div>
       </div>
       <div className="contract-home"><div className="panel-title-row"><b className="contract-heading-with-logo"><img src={pbtLogo} alt="" aria-hidden="true" width="27" height="27"/>PBT TOKEN / CONTRACT INFORMATION</b><span>OFFICIAL STATUS</span></div><ContractTable compact/></div>
     </div>
   </section>

   <section className="section section-cta"><div className="container">
     <div className="cta-banner"><div className="cta-mark"><FiCrosshair aria-hidden="true"/></div>
       <div><div className="eyebrow">POINTBLOCK // GAME ACCESS</div><h2>READY FOR THE <em>NEXT ROUND?</em></h2><p>Join the fight from a desktop browser.</p></div>
       <PlayButton/></div><DesktopNotice compact/>
   </div></section>
 </>;
}
