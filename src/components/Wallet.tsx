import React from 'react';
import { Link } from 'react-router-dom';

function Wallet() {
  return (

          <>       
          
      <div className="container wallet-bg">
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
      <div className="buttons" style={{ justifyContent:'space-around',   width: '99%',display:'flex',marginBottom:'10%'}} >

                <img className='image' src="./add-wallet.png" alt="missions" style={{height: '52px',  width: '106px'}}/>

      <img className='image' src="./add-wallet.png" alt="missions"  style={{height: '52px',  width: '106px'}}/>
      </div>
      </div>

    </>

  );
}

export default Wallet;