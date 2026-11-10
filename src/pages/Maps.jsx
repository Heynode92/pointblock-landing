import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiCrosshair, FiMap, FiMapPin, FiShield, FiTarget } from 'react-icons/fi';
import { MAPS } from '../content.js';
import { PageHeading, PlayButton, SectionHeading } from '../components.jsx';

const filters=[
 {id:'ALL',label:'ALL MAPS'},
 {id:'DEATHMATCH',label:'DEATHMATCH'},
 {id:'BOMB MISSION',label:'BOMB MISSION'}
];

function MapCard({map}){
 return <article className={'arena-card arena-'+map.theme}>
   <div className="arena-visual map-preview">
    <video className="map-preview-video" src={map.video} autoPlay muted loop playsInline
      preload="metadata" disablePictureInPicture disableRemotePlayback aria-hidden="true" tabIndex={-1}/>
    <span className="map-preview-status" aria-hidden="true">ARENA FEED</span>
    <span className="arena-index" aria-hidden="true">{map.number}</span>
    <span className="arena-class">{map.terrain}</span>
   </div>
   <div className="arena-info"><div className="arena-badge">
     {map.category==='DEATHMATCH'?<FiCrosshair/>:<FiShield/>}{map.category}</div>
    <h3>{map.name}</h3><p>{map.type}</p>
    <div className="arena-footer"><span>POINTBLOCK / MAP {map.number}</span><FiMapPin aria-hidden="true"/></div>
   </div>
 </article>;
}

export default function Maps(){
 const [filter,setFilter]=useState('ALL');
 const visible=useMemo(()=>MAPS.filter(m=>filter==='ALL'||m.category===filter),[filter]);
 return <>
 <section className="interior-hero container maps-hero">
  <div><PageHeading index="04" kicker="GAME WORLD / BATTLEFIELD" title="EXPLORE THE" accent="MAPS."
    description="Five arenas from the current PointBlock frontend. From streets and courtyards to indoor facilities and objective-based corridors."/>
    <div className="hero-cta"><PlayButton/></div></div>
  <div className="map-hero-graphic"><div className="map-hero-radar"><FiTarget/></div><strong>05<span> MAPS</span></strong><small>02 DEATHMATCH · 03 BOMB MISSION</small></div>
 </section>
 <section className="section section-slate"><div className="container">
  <SectionHeading eyebrow="01 / GAME ARENAS" title="CHOOSE YOUR" accent="TERRAIN." subtitle="Explore every PointBlock arena in motion. Choose a mode and scout the terrain before your next match."/>
  <div className="map-filters" role="group" aria-label="Filter maps">
   {filters.map(x=><button key={x.id} type="button" aria-pressed={filter===x.id}
     className={filter===x.id?'map-filter selected':'map-filter'}
     onClick={()=>setFilter(x.id)}>{x.label}<span>{x.id==='ALL'?5:MAPS.filter(m=>m.category===x.id).length}</span></button>)}
  </div>
  <div className="arena-grid-layout" aria-live="polite">{visible.map(m=><MapCard key={m.id} map={m}/>)}</div>
  <div className="map-information"><FiMap/><p>The selection shown here follows the PointBlock game map registry. Live room and map availability is determined in-game.</p></div>
 </div></section>
 <section className="section section-night"><div className="container">
  <div className="map-mode-grid"><div><FiCrosshair/><span>TEAM DEATHMATCH</span><strong>02 MAPS</strong><p>Block District and Block Labs.</p></div>
   <div><FiShield/><span>BOMB MISSION</span><strong>03 MAPS</strong><p>Lockdown, Block Town and Hospital.</p></div></div>
  <div className="maps-bottom-cta"><h3>FIND YOUR NEXT BATTLEGROUND.</h3><PlayButton/></div>
 </div></section>
 </>;
}
