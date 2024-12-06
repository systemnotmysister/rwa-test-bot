import React, { useEffect, useState, useContext, useMemo } from "react";
import "../App.css";
import axios from "axios";
import claimcut from "/claimcut.gif";
import dd1 from "/dd1.gif";
import dd1stoplast from "/dd1stoplast.png";
import NavigationButtons from './NavButtons'; // Импортируем контекст
import { useAppContext } from "../AppContext";
const Claim = () => {
  const { nextLevelRule, findNextLevelRule, userData ,setUserData,setNextLevelRule,isLoading,configData,setCurrentFarmingRule } = useAppContext();

  useEffect(() => {
    if (userData.farmingLevel > 0 && configData.farmingRules.length > 0) {
      const rule = findNextLevelRule(userData.farmingLevel);
      if (rule) {
        console.log('Next level rule:', rule); // Логирование nextLevelRule
      } else {
        console.log('No next level rule found');
      }
    }
  }, [userData.farmingLevel, configData.farmingRules]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const animationDuration = 2900;
  const [canClaim, setCanClaim] = useState(true);

  const handlePlayAnimation = async () => {
    setIsPlaying(true);

    if (!canClaim) return; // Блокируем запрос, если claim уже отправлен
  
    setCanClaim(false); // Блокируем отправку запросов
    // setIsPlaying(true);
  
    try {
      const response = await axios.post("/api/v1/farming/claim", {}, {
        headers: {
          Authorization: window.Telegram.WebApp.initData || "",
          "Content-Type": "application/json",
        },
      });
  
      if (response.data?.state === "success") {
        const updatedUserData = { ...userData, ...response.data.data };
        setUserData(updatedUserData); // Обновляем данные пользователя
  
        // Проверяем и обновляем правила фарминга
        if (updatedUserData.farmingLevel > userData.farmingLevel) {
          const nextLevel = updatedUserData.farmingLevel + 1;
          const currentRule = response.data.farmingRules[updatedUserData.farmingLevel];
          const nextRule = response.data.farmingRules[nextLevel];
          setCurrentFarmingRule(currentRule);
          setNextLevelRule(nextRule);
        }
      }
    } catch (error) {
      console.error("Error during claim request:", error);
    } finally {
      // setIsPlaying(false);
      setCanClaim(true); // Разблокируем отправку запросов
    }
  };

  useEffect(() => {
    if (nextLevelRule) {
      console.log("Next level rule updated:", nextLevelRule);
    }
  }, [userData]);

  // Таймер для управления GIF
  useEffect(() => {
    if (isPlaying) {
      const showTimeout = setTimeout(() => setShowGif(true), 100);
      const hideTimeout = setTimeout(() => {
        setShowGif(false);
        setIsPlaying(false);
      }, animationDuration);

      return () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [isPlaying, animationDuration]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Статичное изображение, скрытое при проигрывании GIF */}
      <img
        src={dd1stoplast}
        alt="Static preview"
        onClick={handlePlayAnimation}
        
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          marginTop: '-20%',
        }}
      />
      <p
        style={{
          marginTop: '5%',
          marginLeft: '150px',
          zIndex: '100',
        }}
      >
    Farming Level: {userData.farmingLevel}
      </p>

      <p
        style={{
          marginBottom: '93%',
          marginLeft: '150px',
          zIndex: '100',
          transform: 'rotate(-8deg)',
        }}
      >
        {userData.availableClaimAmount}
      </p>

      {/* Новый вывод текущего уровня и цены апгрейда */}
      {/* <p
        style={{
          marginLeft: '150px',
          zIndex: '100',
          transform: 'rotate(-10deg)',
        }}
      >
        Farming Level: {userData.farmingLevel}
      </p> */}

      {/* Вывод следующего уровня */}
      {/* <p
        style={{
          marginLeft: '150px',
          zIndex: '100',
          transform: 'rotate(-10deg)',
        }}
      >
        Next Level Rule: {nextLevelRule ? `Level ${nextLevelRule.level} - ${nextLevelRule.cost}` : "N/A"}
      </p> */}

      {/* <p
        style={{
          marginLeft: '175px',
          zIndex: '100',
          transform: 'rotate(-10deg)',
        }}
      >
        Next Level Rule: {nextLevelRule?.level}
      </p> */}

      {/* GIF анимация, показанная только при isPlaying */}
      {showGif && (
        <img
          src={dd1}
          alt="GIF animation"
          style={{
            position: 'absolute',
            cursor: 'pointer',
            opacity: isPlaying ? 1 : 0,
            overflow: 'hidden',
            marginTop: '-20%',
          }}
          className="ttime fade-in"
        />
      )}
      <NavigationButtons />
    </>
  );
}

export default Claim;
