import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Убедитесь, что импорт правильный
import claim from "/claim.png"; // Статическая картинка
import ezgifclaim2 from "/ezgifclaim2.gif"; // Ваш GIF
import axios from "axios";
import obrez5 from "/obrez2.gif"; // Ваш GIF
import clearupa from "/clearupa.gif"; // Ваш GIF
import claimdef from "/claimdef.png"; // Ваш GIF

function Claim() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [userData, setUserData] = useState({
    farmingBalance: 0,
    farmingLevel: 0,
    farmingPerHour: 0,
    accumulationLevel: 0,
    accumulationDuration: 0,
    availableClaimAmount: 0,
  });

  const handlePlayAnimation = async () => {
    setIsPlaying(true); // Запускаем анимацию

    // Отправляем запрос на клейм
    try {
      const response = await axios.post('/api/v1/farming/claim', {}, {
        headers: {
          'Authorization': window.Telegram.WebApp.initData || '',
          'Content-Type': 'application/json',
        },
      });
      console.log('Claim successful:', response.data);

      // Обновляем состояние с данными из ответа
      setUserData({
        farmingBalance: response.data.data.farmingBalance,
        farmingLevel: response.data.data.farmingLevel,
        farmingPerHour: response.data.data.farmingPerHour,
        accumulationLevel: response.data.data.accumulationLevel,
        accumulationDuration: response.data.data.accumulationDuration,
        availableClaimAmount: response.data.data.availableClaimAmount,
      });
    } catch (error) {
      console.error('Error upgrading storage level:', error);
    }


      const animationDuration = 3700;

      setTimeout(() => {
        setIsPlaying(false); 
      }, animationDuration)

    }
    
  return (
    <>
      {/* Статичное изображение */}
      <img 
        src={claimdef} 
        alt="Static preview" 
        onClick={handlePlayAnimation} 
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{ cursor: 'pointer' ,position:'absolute',marginTop:'14%'}} 
      />
       <p>Farming Balance: {userData.farmingBalance}</p>
       <p style={{marginBottom: '312px',marginLeft:'150px',zIndex:'100',transform:'rotate(-10deg)'}}> {userData.availableClaimAmount} </p>
  
 
      {/* GIF анимация */}
      {isPlaying && (
        <img 
          src={clearupa} // Изменено на GIF
          alt="GIF animation" 
          style={{position:'absolute',marginTop:'14%'   }} 
          className={`ttime fade-in`}
        />
      )}
    </>
  );
}

export default Claim;
