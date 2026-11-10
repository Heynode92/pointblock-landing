import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiCrosshair, FiMap, FiMapPin, FiShield, FiTarget } from 'react-icons/fi';
import { MAPS, MAP_GROUPS } from '../content.js';
import { ArenaVideo, ArenaGroupHeading } from '../components/ArenaShowcase.jsx';
import { PageHeading, PlayButton, SectionHeading } from '../components.jsx';

const filters=[
 {id:'ALL',label:'ALL MAPS'},
 {id:'DEATHMATCH',label:'DEATHMATCH'},
 {id:'BOMB MISSION',label:'BOMB MISSION'}
];

function MapCard({map}){
 return <article className="arena-card">
   <div className="arena-visual map-preview"><ArenaVideo map={map}/></div>
   <div className="arena-info">
     <div className="arena-details-meta"><span>MAP / {map.number}</span><span>{map.terrain}</span></div>
     <h3>{map.name}</h3><p>{map.type}</p>
     <div className="arena-footer"><span>{map.category} / POINTBLOCK</span><FiMapPin aria-hidden="true"/></div>
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
  <div className="map-mode-collections" aria-live="polite">
   {MAP_GROUPS.filter(group=>filter==='ALL'||group.category===filter).map(group=>{
     const groupMaps=visible.filter(map=>map.category===group.category);
     return <section className={'arena-group arena-group-'+group.id} key={group.id}
       aria-labelledby={'maps-'+group.id}>
       <ArenaGroupHeading group={group} count={groupMaps.length} headingId={'maps-'+group.id}/>
       <div className={'arena-grid-layout arena-grid-'+group.id}>
         {groupMaps.map(map=><MapCard key={map.id} map={map}/>)}
       </div>
     </section>;
   })}
  </div>
  <div className="map-information"><FiMap/><p>The selection shown here follows the PointBlock game map registry. Live room and map availability is determined in-game.</p></div>
 </div></section>
 <section className="section section-night"><div className="container">
  <div className="map-mode-grid"><div><FiCrosshair/><span>TEAM DEATHMATCH</span><strong>02 MAPS</strong><p>Block District and Block Labs.</p></div>
   <div><FiShield/><span>BOMB MISSION</span><strong>03 MAPS</strong><p>Lockdown, Block Town and Hospital.</p></div></div>
  <div className="maps-bottom-cta"><h3>FIND YOUR NEXT BATTLEGROUND.</h3><PlayButton/></div>
 </div></section>
 </>;
}
