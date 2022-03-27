import React from 'react'
import { useFetchCoins } from '../../api'
import './style.css';

const Home = () => {

  const { data, isPending, error } = useFetchCoins()

  let mainStats;
  let coins;
  
  if (!isPending) {
    mainStats = data.data.stats;
    coins = data.data.coins.slice(0, 10);
  }

  return (
    <div className="home-main">
      {isPending &&
      <div className="home-stats-pending">
      Loading...
      </div>
      }
      {!isPending &&
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
                coins.map(item => {
                  
                })
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home