import { Link } from 'react-router';
import { FiArrowRight, FiCheck, FiCheckCircle, FiClock, FiCrosshair, FiLock, FiMonitor, FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { DesktopNotice, NetworkBadge, PageHeading, PlayButton, SectionHeading, SecurityNote } from '../components.jsx';

const process=[
 {n:'01',icon:FiMonitor,heading:'START ON DESKTOP',description:'Enter PointBlock from a supported desktop web browser.'},
 {n:'02',icon:FiShield,heading:'CREATE YOUR OPERATOR',description:'Sign in with a supported wallet on Robinhood Chain, complete training and register a callsign.'},
 {n:'03',icon:FiCrosshair,heading:'PLAY VERIFIED MATCHES',description:'Join Team Deathmatch or Bomb Mission. The game backend authoritatively settles match results.'},
 {n:'04',icon:FiCheckCircle,heading:'REVIEW IN-GAME REWARDS',description:'Your match results can award in-game EXP and vPBT according to existing server rules.'}
];

export default function PlayToEarn(){
 return <>
 <section className="interior-hero container earn-hero">
  <div><PageHeading index="03" kicker="GAME PROGRESSION / EARN" title="PLAY TO" accent="EARN."
    description="Enter competitive matches, build your operator's rank and earn game-tracked rewards. PointBlock's reward logic is tied to verified gameplay—not promised financial returns."/>
    <NetworkBadge/><div className="hero-cta"><PlayButton/></div></div>
  <div className="earn-hero-art"><div className="earn-target"><FiCrosshair aria-hidden="true"/></div>
    <div className="earn-reward"><small>MATCH RESULTS</small><strong>EXP <span>+</span> vPBT</strong><p>SERVER-VERIFIED GAME REWARDS</p></div></div>
 </section>
 <section className="section section-slate"><div className="container">
  <SectionHeading eyebrow="01 / HOW IT WORKS" title="ENTER. COMPETE." accent="PROGRESS." subtitle="Four stages from desktop player access to the verified in-game reward screen."/>
  <div className="earn-steps">{process.map(x=><article className="earn-step" key={x.n}>
   <div className="earn-step-top"><span>{x.n}</span><x.icon aria-hidden="true"/></div>
   <h3>{x.heading}</h3><p>{x.description}</p>
  </article>)}</div>
 </div></section>
 <section className="section section-night"><div className="container">
  <SectionHeading eyebrow="02 / REWARD SYSTEM" title="REWARDS ARE" accent="IN-GAME." subtitle="These are gameplay progression mechanics, not financial products or on-chain earnings guarantees."/>
  <div className="reward-showcase">
   <article className="reward-showcase-main"><div className="eyebrow">BATTLE REPORT / REWARD SUMMARY</div>
    <h3>MATCH COMPLETE</h3><div className="reward-unit-row"><span><FiTrendingUp/> EXPERIENCE</span><strong>EXP</strong></div>
    <div className="reward-unit-row"><span><FiCheck/> IN-GAME BALANCE</span><strong>vPBT</strong></div>
    <p>Reward amounts are determined by the game server. This panel shows reward categories, not simulated player balances.</p>
   </article>
   <div className="reward-explain"><div><FiUsers/><h3>TEAM & BOT MATCH RULES</h3><p>Game reward adjustments depend on server-side match conditions. The landing page does not calculate or issue rewards.</p></div>
    <div><FiLock/><h3>NO TOKEN SWAPS</h3><p>vPBT-to-PBT conversion remains a coming-soon in-game preview. No actual exchange is available.</p></div></div>
  </div>
 </div></section>
 <section className="section section-slate"><div className="container">
  <SectionHeading eyebrow="03 / PLATFORM" title="DESKTOP GAMEPLAY" accent="FIRST." subtitle="The website is responsive, but the playable FPS currently targets desktop browsers only."/>
  <DesktopNotice/>
  <div className="earn-end"><div><h3>READY TO JOIN THE FIGHT?</h3><p>Play from your desktop browser. Mobile gameplay is still in development.</p></div><PlayButton/></div>
  <SecurityNote/>
 </div></section>
 </>;
}
