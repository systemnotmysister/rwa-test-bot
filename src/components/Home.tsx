
import { Link, Routes, Route } from 'react-router-dom';
import vezgif from '/vezgif.gif'
import pero from '/pero.gif'
import { AppProvider, useAppContext } from '../AppContext';
import Claim from './Claim';
import perz from '/perz.gif'


function Home() {
  const {  userData } = useAppContext();


    return (



        <div className={`container `}>
             
  
             <img 
             style={{height:'100%'}}
        src={perz} 
       
      />  
      
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
      
      </div>
       

  
    );
  }
  
  export default Home;
  
  