import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
   RiMenu3Line, 
   RiCloseLine 
} from 'react-icons/ri';

import './style.css';

import store from '../../store';
import { useSelector } from 'react-redux';

const Nav = () => {

  const [toggleMenu, setToggleMenu] = useState(false);

  const navbar = useSelector((state) => state.navbar)

  const updateNavState = (payloadToSend) => {
    store.dispatch(
      { type: 'SET_NAVBAR', payload: payloadToSend }
    )
  }

  function disableScroll(){
    document.getElementById('scrollable').classList.add('disable-scroll');
  }
  
  function enableScroll(){
    document.getElementById('scrollable').classList.remove('disable-scroll');
  }

  return (
    <>
      <div className={`nav-mobile-main ${toggleMenu}`}>
        <div className="nav-mobile-toggle">
          {toggleMenu
            ? <RiCloseLine color='#393e46' size={27} onClick={() => {setToggleMenu(false)}} />
            : <RiMenu3Line color='#ffd369' size={27} onClick={() => {setToggleMenu(true)}} />
          }
        </div>
        {toggleMenu && (
          <div className="nav-mobile-menu">
              <div className="nav-mobile-menu-item">
                <Link
                  className={
                    `nav-mobile-menu-link 
                    ${navbar.currentNav === 'home'}`
                  }
                  to='/'
                  onClick={() => updateNavState('home')}
                >
                  <div>Home</div>
                </Link>
              </div>
              <div className="nav-mobile-menu-item">
                <Link
                  className={
                    `nav-mobile-menu-link 
                    ${navbar.currentNav === 'cryptos'}`
                  }
                  to='/crypto'
                  onClick={() => updateNavState('cryptos')}
                >
                  <div>Cryptos</div>
                </Link>
              </div>
              <div className="nav-mobile-menu-item">
                <Link
                  className={
                    `nav-mobile-menu-link 
                    ${navbar.currentNav === 'news'}`
                  }
                  to='/news'
                  onClick={() => updateNavState('news')}
                >
                  <div>News</div>
                </Link>
              </div>
          </div>  
        )}
      </div>
      <div className="nav-desktop-main">

      </div>
    </>

    // <div className={`nav-main ${toggleMenu}`}>
    //   <div className="nav-desktop">

    //   </div>
    //   <div className={`nav-mobile ${toggleMenu}`}>
    //     {toggleMenu
    //       ? <RiCloseLine color='#393E46' size={27} onClick={() => {setToggleMenu(false); disableScroll()}} />
    //       : <RiMenu3Line color='#FFD369' size={27} onClick={() => {setToggleMenu(true); enableScroll()}} /> 
    //     }
    //     {toggleMenu && (
    //       <div className="nav-mobile-links">
    //         <Link 
    //           className={`nav-mobile-links-item ${navbar.currentNav === 'home'}`} 
    //           to='/' 
    //           onClick={() => updateNavState('home')}
    //           >
    //           <div>Home</div>
    //           {/* Home */}
    //         </Link>
    //         <Link 
    //           className={`nav-mobile-links-item ${navbar.currentNav === 'cryptos'}`} 
    //           to='/crypto'
    //           onClick={() => updateNavState('cryptos')}
    //           >
    //           <div>Cryptocurrencies</div>
    //         </Link>
    //         <Link 
    //           className={`nav-mobile-links-item ${navbar.currentNav === 'news'}`} 
    //           to='/news'
    //           onClick={() => updateNavState('news')}
    //           >
    //           <div>News</div>
    //         </Link>
    //       </div>
    //     )}
    //   </div>
    // </div>
  )
}

export default Nav