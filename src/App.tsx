import './App.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Claim from './components/Claim.tsx';
import UpgradeTime from './components/UpgradeTime.tsx';
import UpgradeSpeed from './components/UpgradeSpeed.tsx';
import Missions from './components/Missions.tsx';
import React, { useEffect, useState } from 'react';

function App() {
  // const location = useLocation();
  // const [bgClass, setBgClass] = useState('default-bg');

  // useEffect(() => {
  //   // Устанавливаем класс фона в зависимости от текущего маршрута
  //   const isMissionsPage = location.pathname === '/missions';
  //   setBgClass(isMissionsPage ? 'missions-bg' : 'default-bg');
  // }, [location]);

  return (
    <div className={`container`}>
      <div className="top-buttons">
        <div className="button icon-graduation">
          <img className='header-im' src="./kepka.png" alt="" />
        </div>
        <div className="button icon-wallet">
          <img className='header-im' src="./wallet.png" alt="" />
        </div>
      </div>
      <div className="main-content"></div>

      <div className="bottom-buttons">
        <div className="button">
          <Link to='/claim'>
            <img className='image' src="./cup.png" alt="claim" />
          </Link>
        </div>
        <div className="button">
          <img className='image' src="./dengi.png" alt="upgrade-time" />
        </div>
        <div className="button">
          <Link to='/missions'>
            <img className='image' src="./note.png" alt="missions" />
          </Link>
        </div>
        <div className="button">
          <Link to='/upgrade-time'>
            <img className='image' src="./palitra.png" alt="upgrade" />
          </Link>
        </div>
        <div className="button">
          <Link to='/upgrade-speed'>
            <img className='image' src="./up.png" alt="upgrade-speed" />
          </Link>
        </div>
        <div className="button">
          <img className='image' src="./ref.png" alt="referrals" />
        </div>
      </div>

      <Routes>
      {/* <Route path="/" element={<App />} /> */}

        <Route path="/claim" element={<Claim />} />
        <Route path="/upgrade-time" element={<UpgradeTime />} />
        <Route path="/upgrade-speed" element={<UpgradeSpeed />} />
        <Route path="/missions" element={<Missions />} />
      </Routes>
    </div>
  );
}

export default App;
