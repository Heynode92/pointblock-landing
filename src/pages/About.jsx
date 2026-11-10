import { Link } from 'react-router';
import {
  FiArrowRight, FiArrowUpRight, FiCheckCircle, FiCrosshair, FiLock, FiShield, FiTarget
} from 'react-icons/fi';
import { DesktopNotice, PlayButton } from '../components.jsx';
import { MODES, MAPS, LOADOUT, NETWORK } from '../content.js';
import robinhoodLogo from '../assets/robinhood-logo.webp';
import pbtLogo from '../assets/pbt-logo.webp';

const journey = [
  {
    number: '01', title: 'ESTABLISH YOUR IDENTITY', tag: 'WALLET / SIGN-IN',
    body: 'Connect a supported wallet on Robinhood Chain and complete the game’s signature-based sign-in. Wallet identity is verified by the game backend.',
  },
  {
    number: '02', title: 'COMPLETE RECRUIT TRAINING', tag: 'TRAINING / CALLSIGN',
    body: 'New operators complete the beginner training objective of 10 combined team kills within a five-minute session, then register a unique callsign.',
  },
  {
    number: '03', title: 'PREPARE FOR THE MATCH', tag: 'ROOM / LOADOUT',
    body: 'Find or create a room, choose your team and equip owned weapons. The Room Master starts the match when the room is ready.',
  },
  {
    number: '04', title: 'FIGHT AND PROGRESS', tag: 'MATCH / RESULTS',
    body: 'Play the objective, compete against opponents and review your server-recorded match results, rank progress, EXP and in-game vPBT.',
  },
];

const principles = [
  {
    number: '01', title: 'GUNPLAY WITH DEPTH',
    text: 'An arsenal of 19 distinct weapon profiles, including rifles, SMGs, shotguns, sniper rifles and tactical equipment. Weapons have different recoil, firing cadence and effective range.',
  },
  {
    number: '02', title: 'COMPETITION WITH ACCOUNTABILITY',
    text: 'The multiplayer architecture separates browser-side rendering from authoritative game decisions. Match outcomes, hits, inventory and rewards must be validated by the server.',
  },
  {
    number: '03', title: 'PROGRESSION BEYOND A SINGLE ROUND',
    text: 'Operators build a lasting identity through ranks, combat statistics, owned equipment and leaderboard performance. vPBT is tracked as an in-game balance.',
  },
];

