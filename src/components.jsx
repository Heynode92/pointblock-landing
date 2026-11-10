import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import {
  FiArrowRight, FiArrowUpRight, FiCheck, FiCheckCircle, FiChevronRight, FiCopy,
  FiExternalLink, FiInfo, FiMenu, FiMonitor, FiShield, FiSmartphone, FiX
} from 'react-icons/fi';
import { FaXTwitter, FaTelegram, FaDiscord } from 'react-icons/fa6';
import { NAV, NETWORK, safeCommunityUrl, validContract, validLaunchUrl } from './content.js';
import robinhoodLogo from './assets/robinhood-logo.webp';
import pbtLogo from './assets/pbt-logo.webp';

const launchConfigured=validLaunchUrl(import.meta.env.VITE_POINTBLOCK_GAME_URL,import.meta.env.DEV);
const localDevGame=import.meta.env.DEV && typeof window!=='undefined' &&
  ['localhost','127.0.0.1'].includes(window.location.hostname)
    ? 'http://localhost:5173/' : '';
const gameUrl=launchConfigured || localDevGame;

export const PBT_CONTRACT=validContract(import.meta.env.VITE_PBT_CONTRACT_ADDRESS);
export const COMMUNITY=[
  {id:'x',label:'X / Twitter',href:safeCommunityUrl(import.meta.env.VITE_POINTBLOCK_X_URL,'x'),Icon:FaXTwitter},
  {id:'telegram',label:'Telegram',href:safeCommunityUrl(import.meta.env.VITE_POINTBLOCK_TELEGRAM_URL,'telegram'),Icon:FaTelegram},
  {id:'discord',label:'Discord',href:safeCommunityUrl(import.meta.env.VITE_POINTBLOCK_DISCORD_URL,'discord'),Icon:FaDiscord}
];

function Brand(){return <Link to="/" className="brand" aria-label="PointBlock home">
  <span className="brand-mark" aria-hidden="true"></span>
  <span>POINT<span>BLOCK</span></span>
</Link>}

export function PlayButton({className='',small=false}){
 const [mobile,setMobile]=useState(() => typeof window!=='undefined' && window.matchMedia('(max-width: 767px)').matches);
 useEffect(()=>{
   const media=window.matchMedia('(max-width: 767px)');
   const onChange=()=>setMobile(media.matches);
   onChange();media.addEventListener('change',onChange);
   return ()=>media.removeEventListener('change',onChange);
 },[]);
 const label=<><FiMonitor aria-hidden="true"/><span>PLAY NOW</span><FiArrowUpRight aria-hidden="true"/></>;
 if(mobile)return <div className="play-cta-group">
   <span className={'btn btn-primary btn-disabled '+className} aria-disabled="true" title="Desktop browser required">
     {label}
   </span>
   <small className="cta-note"><FiSmartphone aria-hidden="true"/> Desktop gameplay only · Mobile in development</small>
 </div>;
 if(!gameUrl)return <div className="play-cta-group">
   <span className={'btn btn-primary btn-disabled '+className} aria-disabled="true" title="Game launch address not yet configured">
     {label}
   </span>
   <small className="cta-note">Game launch link will be announced</small>
 </div>;
 return <a href={gameUrl} target="_blank" rel="noopener noreferrer" className={'btn btn-primary '+className}>
   {label}<span className="sr-only">(opens game in a new tab)</span>
 </a>;
}

export function NetworkBadge({compact=false}){
 return <div className={'network-badge '+(compact?'network-compact':'')}>
   <img className="network-badge-logo" src={robinhoodLogo} alt="" aria-hidden="true" width="30" height="30"/>
   <span>BUILT FOR <b>ROBINHOOD CHAIN</b></span>
   {!compact&&<span className="network-chain">CHAIN ID {NETWORK.chainId}</span>}
 </div>;
}

