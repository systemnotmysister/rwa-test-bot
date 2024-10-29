import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Убедитесь, что импорт правильный
import claim from "/claim.png"; // Статическая картинка
import ezgifclaim from "/ezgifclaim.gif"; // Ваш GIF

function Speed() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAnimation = () => {
    setIsPlaying(true); // Запускаем анимацию

    // Установите время, равное длительности вашей анимации (в миллисекундах)
    const animationDuration = 3500; // Замените на реальную длительность вашего GIF
    setTimeout(() => {
      setIsPlaying(false); // Завершаем анимацию
    }, animationDuration);
  };

  return (
    <>
      {/* Статичное изображение */}
      {/* <div className="container claim-bg"> */}
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
      <img 
        src={claim} 
        alt="Static preview" 
        onClick={handlePlayAnimation} 
        className={`ttime ${isPlaying ? 'fade-out' : 'fade-in'}`}
        style={{ cursor: 'pointer' ,position:'absolute',marginTop:'22%'}} 
      />
      
      {/* GIF анимация */}
      {isPlaying && (
        <img 
          src={ezgifclaim} // Изменено на GIF
          alt="GIF animation" 
          style={{ cursor: 'pointer',position:'absolute',height:' 405px',marginTop:'25%'   }} 
          className={`ttime fade-in`}
        />
      )}

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
{/* </div> */}
      
    </>
  );
}

export default Speed;
