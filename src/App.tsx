import React, { Suspense, useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Используем React.lazy для ленивой загрузки компонентов
const Claim = React.lazy(() => import('./components/Claim.tsx'));
const UpgradeTime = React.lazy(() => import('./components/UpgradeTime.tsx'));
const UpgradeSpeed = React.lazy(() => import('./components/UpgradeSpeed.tsx'));
const Missions = React.lazy(() => import('./components/Missions.tsx'));
const Refferal = React.lazy(() => import('./components/Refferal.tsx'));
const Nft = React.lazy(() => import('./components/Nft.tsx'));
const Home = React.lazy(() => import('./components/Home.tsx'));

function App() {
  const [bgClass, setBgClass] = useState('default-bg');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Изменение фона в зависимости от пути
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

  useEffect(() => {
    if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
      const telegram = window.Telegram.WebApp;
  
      // Показываем кнопку "Назад"
      telegram.BackButton.show();
  
      // Обработчик нажатия на кнопку "Назад"
      telegram.BackButton.onClick(() => {
        navigate(-1); // Переход назад по истории
      });
    } else {
      console.error('Telegram WebApp is not available');
    }
  
    return () => {
      if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
        window.Telegram.WebApp.BackButton.hide();
      }
    };
  }, [navigate]);

  return (
    <div className={`container ${bgClass}`}>
      <div className="top-buttons">
        <div className="button icon-graduation">
          <img className='header-im' src="./kepka.png" alt="graduation cap" />
        </div>
        <div className="button icon-wallet">
          <img className='header-im' src="./wallet.png" alt="wallet" />
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

      {/* Добавляем Suspense для обработки загрузки компонентов */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/upgrade-time" element={<UpgradeTime />} />
          <Route path="/upgrade-speed" element={<UpgradeSpeed />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/refferals" element={<Refferal />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