export function SiteHeader(){
 const location=useLocation();
 const [open,setOpen]=useState(false);
 const closeRef=useRef(null);
 const previousFocus=useRef(null);
 useEffect(()=>{setOpen(false)},[location.pathname]);
 useEffect(()=>{
   if(!open)return;
   previousFocus.current=document.activeElement;
   document.body.classList.add('drawer-open');
   closeRef.current?.focus();
   function onKey(e){
     if(e.key==='Escape')setOpen(false);
     if(e.key==='Tab'){
       const focusable=[...document.querySelectorAll('.mobile-panel a, .mobile-panel button:not([disabled])')];
       if(!focusable.length)return;
       const first=focusable[0],last=focusable[focusable.length-1];
       if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
       if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
     }
   }
   document.addEventListener('keydown',onKey);
   return ()=>{document.body.classList.remove('drawer-open');document.removeEventListener('keydown',onKey);
     previousFocus.current?.focus?.();};
 },[open]);
 return <header className="site-header">
   <div className="container nav-bar">
     <Brand/>
     <nav className="desktop-nav" aria-label="Primary navigation">
       {NAV.map(item=><NavLink end={item.path==='/'} key={item.path} to={item.path}
         className={({isActive})=>'nav-link'+(isActive?' nav-active':'')}>{item.label}</NavLink>)}
     </nav>
     <div className="nav-actions">
       <span className="desktop-status"><FiMonitor aria-hidden="true"/> DESKTOP WEB</span>
       <PlayButton small className="header-play"/>
       <button type="button" className="hamburger" aria-controls="mobile-navigation"
         aria-label="Open navigation" aria-expanded={open} onClick={()=>setOpen(true)}><FiMenu/></button>
     </div>
   </div>
   <div className={'drawer-backdrop'+(open?' is-open':'')} aria-hidden="true" onClick={()=>setOpen(false)}></div>
   <aside id="mobile-navigation" role="dialog" aria-modal={open?'true':undefined}
     aria-label="PointBlock navigation" aria-hidden={!open} inert={!open}
     className={'mobile-panel'+(open?' is-open':'')}>
     <div className="drawer-header"><span>POINTBLOCK / NAVIGATION</span><button type="button" ref={closeRef}
       onClick={()=>setOpen(false)} aria-label="Close navigation"><FiX/></button></div>
     <nav aria-label="Mobile navigation">
       {NAV.map((item,i)=><NavLink end={item.path==='/'} key={item.path} to={item.path}
         className={({isActive})=>'drawer-link'+(isActive?' selected':'')}
         onClick={()=>setOpen(false)}>
         <small>{String(i+1).padStart(2,'0')}</small>{item.label}<FiChevronRight aria-hidden="true"/>
       </NavLink>)}
     </nav>
     <div className="drawer-bottom">
       <NetworkBadge compact/>
       <p>PC / Desktop browser only. Mobile gameplay is in development.</p>
     </div>
   </aside>
 </header>;
}

export function SiteFooter(){
 return <footer className="site-footer">
   <div className="container footer-main">
     <div><Brand/><p>Independent tactical browser FPS built for the Robinhood Chain ecosystem.</p></div>
     <nav aria-label="Footer pages">{NAV.map(x=><Link to={x.path} key={x.path}>{x.label}</Link>)}</nav>
     <div><NetworkBadge compact/><p className="footer-platform"><FiMonitor/> Desktop Web Only</p></div>
   </div>
   <div className="container footer-legal"><span>© {new Date().getFullYear()} POINTBLOCK</span>
     <span>Independent project. Not affiliated with or endorsed by Robinhood Markets, Inc.</span></div>
 </footer>;
}

export function PageHeading({kicker,index,title,accent,description,children}){
 return <div className="page-heading">
   <div className="eyebrow"><span className="accent-slice"></span>{index&&<span>{index} / </span>}{kicker}</div>
   <h1>{title} <em>{accent}</em></h1>
   {description&&<p>{description}</p>}
   {children}
 </div>;
}

export function SectionHeading({eyebrow,title,accent,subtitle}){
 return <div className="section-heading"><div className="eyebrow"><span className="accent-slice"></span>{eyebrow}</div>
   <h2>{title} <em>{accent}</em></h2>{subtitle&&<p>{subtitle}</p>}</div>;
}

