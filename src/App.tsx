import React, { Suspense, useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Wallet from './components/Wallet.tsx';
// import  BackButton  from './components/BackButton.tsx';
import vidos from '../public/vidos.mp4'
import { TelegramWebApp, WebAppBackButton } from "@kloktunov/react-telegram-webapp";



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
  const navigate = useNavigate();


  
  const [show, setShow] = useState(false);
  const toggleBackButton = () => setShow(!show);

  const onClick = () => {
    console.log("Back button was clicked!");
  }
  
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
        setBgClass('container upgrade-speed-bg');
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
        case '/wallet-connect':
          setBgClass('wallet-bg');
          break;
      default:
        setBgClass(`container ${bgClass}`);
    }
  }, [location]);

  useEffect(() => {
    const initializeBackButton = () => {
      if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
        const telegram = window.Telegram.WebApp;
  
        // Проверка версии API, возможно, BackButton доступен
        console.log("Telegram WebApp API version:", telegram.version);
  
        // Проверка и активация BackButton
        if (telegram.BackButton && telegram.BackButton.show) {
          telegram.BackButton.show();
  
          telegram.BackButton.onClick(() => {
            navigate(-1); // Возврат на предыдущую страницу
          });
        } else {
          console.warn("BackButton не поддерживается в этой версии API");
        }
      }
    };
  
    // Немного подождем и инициализируем API
    setTimeout(initializeBackButton, 100); // Задержка для более надёжной инициализации
  
    // Скрытие кнопки при размонтировании компонента
    return () => {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
        window.Telegram.WebApp.BackButton.hide();
      }
    };
  }, [navigate]);
  return (
    
    <div className={`container ${bgClass}`}>
      {/* <BackButton />; */}
      <TelegramWebApp>

{ show && <WebAppBackButton onClick={onClick} /> }

</TelegramWebApp>
      {/* <video autoPlay loop muted className="background-video">
          <source src={vidos} type="video/mp4" />
        </video> */}
      <div className="top-buttons">
        <div className="button icon-graduation">
          <img className='header-im' src="./kepka.png" alt="graduation cap" />
        </div>
        <div className="button icon-wallet">
        <Link to='/wallet-connect'>
          <img className='header-im' src="./wallet.png" alt="wallet" />
          </Link>

        </div>
      </div>


      {/* Добавляем Suspense для обработки загрузки компонентов */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/wallet-connect" element={<Wallet />} />

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