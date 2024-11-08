import React, { Suspense, useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Wallet from './components/Wallet.tsx';
// import  BackButton  from './components/BackButton.tsx';
import vidos from '../public/vidos.mp4'
import { TelegramWebApp, WebAppBackButton } from "@kloktunov/react-telegram-webapp";
import axios from 'axios';

axios.defaults.baseURL = 'https://atico-bot-dev-k32smuadja-ew.a.run.app'

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
    if (window.Telegram && window.Telegram.WebApp) {
      const initDataString = window.Telegram.WebApp.initData || "";
      console.log("Raw initData:", initDataString);
  
      // Декодируем и извлекаем данные
      try {
        const decodedInitData = decodeURIComponent(initDataString);
        const userDataString = decodedInitData.split('user=')[1];
        const jsonString = userDataString.split('}')[0] + '}';
  
        const initData = JSON.parse(jsonString);
        const user = initData?.user || {};
        console.log("Parsed user data:", user || "User data not available.");
  
        // Проверяем, получены ли данные пользователя
        if (user && Object.keys(user).length > 0) {
          createUser(user, initDataString); // Передаем initDataString в функцию
        } else {
          console.error("User data is empty. Sending default values.");
          createUser({}, initDataString); // Передаем initDataString даже если данные пользователя пустые
        }
      } catch (error) {
        console.error("Failed to parse initData:", error);
      }
    } else {
      console.warn("Telegram WebApp API is not available. Are you testing in Telegram?");
    }
  }, []);
  
  const createUser = async (userData: any, initData: string) => {
    const userPayload = {
      id: userData.id || "", 
      username: userData.username || "",
      firstName: userData.first_name || "",
      lastName: userData.last_name || "",
      languageCode: userData.language_code || "en",
      addedToAttachmentMenu: userData.added_to_attachment_menu || false,
      allowsWriteToPm: userData.allows_write_to_pm || false,
      photoUrl: userData.photo_url || "",
      chatId: userData.chat_id || "",
      referralCode: userData.referral_code || "",
      sponsorId: userData.sponsor_id || "",
      friendsCount: userData.friends_count || 0,
      createdAt: Date.now(), 
      farmingLevel: 0,
      farmingPerHour: 0,
      accumulationLevel: 0,
      accumulationDuration: 0,
      farmingBalance: 0,
      availableClaimAmount: 0,
      lastCalimAt: 0,
      bot: userData.bot || false,
      premium: userData.premium || false,
    };
  
    try {
      const response = await axios.post('/api/v1/user', userPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': initData, // Указываем initData в заголовке
        },
      });
      console.log('User created successfully:', response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };
  
  

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
  
    setTimeout(initializeBackButton, 100); 
  
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
      {/* Добавляем Suspense для обработки загрузки компонентов */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/wallet-connect" element={<Wallet />} />

          <Route  path="/claim" element={<Claim  />} />
          <Route path="/upgrade-time" element={<UpgradeTime />} />
          <Route path="/upgrade-speed" element={<UpgradeSpeed />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/refferals" element={<Refferal />} />
        </Routes>
      </Suspense>
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
    </div>
  );
}

export default App;