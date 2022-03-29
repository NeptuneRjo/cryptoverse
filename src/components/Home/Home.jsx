import React from 'react'
import './style.css';
import Crypto from '../Cryptos/Crypto/Crypto';
import store from '../../store';
import NewsItem from '../News/NewsItem/NewsItem';
import { useEffect } from 'react';

const Home = ({ coinProps, newsProps }) => {
  
  const coinData = coinProps.data;
  const coinPending = coinProps.isPending;

  const newsData = newsProps.data
  const newsPending = newsProps.isPending;

  let mainStats;
  let coins;
  let news;
  
  if (!coinPending) {
    mainStats = coinData.data.stats;
    coins = coinData.data.coins.slice(0, 10);
  }

  if (!newsPending) {
    news = newsData.news[0];
  }

  useEffect(() => {
    store.dispatch(
      { type: 'SET_NAVBAR', payload: 'home' }
    )  
  }, [])

  return (
    <div className="home-main">
      {(coinPending || newsPending) &&
      <div className="home-stats-pending">
      Loading...
      </div>
      }
      {(!coinPending && !newsPending) &&
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
          <div className="home-news">
            <h3>Latest News</h3>
            <div className="home-news-grid">
              <NewsItem news={news} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home