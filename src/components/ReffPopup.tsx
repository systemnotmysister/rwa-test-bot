import React, { useEffect, useRef, MutableRefObject, useState } from 'react';
import refpopbg from '/refpopbg.png';
import refshare from '/refshare.png';
import refcopy from '/refcopy.png';



interface ShowReffPopupProps {
  showReffPopup: boolean;
  onClose: () => void;
  buttonRef: React.MutableRefObject<HTMLImageElement | null>;
}

function ReffPopup({ showReffPopup, onClose, buttonRef }: ShowReffPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const referralLink="https://t.me/atic_test_bot/aticotestbot?startapp=frndId6364191868"
  const handleCopyReferral = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink).then(
        () => {
          console.log("Referral link copied to clipboard!");
        },
        (error) => {
          console.error("Failed to copy referral link", error);
        }
      );
    }
  };
  // Функция для отправки ссылки (если Telegram поддерживает API)
  const handleShareReferral = () => {
  
    // Если поддерживается Telegram API, откроем ссылку через Telegram
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=Присоединяйтесь к моему боту!`
      );
    } else if (navigator.share) {
      // Веб-шаринг для мобильных устройств и поддерживаемых браузеров
      navigator.share({
        title: "Присоединяйтесь к моему боту!",
        url: referralLink,
      }).catch((error) => {
        console.error("Ошибка при отправке реферальной ссылки", error);
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      alert("Ссылка скопирована. Поделитесь с друзьями!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  if (!showReffPopup) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div ref={popupRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '52%' }}>
        <img 
          src={refpopbg} // Замените на актуальный путь
          alt="Add referral window popup" 
          style={{ width: '100%', height: 'auto', maxWidth: '300px' }} 
        />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '33% 34% 14%', flexDirection: 'column', position: 'absolute' }}>
          <img 
            alt="refshare button" 
            src={refshare} // Замените на актуальный путь
            style={{ height: '50px', width: '100px', cursor: 'pointer', paddingBottom: '5%' }} 
            onClick={handleShareReferral} // Вызов функции для отправки ссылки
          />
          <img 
            alt="refcopy button" 
            src={refcopy} // Замените на актуальный путь
            style={{ height: '45px', width: '100px', cursor: 'pointer' }} 
            onClick={handleCopyReferral} // Вызов функции для копирования ссылки
          />
        </div>
      </div>
    </div>
  );
}

export default ReffPopup;