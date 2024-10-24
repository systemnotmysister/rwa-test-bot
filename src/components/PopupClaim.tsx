import React from 'react';
import './PopupClaim.css';  // Add custom styling if needed

function Popup({ showPopup, onClose }: { showPopup: boolean; onClose: () => void }) {
  if (!showPopup) return null; // Don't render the pop-up if it's not supposed to be shown

  return (
    <div className="popup-container" onClick={onClose} >

      <div className="popup-content">
        <video autoPlay  className="popup-animation">
          <source src="/claimvid.MP4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Popup;