export function DesktopNotice({compact=false}){
 return <div className={'desktop-notice'+(compact?' compact':'')}>
   <div className="notice-icon"><FiMonitor aria-hidden="true"/></div>
   <div><strong>DESKTOP WEB ONLY</strong><p>PointBlock gameplay currently supports desktop browsers.
     <span> Mobile gameplay is in development.</span></p></div>
   <FiSmartphone className="notice-mobile" aria-hidden="true"/>
 </div>;
}

export function CommunityLinks({text=true}){
 return <div className="community-list" aria-label="PointBlock community">
   {COMMUNITY.map(({id,label,href,Icon})=>href?
     <a className="community-link" key={id} href={href} target="_blank" rel="noopener noreferrer"
       aria-label={'Official PointBlock '+label}><Icon aria-hidden="true"/>{text&&<span>{label}</span>}</a>
     :<span key={id} className="community-link inactive" aria-label={label+' · not announced'}
       title={label+' channel not announced'}><Icon aria-hidden="true"/>{text&&<span>{label} · Soon</span>}</span>)}
 </div>;
}

export function ContractTable({compact=false}){
 const address=PBT_CONTRACT;
 const [copied,setCopied]=useState(false);
 async function copy(){
   if(!address||!navigator.clipboard?.writeText)return;
   try{await navigator.clipboard.writeText(address);setCopied(true);}catch{setCopied(false);}
 }
 const explorer=address?NETWORK.explorer+'/token/'+address:null;
 return <div className={'contract-wrapper'+(compact?' contract-compact':'')}>
   <div className="panel-top"><span><img className="pbt-panel-icon" src={pbtLogo} alt="" aria-hidden="true" width="28" height="28"/> PBT TOKEN CONTRACT</span>
     <span className={'pill '+(address?'pill-info':'pill-warning')}>{address?'ADDRESS PROVIDED':'NOT ANNOUNCED'}</span></div>
   <div className="table-scroll">
     <table className="token-table">
       <thead><tr><th scope="col">TOKEN</th><th scope="col">NETWORK</th><th scope="col">CONTRACT ADDRESS</th><th scope="col">STATUS</th></tr></thead>
       <tbody><tr>
         <td><div className="token-table-identity">
           <img src={pbtLogo} alt="" aria-hidden="true" width="36" height="36"/>
           <div><b>PBT</b><small>PointBlock Token</small></div>
         </div></td>
         <td><div className="token-table-network">
           <img src={robinhoodLogo} alt="" aria-hidden="true" width="28" height="28"/>
           <div><strong>{NETWORK.name}</strong><small>Chain ID {NETWORK.chainId}</small></div>
         </div></td>
         <td><div className="address-cell"><code>{address||'Not announced'}</code>
           <button type="button" onClick={()=>void copy()} disabled={!address} aria-label="Copy PBT contract address"
             title={address?'Copy address':'Contract not announced'}><FiCopy aria-hidden="true"/></button></div>
           {copied&&<small role="status" className="copy-note">Address copied</small>}
         </td>
         <td>{address?<a className="table-verify" href={explorer} target="_blank" rel="noopener noreferrer">
           CHECK EXPLORER <FiExternalLink aria-hidden="true"/></a>:
           <span className="status-upcoming">COMING SOON</span>}</td>
       </tr></tbody>
     </table>
   </div>
   <div className="contract-bottom"><div><FiInfo aria-hidden="true"/>
     <span>{address?'Always verify contract details on the chain explorer.':'No official PBT contract has been published in the verified game source.'}</span></div>
     <CommunityLinks text={false}/></div>
 </div>;
}

export function RouteNotFound(){
 return <div className="not-found container"><h1>404 <em>SECTOR NOT FOUND</em></h1>
   <p>This page is not part of the PointBlock website.</p>
   <Link to="/" className="btn btn-primary"><FiArrowRight/> RETURN HOME</Link>
 </div>;
}

export function SecurityNote(){
 return <div className="security-note"><FiCheckCircle aria-hidden="true"/>
   <p>The landing page never requests wallet signatures, token approvals or deposits.
     Gameplay wallet authentication takes place only in the game.</p></div>;
}
