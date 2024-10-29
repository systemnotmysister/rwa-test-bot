
import { Link, Routes, Route } from 'react-router-dom';
import vezgif from '/vezgif.gif'


function Home() {


    return (
  
        <div className={`container `}>
             {/* <div className={`animate-cont `}> */}

             <img 
             style={{height:'100%'}}
        src={vezgif} 
       
      />  
        {/* </div> */}

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
    
      </div>
       
  
  
    );
  }
  
  export default Home;
  
  