export default function About() {
  return <div className="about-page">
    <section className="about-hero" aria-labelledby="about-heading">
      <div className="container about-introduction">
        <div className="about-introduction-top">
          <p className="about-eyebrow"><span /> ABOUT / POINTBLOCK</p>
          <span className="about-introduction-edition">A DESKTOP TACTICAL FPS · ROBINHOOD CHAIN</span>
        </div>
        <h1 id="about-heading">ABOUT <em>POINTBLOCK.</em></h1>
        <div className="about-introduction-line" aria-hidden="true" />
        <div className="about-introduction-content">
          <div className="about-introduction-lead">
            <span>THE GAME</span>
            <p>A competitive 5v5 first-person shooter built around tactical combat, player skill and meaningful progression.</p>
          </div>
          <div className="about-introduction-details">
            <span>THE VISION</span>
            <p>PointBlock brings team-based FPS gameplay to desktop web browsers. Players fight as Police or Terrorists, choose between elimination and objective-based modes, and progress through their own operator identity.</p>
            <p>Built with Three.js and an independent game backend, the project focuses on responsive combat, fair match decisions and lasting player progression. Robinhood Chain provides the wallet identity and future ecosystem foundation—not a substitute for gameplay.</p>
          </div>
        </div>
        <div className="about-introduction-facts" aria-label="PointBlock game overview">
          <div><strong>5V5</strong><span>TEAM COMBAT</span></div>
          <div><strong>02</strong><span>GAME MODES</span></div>
          <div><strong>05</strong><span>BATTLE MAPS</span></div>
          <div><strong>19</strong><span>WEAPON PROFILES</span></div>
          <div><strong>WEB</strong><span>DESKTOP FIRST</span></div>
        </div>
      </div>
    </section>

    <section className="about-section about-purpose">
      <div className="container about-purpose-layout">
        <div className="about-sticky-heading">
          <p className="about-eyebrow"><span /> 01 / OUR DIRECTION</p>
          <h2>WHAT IS<br /><em>POINTBLOCK?</em></h2>
          <span className="about-section-rule" />
        </div>
        <div className="about-story">
          <p className="about-story-lead">A tactical FPS designed to make every firefight, decision and victory matter.</p>
          <p>PointBlock combines classic competitive shooter fundamentals—team positioning, weapon control, tactical decisions and map knowledge—with a modern browser-based 3D experience. Team Deathmatch rewards coordinated eliminations; Bomb Mission adds the pressure of planting, defending and defusing an objective.</p>
          <p>The project is built with <strong>Vite and Three.js</strong> for its 3D presentation. Online multiplayer is being developed around a separate authoritative backend so that the browser displays the action while trusted systems determine valid hits, player ownership, match outcomes and progression.</p>
          <p>Our focus is a game-first experience: meaningful competition, identifiable operators and progression earned through recorded gameplay. <strong>Blockchain supports the identity and ecosystem layer; it does not replace the FPS.</strong></p>
          <div className="about-story-quote">
            <FiTarget aria-hidden="true" />
            <span>COMPETE ON THE BATTLEFIELD. BUILD AN IDENTITY BEYOND IT.</span>
          </div>
        </div>
      </div>
    </section>

    <section className="about-section about-loop">
      <div className="container">
        <div className="about-section-header">
          <div>
            <p className="about-eyebrow"><span /> 02 / PLAYER JOURNEY</p>
            <h2>FROM RECRUIT<br />TO <em>OPERATOR.</em></h2>
          </div>
          <p>PointBlock connects onboarding, room-based multiplayer and operator progression in a single game flow.</p>
        </div>
        <div className="about-journey">
          {journey.map((item) => <article className="about-journey-step" key={item.number}>
            <div className="about-journey-number">{item.number}</div>
            <div className="about-journey-content">
              <small>{item.tag}</small>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>)}
        </div>
        <p className="about-note"><FiShield aria-hidden="true" /> Training completion, username registration and recorded results are verified by game services—not by this website.</p>
      </div>
    </section>

    <section className="about-section about-modes">
      <div className="container">
        <div className="about-section-header">
          <div>
            <p className="about-eyebrow"><span /> 03 / GAMEPLAY</p>
            <h2>TWO MODES.<br /><em>TWO WAYS TO WIN.</em></h2>
          </div>
          <p>Each mode asks for a different approach to combat, positioning and teamwork.</p>
        </div>
        <div className="about-mode-list">
          {MODES.map((mode, index) => <article className={'about-mode-row about-mode-' + mode.id} key={mode.id}>
            <div className="about-mode-symbol">
              <span>0{index + 1}</span>
              {mode.id === 'bomb' ? <FiShield aria-hidden="true" /> : <FiCrosshair aria-hidden="true" />}
            </div>
            <div className="about-mode-description">
              <small>{mode.subtitle.toUpperCase()}</small>
              <h3>{mode.title}</h3>
              <p>{mode.id === 'bomb'
                ? 'A round-based battle between Terrorists planting the bomb and Police defending or defusing it. Sites A and B, limited time and no respawns within a round make each decision consequential.'
                : 'An elimination-focused team battle with respawns. Push into contested positions, protect teammates and build a team score through confirmed kills.'}</p>
            </div>
            <div className="about-mode-spec">
              <strong>5V5</strong>
              <span>{mode.id === 'bomb' ? 'PLANT / DEFUSE' : 'TEAM SCORE / RESPAWN'}</span>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="about-section about-design">
      <div className="container">
        <div className="about-section-header">
          <div>
            <p className="about-eyebrow"><span /> 04 / GAME DESIGN</p>
            <h2>BUILT AROUND<br /><em>THE PLAYER.</em></h2>
          </div>
          <p>Weapon handling, fair match decisions and long-term progression are connected parts of the same experience.</p>
        </div>
        <div className="about-principles">
          {principles.map((item) => <article key={item.number}>
            <span>{item.number} / DESIGN PILLAR</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>)}
        </div>
        <div className="about-armory">
          <div className="about-armory-intro">
            <span>LOADOUT SYSTEM</span>
            <h3>CHOOSE YOUR<br /><em>EQUIPMENT.</em></h3>
            <p>The game includes owned-weapon inventory, equipment selection and a shop. Weapon performance depends on the selected profile—not simply its appearance.</p>
          </div>
          <div className="about-armory-rows">
            {LOADOUT.map((item) => <div key={item.number}>
              <b>{item.number}</b>
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="about-section about-world">
      <div className="container about-world-layout">
        <div>
          <p className="about-eyebrow"><span /> 05 / BATTLEFIELDS</p>
          <h2>EVERY MAP<br />CHANGES <em>THE FIGHT.</em></h2>
          <p>PointBlock's game registry defines two Team Deathmatch arenas and three Bomb Mission arenas, covering outdoor streets, indoor facilities and objective-focused spaces.</p>
          <Link to="/maps" className="about-inline-link">EXPLORE ALL FIVE MAPS <FiArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="about-map-ledger">
          {MAPS.map((map) => <div key={map.id}>
            <span>{map.number}</span>
            <div><strong>{map.name}</strong><small>{map.type}</small></div>
            <b>{map.category}</b>
          </div>)}
        </div>
      </div>
    </section>

    <section className="about-section about-ecosystem">
      <div className="container">
        <div className="about-section-header">
          <div>
            <p className="about-eyebrow"><span /> 06 / IDENTITY & ECOSYSTEM</p>
            <h2>GAMING FIRST.<br /><em>BUILT FOR ROBINHOOD CHAIN.</em></h2>
          </div>
          <p>PointBlock uses wallet-based player identity on Robinhood Chain Mainnet while the game backend maintains operator data and progression.</p>
        </div>
        <div className="about-ecosystem-layout">
          <div className="about-ecosystem-primary">
            <img className="about-robinhood-logo" src={robinhoodLogo} alt="Robinhood Chain logo" width="76" height="76" />
            <p className="about-network-label">NETWORK / MAINNET</p>
            <h3>ROBINHOOD CHAIN</h3>
            <p>Wallet sign-in uses a backend-verified signature on Robinhood Chain Mainnet (Chain ID {NETWORK.chainId}). Connected accounts and earned game progress are tied to authenticated player identities.</p>
            <div className="about-network-details"><span>CHAIN ID <strong>{NETWORK.chainId}</strong></span><span>NATIVE GAS <strong>{NETWORK.nativeCurrency}</strong></span></div>
          </div>
          <div className="about-ecosystem-secondary">
            <h3>THE ROLE OF vPBT</h3>
            <p>vPBT is an in-game balance recorded by PointBlock's backend. It is part of the game's reward and equipment economy, not an on-chain trading balance.</p>
            <div className="about-network-divider" />
            <h3 className="about-pbt-title"><img src={pbtLogo} alt="" aria-hidden="true" width="34" height="34"/>WHAT ABOUT PBT?</h3>
            <p>PBT-related functionality and the in-game converter remain coming-soon concepts. No verified public contract address or live token exchange has been announced in the game source.</p>
            <Link to="/tokenomics" className="about-inline-link">VIEW TOKEN INFORMATION <FiArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="about-section about-status">
      <div className="container">
        <div className="about-section-header">
          <div>
            <p className="about-eyebrow"><span /> 07 / PROJECT STATUS</p>
            <h2>BUILT IN STAGES.<br /><em>REFINED WITH PURPOSE.</em></h2>
          </div>
          <p>We distinguish what is represented in the game source from what still requires production verification.</p>
        </div>
        <div className="about-status-rows">
          <div><FiCheckCircle aria-hidden="true" /><span>IN THE GAME SOURCE</span><p>3D FPS presentation, two gameplay modes, five maps, weapon systems, training, rooms, ranks, inventory and match-related UI.</p></div>
          <div><FiLock aria-hidden="true" /><span>STILL UNDER DEVELOPMENT</span><p>Production multiplayer verification, cross-browser launch readiness, mobile gameplay and future PBT utility.</p></div>
        </div>
        <DesktopNotice />
      </div>
    </section>

    <section className="about-ending">
      <div className="container about-ending-layout">
        <div>
          <p className="about-eyebrow"><span /> POINTBLOCK / ENTER THE ARENA</p>
          <h2>THE NEXT ROUND<br /><em>STARTS WITH YOU.</em></h2>
          <p>Experience PointBlock from a supported desktop browser and follow the game's ongoing development.</p>
        </div>
        <div className="about-ending-actions"><PlayButton /><Link to="/play-to-earn" className="btn btn-outline">HOW PROGRESSION WORKS <FiArrowRight aria-hidden="true" /></Link></div>
      </div>
    </section>
  </div>;
}
