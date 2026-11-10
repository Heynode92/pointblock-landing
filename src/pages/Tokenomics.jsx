import { Link } from 'react-router';
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiInfo, FiLock, FiShield, FiTrendingUp } from 'react-icons/fi';
import { CommunityLinks, ContractTable, NetworkBadge, PageHeading, SectionHeading, SecurityNote } from '../components.jsx';
import { NETWORK } from '../content.js';
import vpbtLogo from '../assets/vpbt-logo.png';
import robinhoodLogo from '../assets/robinhood-logo.webp';
import pbtLogo from '../assets/pbt-logo.webp';

export default function Tokenomics(){
 return <>
 <section className="interior-hero container token-hero">
  <div><PageHeading index="02" kicker="ECOSYSTEM / TOKEN INFORMATION" title="PBT" accent="TOKENOMICS."
     description="A transparent overview of PointBlock's in-game currency and planned PBT utility on Robinhood Chain. Official token parameters are not yet announced."/>
    <NetworkBadge/></div>
  <div className="token-hero-art"><img className="token-pbt-emblem" src={pbtLogo} alt="PointBlock PBT logo" width="192" height="192"/><span>POINTBLOCK // NETWORK 4663</span></div>
 </section>
 <section className="section section-slate"><div className="container">
  <div className="section-head-row"><SectionHeading eyebrow="01 / VERIFIED INFORMATION" title="OFFICIAL CONTRACT" accent="STATUS." subtitle="The PBT contract is only displayed when configured by the site owner. Never trust unverified token addresses."/></div>
  <ContractTable/>
  <div className="contract-side-note"><FiAlertCircle/><span>PBT has not been announced as a live token in the verified game frontend. A contract address, supply and token allocations must not be assumed.</span></div>
 </div></section>
 <section className="section section-night"><div className="container">
  <SectionHeading eyebrow="02 / ASSET ROLES" title="UNDERSTAND" accent="THE ECONOMY." subtitle="The backend-tracked game balance and any future on-chain PBT utility are not the same thing."/>
  <div className="economy-tiles">
   <article className="economy-tile"><div className="tile-label"><span>01 / IN-GAME</span><span className="pill pill-info">GAME BALANCE</span></div>
    <img src={vpbtLogo} alt="PointBlock vPBT icon" loading="lazy" width="92" height="92"/>
    <h3>vPBT</h3><p>A game balance tracked by the PointBlock backend and visible in the in-game interface. It is not presented as an independently traded token.</p>
    <div className="tile-foot"><FiCheckCircle/> BACKEND-TRACKED CURRENCY</div></article>
   <article className="economy-tile"><div className="tile-label"><span>02 / PLANNED</span><span className="pill pill-warning">COMING SOON</span></div>
    <img className="token-pbt-tile-logo" src={pbtLogo} alt="PointBlock PBT logo" loading="lazy" width="92" height="92"/><h3>PBT</h3>
    <p>Planned on-chain token utility for the PointBlock ecosystem. No verified contract address, supply breakdown or launch date is published here.</p>
    <div className="tile-foot"><FiLock/> ON-CHAIN UTILITY NOT LIVE</div></article>
  </div>
 </div></section>
 <section className="section section-slate"><div className="container">
  <SectionHeading eyebrow="03 / TRANSPARENCY" title="WHAT'S" accent="CONFIRMED." subtitle="Only the project's implemented game features and verified network facts appear as confirmed."/>
  <div className="token-details">
   <div><span>NETWORK</span><strong className="token-network-value"><img src={robinhoodLogo} alt="" aria-hidden="true" width="29" height="29"/>{NETWORK.name}</strong></div>
   <div><span>CHAIN ID</span><strong>{NETWORK.chainId}</strong></div>
   <div><span>GAS CURRENCY</span><strong>{NETWORK.nativeCurrency}</strong></div>
   <div><span>CONVERSION</span><strong>COMING SOON</strong></div>
   <div><span>TOTAL TOKEN SUPPLY</span><strong>NOT ANNOUNCED</strong></div>
   <div><span>PUBLIC TOKEN DISTRIBUTION</span><strong>NOT ANNOUNCED</strong></div>
  </div>
  <p className="token-fineprint"><FiInfo/> The game's 1:1 conversion mock-up is a design preview only, not a live exchange rate, price or promise of redemption.</p>
  <div className="token-bottom-links">
   <a href={NETWORK.explorer} target="_blank" rel="noopener noreferrer" className="btn btn-outline">ROBINHOOD CHAIN EXPLORER <FiArrowRight/></a>
   <Link to="/play-to-earn" className="btn btn-primary">PLAY TO EARN OVERVIEW <FiArrowRight/></Link>
  </div>
 </div></section>
 <section className="section section-night"><div className="container">
  <SectionHeading eyebrow="04 / COMMUNITY" title="FOLLOW THE" accent="PROJECT." subtitle="Official PointBlock community channels will be linked here when confirmed."/>
  <div className="community-panel"><CommunityLinks/><p><FiShield/> Only follow destinations published or verified by the project owner. Never connect a wallet through unsolicited token links.</p></div>
  <SecurityNote/>
 </div></section>
 </>;
}
