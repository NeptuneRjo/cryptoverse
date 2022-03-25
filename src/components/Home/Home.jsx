import React from 'react'
import { useFetchCoins } from '../../api'

const Home = () => {

  const { data, isPending, error } = useFetchCoins()
  let mainStats;
  
  if (!isPending) {
    mainStats = data.data.stats;
  }

  return (
    <div className="home-main">
      {isPending &&
      <div className="home-stats-pending">
      Loading...
      </div>
      }
      {!isPending &&
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
      }
    </div>
  )
}

export default Home