import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Crypto = ({ coinData }) => {

  return (
    <Link to={`/crypto/${coinData.uuid}`}               data-testid='crypto-item'
    >
      <div className="crypto-main" >
        <div className="crypto-info">
          <div className="crypto-info-number" data-testid='crypto-num'>
            {coinData.rank}.
          </div>
          <div className="crypto-info-name" data-testid='crypto-name'>
            {coinData.name}
          </div>
          <div className="crypto-info-price" data-testid='crypto-price'>
            ${Number(coinData.price).toFixed(2)}
          </div>
          <p className='crypto-tap'>tap to see more</p>
          <p className='crypto-click'>click to see more</p>
        </div>
        <div className="crypto-icon" >
          <img 
            data-testid='crypto-icon'
            src={coinData.iconUrl} 
            alt="Cryptocurrency icon" 
            className="crypto-icon-img"
          />
        </div>
      </div>
    </ Link>
  )
}

export default Crypto