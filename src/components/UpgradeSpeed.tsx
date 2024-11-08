import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; 
import speed from "/speed.gif"; 
import upgrade from "/upgrade.png"; 
import axios from "axios";

function Speed() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [accumulationData, setAccumulationData] = useState({
    accumulationLevel: 0,
    accumulationDuration: 0,
    farmingLevel: 0,
    farmingPerHour: 0,
  });
  const handlePlayAnimation = async () => {
    setIsPlaying(true);


    try {
      const response = await axios.post('/api/v1/farming/level', {}, {
        headers: {
          'Authorization': window.Telegram.WebApp.initData || '',
          'Content-Type': 'application/json',
        },
      });
      console.log('Farming level increase successful:', response.data);

      // Обновляем состояние с новыми данными
      setAccumulationData({
        accumulationLevel: response.data.data.accumulationLevel,
        accumulationDuration: response.data.data.accumulationDuration,
        farmingLevel: response.data.data.farmingLevel,
        farmingPerHour: response.data.data.farmingPerHour,
      });
    } catch (error) {
      console.error('Error upgrading accumulation level:', error);
    }


    const animationDuration = 5000;
    setTimeout(() => {
      setIsPlaying(false);
    }, animationDuration);
  };


  return (
    <>
      {/* <div className=" upgrade-cont"> */}

          
  {/* Статичное изображение */}
      <img 
        src={upgrade} 
        alt="Static preview" 
        onClick={handlePlayAnimation} 
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{ cursor: 'pointer' ,position:'absolute',marginTop:'18%', height:' 405px'}} 
      />
      <p>Accumulation Level: {accumulationData.accumulationLevel}</p>
        <p>Accumulation Duration: {accumulationData.accumulationDuration}</p>
        <p>Farming Level: {accumulationData.farmingLevel}</p>
        <p>Farming per Hour: {accumulationData.farmingPerHour}</p>
      {/* GIF анимация */}
      {isPlaying && (
        <img 
          src={speed} // Изменено на GIF
          alt="GIF animation" 
          style={{ cursor: 'pointer',position:'absolute' ,marginTop:'24%',height:'370px'    }} 
          className={`ttime fade-in`}
        />
      )}
    </>
  );
}

export default Speed;
