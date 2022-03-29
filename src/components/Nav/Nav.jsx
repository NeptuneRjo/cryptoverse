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

  return (
    <div className="nav-main">
      <div className="nav-desktop">

      </div>
      <div className="nav-mobile">
        {toggleMenu
          ? <RiCloseLine color='#393E46' size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='#FFD369' size={27} onClick={() =>setToggleMenu(true)} /> 
        }
        {toggleMenu && (
          <div className="nav-mobile-links">
            <Link 
              className={`nav-mobile-links-item ${navbar.currentNav === 'home'}`} 
              to='/' 
              onClick={() => updateNavState('home')}
              >
              Home
            </Link>
            <Link 
              className={`nav-mobile-links-item ${navbar.currentNav === 'cryptos'}`} 
              to='/crypto'
              onClick={() => updateNavState('cryptos')}
              >
              Cryptocurrencies
            </Link>
            <Link 
              className={`nav-mobile-links-item ${navbar.currentNav === 'news'}`} 
              to='/news'
              onClick={() => updateNavState('news')}
              >
              News
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Nav