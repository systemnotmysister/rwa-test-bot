import React from 'react'
import { Link } from 'react-router-dom';

function Refferal() {


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
        <div className="rreff"></div>
       
        </div>
  
    );
  }
  
  export default Refferal;
  
  
  
  
  
  