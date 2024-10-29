import React from 'react'
import { Link } from 'react-router-dom';

function Missions() {


    return (
    
          
      <div className='container missions-bg '>
 
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

        <div className="bottom-buttons" style={{marginLeft:'10%',justifyContent:'space-between',position:'absolute',bottom:'5%',width:'83%'}}>
        <div className="button">
        <img  className='image' alt="refferals" src='./mission-left.png' style={{height: '52px',  width: '106px'}}/>
        </div>
    
        <div className="button">
        <img  className='image' alt="refferals" src='./mission-right.png' style={{height: '52px',  width: '106px'}}/>
        </div>
        </div>
      
        </div>
  
    );
  }
//   
  export default Missions;
  
  
  
  
  