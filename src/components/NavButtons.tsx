import { Link} from 'react-router-dom';
import { useAppContext } from "../AppContext";
import React, { useEffect, useState, useContext, useMemo } from "react";
// import balancebut from '.balancebut.png'

const NavigationButtons = () => {
  const {  userData } = useAppContext();

return (
<>
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
{userData.farmingLevel &&
<div style={{position:'absolute',width:'88%',justifyContent:'space-evenly',bottom:'24.5%',marginLeft:'7%',display:'flex'}} >
    <img style={{width:'39%'}}   src="./quesbut.png"  alt="Claim" />
    <img style={{width:'38%'}}  src="./balancebut.png" alt="Claim" />
<h5 style={{margin:'2.5% 39% 0% auto',position:'absolute'}}>{userData.farmingBalance} </h5> 
  </div>
}
    <div className="bottom-buttons">
    

      <Link className='button' to="/claim">
        <img className='image' src="./dengi.png" alt="Claim" />
      </Link>
      <Link className='button' to="/upgrade-time">
        <img  className='image'  src="./cup.png" alt="Upgrade Time" />
      </Link>
      <Link className='button' to="/upgrade-speed">
        <img className='image'  src="./up.png" alt="Upgrade Speed" />
      </Link>
      <Link className='button' to="/missions">  
        <img className='image'  src="./note.png" alt="Missions" />
      </Link>
      <Link className='button'  to="/nft">
        <img className='image'  src="./palitra.png" alt="NFT" />
      </Link>
      <Link className='button'   to="/refferals">
        <img className='image'  src="./ref.png" alt="Referrals" />
      </Link>
    </div>
    </>)
}
  
  
  export default NavigationButtons