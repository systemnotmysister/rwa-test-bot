import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";  
import cloc from "/cloc.gif"; // Ваш GIF
import time from "/time.png"; // Ваш GIF
import axios from "axios";
import cloc3 from "/cloc3.png"; // Ваш GIF
import { useAppContext } from "../AppContext";

function Time() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const { nextLevelRule, findNextLevelRule, userData ,setUserData,setNextLevelRule,isLoading,configData,setCurrentFarmingRule } = useAppContext();

  const animationDuration = 2400;


          const handlePlayAnimation = async () => {
            setIsPlaying(true);
        
            try {
              const response = await axios.post('/api/v1/farming/accumulation/level', {}, {
                headers: {
                  'Authorization': window.Telegram.WebApp.initData || '',
                  'Content-Type': 'application/json',
                },
              });
              console.log("Farming level increase successful:", response.data);
        
              if (response.data?.state === "success") {
                const updatedUserData = { ...userData, ...response.data.data };
                setUserData(updatedUserData); // Обновляем данные пользователя
            } 
          } catch (error) {
            console.error("Error during claim request:", error);
          }
        
          }

  useEffect(() => {
    if (isPlaying) {
      const showGifTimeout = setTimeout(() => setShowGif(true));
      const hideGifTimeout = setTimeout(() => {
        setShowGif(false);
        setIsPlaying(false);
      }, animationDuration);

      return () => {
        clearTimeout(showGifTimeout);
        clearTimeout(hideGifTimeout);
      };
    }
  }, [isPlaying, animationDuration]);

  return (
    <>
    
      <img 
        src={cloc3} 
        alt="Static preview" 
        onClick={handlePlayAnimation} 
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{ cursor: 'pointer' ,position:'absolute',marginTop:'20%',}} 
      />
  <p>Accumulation Level: {userData.accumulationLevel}</p>
  <p>Accumulation Duration: {userData.accumulationDuration}</p>
  <p
        style={{
          marginLeft: '150px',
          zIndex: '100',
          transform: 'rotate(-10deg)',
        }}
      >
        Next Level Rule: {nextLevelRule ? `Level ${nextLevelRule.level} - ${nextLevelRule.cost}` : "N/A"}
      </p>

  {showGif && (
        <img
          src={cloc}
          alt="GIF animation"
          style={{
            cursor: "pointer",
            position: "absolute",
            marginTop: "20%",
            height: "328px",
            opacity: isPlaying ? 1 : 0,
          }}
          className={`ttime fade-in`}
        />
      )}

    </>
  );
}

export default Time;


