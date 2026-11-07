import { Link } from 'react-router';
import { FiArrowRight, FiCrosshair, FiCpu, FiFlag, FiMonitor, FiShield, FiTarget, FiUsers } from 'react-icons/fi';
import { DesktopNotice, NetworkBadge, PageHeading, PlayButton, SectionHeading } from '../components.jsx';
import { MODES, LOADOUT, NETWORK } from '../content.js';

const facts=[
 {Icon:FiUsers,label:'TEAM FORMAT',value:'5V5'},
 {Icon:FiTarget,label:'GAME MODES',value:'02'},
 {Icon:FiFlag,label:'TACTICAL MAPS',value:'05'},
 {Icon:FiMonitor,label:'PLATFORM',value:'DESKTOP WEB'}
];

export default function About(){
 return <>
  <section className="interior-hero container">
   <div><PageHeading index="01" kicker="ABOUT / PROJECT OVERVIEW" title="MEET" accent="POINTBLOCK."
     description="PointBlock is a tactical browser FPS built around competitive team combat, operator progression and wallet-based identity on Robinhood Chain."/>
     <NetworkBadge/><div className="hero-cta"><PlayButton/></div></div>
   <div className="interior-illustration"><div className="interior-graphic"><FiCrosshair/><strong>POINT<br/>BLOCK</strong><span>POLICE // TERRORIST</span></div></div>
  </section>
  <section className="section section-slate"><div className="container">
   <div className="fact-grid">{facts.map(x=><div className="fact-box" key={x.label}><x.Icon/><small>{x.label}</small><strong>{x.value}</strong></div>)}</div>
   <div className="section-head-row spacing-top"><SectionHeading eyebrow="THE CORE GAME" title="BUILT AROUND" accent="THE FIGHT." subtitle="A 3D first-person experience with distinct objective and elimination modes."/></div>
   <div className="feature-trio">
    <article><FiCrosshair/><h3>TEAM COMBAT</h3><p>Police and Terrorists face off across dedicated 5v5 combat arenas.</p></article>
    <article><FiTarget/><h3>OBJECTIVE PLAY</h3><p>Bomb Mission combines planting, defending and defusing with round-based decisions.</p></article>
    <article><FiCpu/><h3>SERVER-VERIFIED PLAY</h3><p>Online room and match outcomes are designed around an authoritative backend.</p></article>
   </div>
  </div></section>
  <section className="section section-night"><div className="container">
   <SectionHeading eyebrow="01 / PLAYSTYLES" title="CHOOSE YOUR" accent="MISSION." subtitle="Both game modes follow the existing PointBlock frontend design."/>
   <div className="detail-grid">{MODES.map((x,i)=><article key={x.id} className="detail-card">
    <div className="detail-card-index">MODE / 0{i+1}</div><div className="detail-card-icon">{x.id==='bomb'?<FiShield/>:<FiCrosshair/>}</div>
    <h3>{x.title}</h3><p>{x.description}</p><small>5V5 · {x.subtitle.toUpperCase()}</small>
   </article>)}</div>
  </div></section>
  <section className="section section-slate"><div className="container">
   <SectionHeading eyebrow="02 / OPERATORS" title="EQUIPMENT &" accent="PROGRESSION." subtitle="The game includes an armory, owned equipment inventory, loadouts, ranks and a Top 10 leaderboard."/>
   <div className="about-split">
    <div className="equipment-list">{LOADOUT.map(x=><div className="equipment-row" key={x.number}>
      <span>{x.number}</span><div><h3>{x.name}</h3><p>{x.description}</p></div><FiArrowRight/>
    </div>)}</div>
    <div className="rank-feature"><span>OPERATOR RANK</span><div className="rank-skull" aria-hidden="true">☠</div><h3>TRAINEE</h3><p>New players complete training and register their callsign before progressing through ranks in the game.</p>
     <div className="rank-footer"><span>TRAINEE</span><span>→</span><span>SENIOR TRAINEE</span><span>→</span><span>PRIVATE</span></div></div>
   </div>
  </div></section>
  <section className="section section-night"><div className="container">
   <SectionHeading eyebrow="03 / NETWORK" title="BUILT FOR" accent="ROBINHOOD CHAIN." subtitle="PointBlock integrates with Robinhood Chain Mainnet for player identity and game progression. This is an independent project."/>
   <div className="chain-callout"><div><FiShield/><h3>ROBINHOOD CHAIN MAINNET</h3><p>Network Chain ID {NETWORK.chainId}. Ethereum-compatible with ETH as the native gas asset.</p></div>
    <a href={NETWORK.documentation} target="_blank" rel="noopener noreferrer" className="btn btn-outline">NETWORK DOCUMENTATION <FiArrowRight/></a></div>
   <DesktopNotice/>
  </div></section>
 </>;
}
