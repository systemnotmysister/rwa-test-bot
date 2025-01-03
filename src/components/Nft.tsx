import React, { useState } from 'react';
import Popup from './Popup.tsx'
import { Link } from 'react-router-dom';
function Nft() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };

    return (
  
        <div className="container nft-bg">
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
              <div className="button">
          </div>
          <Popup showPopup={showPopup} onClose={togglePopup} />
          <div style={{justifyContent:'space-around ',display:'flex',flexDirection:'row' ,width:'83%' ,marginLeft:'8%',position:'absolute',bottom:'2%'}}>
          <div className="button"  onClick={togglePopup}>
            {/* <Link to='/home'> */} 
              <img className='image' src="./cup.png" alt="upgrade time" />
            {/* </Link> */}
          </div>
          <div className="button"  onClick={togglePopup}>
            {/* <Link to='/home'> */}
              <img className='image' src="./dengi.png" alt="claim" />
            {/* </Link> */}
          </div>
          </div>

        </div>
       
  
  
    );
  }
  
  export default Nft;
  
  
  
  
  
  