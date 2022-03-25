import React from 'react'
import { fetchCoins } from '../../api'

const Home = () => {

  // const coinData = fetchCoins()

  console.log(fetchCoins())

  return (
    <div className="home-main">
      <div className="home-stats">
        <div className="home-stats-item" id="total-cryptos"></div>
        <div className="home-stats-item" id="24hr-volume"></div>
        <div className="home-stats-item" id="total-exchanges"></div>
      </div>
    </div>
  )
}

export default Home