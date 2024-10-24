import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import cloc from '/cloc.mp4';

function Time() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayAnimation = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleAnimationEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      {/* Статичное изображение, которое скрывается при активации анимации */}
      <img 
        src="./time.png" 
        alt="Static preview" 
        className={`ups ${isPlaying ? 'hidden' : ''}`} 
        onClick={handlePlayAnimation} 
        style={{ cursor: 'pointer',position:'absolute' }} 
      />

      {/* Видео, которое отображается при клике и скрывается после завершения */}
      <video 
        ref={videoRef} 
        className={`ups ${isPlaying ? 'visible' : 'hidden'}`} 
        muted 
        onEnded={handleAnimationEnd}
      >
        <source src={cloc} type="video/mp4" />
      </video>

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
    </>
  );
}

export default Time;
