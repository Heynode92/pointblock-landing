import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { SiteHeader, SiteFooter, RouteNotFound } from './components.jsx';

const Home=lazy(()=>import('./pages/Home.jsx'));
const About=lazy(()=>import('./pages/About.jsx'));
const Tokenomics=lazy(()=>import('./pages/Tokenomics.jsx'));
const PlayToEarn=lazy(()=>import('./pages/PlayToEarn.jsx'));
const Maps=lazy(()=>import('./pages/Maps.jsx'));

const titles={
 '/':'PointBlock — Tactical 5v5 FPS on Robinhood Chain',
 '/about':'About PointBlock — The Game & Robinhood Chain',
 '/tokenomics':'PBT Tokenomics — PointBlock on Robinhood Chain',
 '/play-to-earn':'Play to Earn — PointBlock Game Rewards',
 '/maps':'PointBlock Maps — Five Tactical Arenas'
};
const descriptions={
 '/':'Discover PointBlock, a desktop browser FPS built for the Robinhood Chain ecosystem.',
 '/about':'Explore PointBlock game mechanics, five-player teams, training and game infrastructure.',
 '/tokenomics':'PBT contract status, vPBT in-game balance and Robinhood Chain network details. No contract address has been announced.',
 '/play-to-earn':'Understand how PointBlock awards in-game vPBT based on verified match results. PBT conversion is not live.',
 '/maps':'Explore the five PointBlock Team Deathmatch and Bomb Mission maps.'
};
function ScrollAndMetadata(){
 const {pathname}=useLocation();
 useEffect(()=>{
   window.scrollTo({top:0,left:0,behavior:'instant'});
   document.title=titles[pathname]||'PointBlock';
   const meta=document.querySelector('meta[name="description"]');
   if(meta)meta.setAttribute('content',descriptions[pathname]||'Official PointBlock game information.');
 },[pathname]);
 return null;
}
function AppContent(){
 return <><ScrollAndMetadata/><SiteHeader/><main id="main">
   <Suspense fallback={<div className="page-loading" role="status">LOADING OPERATION...</div>}>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/tokenomics" element={<Tokenomics/>}/>
       <Route path="/play-to-earn" element={<PlayToEarn/>}/>
       <Route path="/maps" element={<Maps/>}/>
       <Route path="*" element={<RouteNotFound/>}/>
     </Routes>
   </Suspense></main><SiteFooter/></>;
}
export default function App(){return <BrowserRouter><AppContent/></BrowserRouter>}
