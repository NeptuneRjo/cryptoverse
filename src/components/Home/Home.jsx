import React from 'react'
import './style.css';
import Crypto from '../Cryptos/Crypto/Crypto';
import store from '../../store';

const Home = ({ coinProps, newsProps }) => {

  store.dispatch(
    { type: 'SET_NAVBAR', payload: 'home' }
  )

  const coinData = coinProps.data;
  const coinPending = coinProps.isPending;

  let mainStats;
  let coins;
  
  if (!coinPending) {
    mainStats = coinData.data.stats;
    coins = coinData.data.coins.slice(0, 10);
  }

  return (
    <div className="home-main">
      {coinPending &&
      <div className="home-stats-pending">
      Loading...
      </div>
      }
      {!coinPending &&
        <div className="home-main-loaded">
          <div className="home-stats">
            <div className="home-stats-item" id="total-cryptos">
              {mainStats.total}
              <p>Total Cryptocurrencies</p>
            </div>
            <div className="home-stats-item" id="24hr-volume">
              {mainStats.total24hVolume}
              <p>Total 24hr Volume</p>
            </div>
            <div className="home-stats-item" id="total-exchanges">
              {mainStats.totalExchanges}
              <p>Total Exchanges</p>
            </div>
          </div>
          <div className="home-cryptos">
            <h3>Top 10 Cryptocurrencies</h3>
            <div className="home-cryptos-grid">
              {
                coins.map((coin, index) => (
                  <Crypto
                    coinData={coin}
                    key={index}
                  />
                ))
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home