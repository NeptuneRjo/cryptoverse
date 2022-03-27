import React from 'react';
import { Link } from 'react-router-dom'

const Crypto = ({ coinData, index }) => {

  return (
    <a href={coinData.coinrankingUrl} >
      <div className="crypto-main" index={index} >
        <div className="crypto-info">
          <div className="crypto-info-number">
            {coinData.rank}.
          </div>
          <div className="crypto-info-name">
            {coinData.name}
          </div>
          <div className="crypto-info-price">
            ${Number(coinData.price).toFixed(2)}
          </div>
        </div>
        <div className="crypto-icon">
          <img 
            src={coinData.iconUrl} 
            alt="Cryptocurrency icon" 
            className="crypto-icon-img"
          />
        </div>
      </div>
    </ a>
  )
}

export default Crypto