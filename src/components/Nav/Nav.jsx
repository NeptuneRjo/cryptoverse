import React, { useState } from 'react';
import {
   RiMenu3Line, 
   RiCloseLine 
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

import './style.css';

const Nav = () => {

const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="nav-main">
      <div className="nav-desktop">

      </div>
      <div className="nav-mobile">
        {toggleMenu
          ? <RiCloseLine color='#b9b9b9' size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='#00aaa9' size={27} onClick={() =>setToggleMenu(true)} /> 
        }
        {toggleMenu && (
          <div className="nav-mobile-links">
            <Link className='nav-mobile-links-item' to='/' >
              Home
            </Link>
            <Link className='nav-mobile-links-item' to='/crypto'>
              Cryptocurrencies
            </Link>
            <Link className='nav-mobile-links-item' to='/news'>
              News
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Nav