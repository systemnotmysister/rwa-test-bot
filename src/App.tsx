import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import Wallet from "./components/Wallet.tsx";
import { TelegramWebApp, WebAppBackButton } from "@kloktunov/react-telegram-webapp";
import axios from "axios";
import NavigationButtons from "./components/NavButtons";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./AppContext";
import Home from "./components/Home.tsx";
import Claim from "./components/Claim.tsx";


axios.defaults.baseURL = "https://atico-bot-dev-k32smuadja-ew.a.run.app";

// const Claim = React.lazy(() => import("./components/Claim.tsx"));
const UpgradeTime = React.lazy(() => import("./components/UpgradeTime.tsx"));
const UpgradeSpeed = React.lazy(() => import("./components/UpgradeSpeed.tsx"));
const Missions = React.lazy(() => import("./components/Missions.tsx"));
const Refferal = React.lazy(() => import("./components/Refferal.tsx"));
const Nft = React.lazy(() => import("./components/Nft.tsx"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем данные из контекста
  const { initData, userData, setInitData } = useAppContext();

  const [show, setShow] = useState(false);
  const [bgClass, setBgClass] = useState("default-bg");

  const toggleBackButton = () => setShow(!show);

  const onClick = () => {
    console.log("Back button was clicked!");
  };

  useEffect(() => {
    const initializeBackButton = () => {
      if (typeof window.Telegram !== "undefined" && window.Telegram.WebApp) {
        const telegram = window.Telegram.WebApp;

        console.log("Telegram WebApp API version:", telegram.version);

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
      if (window.Telegram?.WebApp?.BackButton) {
        window.Telegram.WebApp.BackButton.hide();
      }
    };
  }, [navigate]);

  useEffect(() => {
    console.log(`[Routing] Current location: ${location.pathname}`);
    const routesToBgClass: Record<string, string> = {
      "/claim": "claim-bg",
      "/upgrade-time": "upgrade-time-bg",
      "/upgrade-speed": "upgrade-speed-bg",
      "/missions": "missions-bg",
      "/nft": "nft-bg",
      "/refferals": "refferal-bg",
      "/wallet-connect": "wallet-bg",
    };
    setBgClass(routesToBgClass[location.pathname] || "default-bg");
  }, [location.pathname]);

  return (
    <div className={`container ${bgClass}`}>
      <TelegramWebApp>
        {show && <WebAppBackButton onClick={onClick} />}
      </TelegramWebApp>
      <AppProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <BrowserRouter> */}
          <Routes>
           <Route path="/*" element={<Home />} />
            <Route path="/claim" element={<Claim />} />
            <Route path="/upgrade-speed" element={<UpgradeSpeed />} />
            <Route path="/upgrade-time" element={<UpgradeTime />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/nft" element={<Nft />} />
            <Route path="/refferals" element={<Refferal />} />
            <Route path="/wallet-connect" element={<Wallet />} />

          </Routes>
        {/* </BrowserRouter> */}
      </Suspense>
      <NavigationButtons  />
      </AppProvider>  
    </div>
  );
}

export default App;
