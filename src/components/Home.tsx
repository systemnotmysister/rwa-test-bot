
import { Link, Routes, Route } from 'react-router-dom';



function Home() {


    return (
  
        // <div className={`container }`}>
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
    
      // </div>
       
  
  
    );
  }
  
  export default Home;
  
  