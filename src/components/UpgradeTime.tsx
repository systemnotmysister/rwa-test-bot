import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";  
import cloc from "/cloc.gif"; // Ваш GIF
import time from "/time.png"; // Ваш GIF
import axios from "axios";

function Time() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [storageData, setStorageData] = useState({
    accumulationLevel: 0,
    accumulationDuration: 0,
    farmingLevel: 0,
    farmingPerHour: 0,
  });


  const handlePlayAnimation = async () => {
    setIsPlaying(true); 


      try {
        const response = await axios.post('/api/v1/farming/accumulation/level', {}, {
          headers: {
            'Authorization': window.Telegram.WebApp.initData || '',
            'Content-Type': 'application/json',
          },
        });
        
      console.log('Storage level increase successful:', response.data);

      setStorageData({
        accumulationLevel: response.data.data.accumulationLevel,
        accumulationDuration: response.data.data.accumulationDuration,
        farmingLevel: response.data.data.farmingLevel,
        farmingPerHour: response.data.data.farmingPerHour,
      });
    } catch (error) {
      console.error('Error upgrading storage level:', error); 
    }

    const animationDuration = 2400;

    setTimeout(() => {
      setIsPlaying(false); 
    }, animationDuration);
  };

  return (
    <>
    
      <img 
        src={time} 
        alt="Static preview" 
        onClick={handlePlayAnimation} 
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{ cursor: 'pointer' ,position:'absolute',marginTop:'20%',}} 
      />
  <p>Accumulation Level: {storageData.accumulationLevel}</p>
  <p>Accumulation Duration: {storageData.accumulationDuration}</p>
      {isPlaying && (
        <img 
          src={cloc} 
          alt="GIF animation" 
          style={{ cursor: 'pointer',position:'absolute' ,marginTop:'26.5%',    }} 
          className={`ttime fade-in`}
        />
      )}

    </>
  );
}

export default Time;


