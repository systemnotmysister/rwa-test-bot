import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Убедитесь, что импорт правильный
import claim from "/claim.png"; // Статическая картинка
import ezgifclaim2 from "/ezgifclaim2.gif"; // Ваш GIF
import axios from "axios";

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
      const animationDuration = 3750; // Длительность в миллисекундах
      setTimeout(() => {
        setIsPlaying(false); // Завершаем анимацию
      }, animationDuration);
    } catch (error) {
      console.error('Error claiming reward:', error);
    }}

  return (
    <>
      {/* Статичное изображение */}
      <div className='container claim-bg '>


      <img 
        src={claim} 
        alt="Static preview" 
        onClick={handlePlayAnimation} 
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{ cursor: 'pointer' ,position:'absolute',marginTop:'22%'}} 
      />
       <p>Farming Balance: {userData.farmingBalance}</p>
       <p style={{marginBottom: '312px',marginLeft:'150px',zIndex:'100',transform:'rotate(-10deg)'}}> {userData.availableClaimAmount} </p>
  
 
      {/* GIF анимация */}
      {isPlaying && (
        <img 
          src={ezgifclaim2} // Изменено на GIF
          alt="GIF animation" 
          style={{ cursor: 'pointer',position:'absolute',height:' 405px',marginTop:'25%'   }} 
          className={`ttime fade-in`}
        />
      )}
        </div>     
    </>
  );
}

export default Claim;
