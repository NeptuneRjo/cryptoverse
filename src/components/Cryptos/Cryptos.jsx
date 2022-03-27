import React from 'react';
import './style.css';

const Cryptos = ({ coinData, index }) => {

  return (
    <div className="cryptos-main" index={index} >
      <div className="cryptos-info">
        <div className="cryptos-info-number">
          {coinData.rank}.
        </div>
        <div className="cryptos-info-name">
          {coinData.name}
        </div>
        <div className="cryptos-info-price">
          ${Number(coinData.price).toFixed(2)}
        </div>
      </div>
      <div className="cryptos-icon">
        <img 
          src={coinData.iconUrl} 
          alt="Cryptocurrency icon" 
          className="cryptos-icon-img"
        />
      </div>
    </div>
  )
}

export default Cryptos