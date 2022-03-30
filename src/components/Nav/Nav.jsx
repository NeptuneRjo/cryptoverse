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
    document.body.style.overflow = "hidden"
  }
  
  function enableScroll(){
    document.body.style.overflow = "visible"
  }

  return (
    <>
      <div className='nav-mobile-main'>
        <div className="nav-mobile-toggle">
          {toggleMenu
            ? <RiCloseLine color='#393e46' size={27} onClick={() => {setToggleMenu(false); enableScroll()}} />
            : <RiMenu3Line color='#ffd369' size={27} onClick={() => {setToggleMenu(true); disableScroll()}} />
          }
        </div>
          <div className={`nav-mobile-menu ${toggleMenu}`}>
              <div className="nav-mobile-menu-item">
                <Link
                  className={
                    `nav-mobile-menu-link 
                    ${navbar.currentNav === 'home'}`
                  }
                  to='/'
                  onClick={() => updateNavState('home')}
                >
                  <div onClick={() => {setToggleMenu(false); enableScroll()}}>Home</div>
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
                  <div onClick={() => {setToggleMenu(false); enableScroll()}}>Cryptos</div>
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
                  <div onClick={() => {setToggleMenu(false); enableScroll()}}>News</div>
                </Link>
              </div>
          </div>  
      </div>
      <div className="nav-desktop-main">

      </div>
    </>
  )
}

export default Nav