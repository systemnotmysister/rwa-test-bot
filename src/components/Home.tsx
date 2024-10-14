import React from 'react';
import UpgradeSpeed from './UpgradeSpeed.tsx';
import Claim from './Claim.tsx';
import { Link, Routes, Route } from 'react-router-dom';
import Missions from './Missions.tsx';
import Nft from './Nft.tsx';
import Refferal from './Refferal.tsx';
import UpgradeTime from './UpgradeTime.tsx';


function Home() {


    return (
  
        <div className={`container }`}>
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
    
        <Routes>
          <Route path="/claim" element={<Claim />} />
          <Route path="/upgrade-time" element={<UpgradeTime />} />
          <Route path="/upgrade-speed" element={<UpgradeSpeed />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/refferals" element={<Refferal />} />
        </Routes>
      </div>
       
  
  
    );
  }
  
  export default Home;
  
  