import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Claim from './components/Claim.tsx';
import UpgradeTime from './components/UpgradeTime.tsx';
import UpgradeSpeed from './components/UpgradeSpeed.tsx';
import Missions from './components/Missions.tsx';
import Refferal from './components/Refferal.tsx';
import Nft from './components/nft.tsx';

import './App.css';

function App() {
  const [bgClass, setBgClass] = useState('default-bg');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/claim':
        setBgClass('claim-bg');
        break;
      case '/upgrade-time':
        setBgClass('upgrade-time-bg');
        break;
      case '/upgrade-speed':
        setBgClass('upgrade-speed-bg');
        break;
      case '/missions':
        setBgClass('missions-bg');
        break;
      case '/nft':
        setBgClass('nft-bg');
        break;
      case '/refferals':
        setBgClass('refferal-bg');
        break;
      default:
        setBgClass('default-bg');
    }
  }, [location]);

  return (
    <div className={`container ${bgClass}`}>
      <div className="top-buttons">
        <div className="button icon-graduation">
          <img className='header-im' src="./kepka.png" alt="" />
        </div>
        <div className="button icon-wallet">
          <img className='header-im' src="./wallet.png" alt="" />
        </div>
      </div>
      
      <div className="bottom-buttons">
        <div className="button">
          <Link to='/upgrade-time'>
            <img className='image' src="./cup.png" alt="upgrade time" />
          </Link>
        </div>
        <div className="button">
          <Link to='/claim'>
            <img className='image' src="./dengi.png" alt="claim" />
          </Link>
        </div>
        <div className="button">
          <Link to='/upgrade-speed'>
            <img className='image' src="./up.png" alt="upgrade speed" />
          </Link>
        </div>
        <div className="button">
          <Link to='/missions'>
            <img className='image' src="./note.png" alt="missions" />
          </Link>
        </div>
        <div className="button">
          <Link to='/nft'>
            <img className='image' src="./palitra.png" alt="nft" />
          </Link>
        </div>
        <div className="button">
          <Link to='/refferals'>
            <img className='image' src="./ref.png" alt="refferals" />
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/claim" element={<Claim />} />
        <Route path="/upgrade-time" element={<UpgradeTime />} />
        <Route path="/upgrade-speed" element={<UpgradeSpeed />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/nft" element={<Nft />} />
        <Route path="/refferals" element={<Refferal />} />
      </Routes>
    </div>
  );
}

export default App;