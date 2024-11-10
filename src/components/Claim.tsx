import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Убедитесь, что импорт правильный
import claim from "/claim.png"; // Статическая картинка
import ezgifclaim2 from "/ezgifclaim2.gif"; // Ваш GIF
import axios from "axios";
import obrez5 from "/obrez2.gif"; // Ваш GIF
import clearupa from "/clearupa.gif"; // Ваш GIF
import claimdef from "/claimdef.png"; // Ваш GIF
import claimcut from "/claimcut.gif"; // Ваш GIF

function Claim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState({});
  const [showGif, setShowGif] = useState(false);

  // Длительность анимации GIF
  const animationDuration = 3650;

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
      setUserData({
        ...response.data,
      });
    } catch (error) {
      console.error('Error upgrading storage level:', error);
    }
  };

  // useEffect для управления отображением GIF и окончания анимации
  useEffect(() => {
    if (isPlaying) {
      // Показываем GIF с небольшой задержкой для предотвращения мерцания
      const showGifTimeout = setTimeout(() => setShowGif(true));

      // Скрываем GIF и останавливаем анимацию после окончания проигрывания
      const hideGifTimeout = setTimeout(() => {
        setShowGif(false);
        setIsPlaying(false);
      }, animationDuration);

      // Очищаем таймеры при размонтировании или изменении состояния
      return () => {
        clearTimeout(showGifTimeout);
        clearTimeout(hideGifTimeout);
      };
    }
  }, [isPlaying, animationDuration]);

  return (
    <>
      {/* Статичное изображение, скрытое при проигрывании GIF */}
      <img 
        src={claimdef} 
        alt="Static preview" 
        onClick={handlePlayAnimation} 
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          marginTop: '14%',
          display: showGif ? 'none' : 'block',
        }} 
      />

      <p style={{
        marginBottom: '312px',
        marginLeft: '150px',
        zIndex: '100',
        transform: 'rotate(-10deg)'
      }}>
      </p>

      {/* GIF анимация, показанная только при isPlaying */}
      {showGif && (
        <img 
          src={claimcut} 
          alt="GIF animation" 
          style={{
            position: 'absolute',
            marginTop: '14%',
            cursor: 'pointer'
          }} 
          className="ttime fade-in"
        />
      )}
    </>
  );
}


export default Claim;
