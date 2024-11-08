import React, { useRef, useState,MutableRefObject  } from 'react';
import { Link } from 'react-router-dom';
import ref from '/ref.png'; // Ваш GIF
import ReffPopup from './ReffPopup.tsx';



function Refferal() {
  const [showReffPopup, setShowReffPopup] = useState(false);
  const buttonRef = useRef<HTMLImageElement | null>(null); // Создаем ref для кнопки

  const toggleReffPopup = () => {
    setShowReffPopup(!showReffPopup);
  };

  return (
    <div className="container refferal-bg">
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

      {/* Попап появляется при нажатии на кнопку */}
      <ReffPopup showReffPopup={showReffPopup} onClose={() => setShowReffPopup(false)} buttonRef={buttonRef} />

      {/* Кнопка для открытия попапа */}
      <div>
        <img 
          src={ref} 
          alt="open referral popup button" 
          style={{ cursor: 'pointer', position: 'absolute', marginLeft: '40%', height: '50px', bottom: '3%' }} 
          onClick={(e) => {
            e.stopPropagation(); // Предотвращает клик вне попапа
            toggleReffPopup();
          }}
          ref={buttonRef} // Привязываем ref к кнопке
        />
      </div>
    </div>
  );
}

export default Refferal;
