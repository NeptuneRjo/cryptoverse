import React from 'react'
import './style.css';
import Crypto from '../Cryptos/Crypto/Crypto';
import store from '../../store';
import NewsItem from '../News/NewsItem/NewsItem';
import { useEffect } from 'react';
import Spinner from '../../animations/Spinner/Spinner';
import millify from 'millify';
import { useSelector } from 'react-redux';

const Home = () => {
  
  const coinApi = useSelector((state) => state.coinApi);
  const newsApi = useSelector((state) => state.newsApi);

  const coinData = coinApi.data;
  const coinPending = coinApi.isPending;

  const newsData = newsApi.data
  const newsPending = newsApi.isPending;

  let mainStats;
  let coins;
  let news;
  
  if (!coinPending && !newsPending) {
    mainStats = coinData.data.stats;
    coins = coinData.data.coins.slice(0, 10);

    news = newsData.news[0];
  }

  useEffect(() => {
    store.dispatch(
      { type: 'SET_NAVBAR', payload: 'home' }
    )  
  }, [])


  if (coinPending || newsPending) {
    return (
      <div className="home-stats-pending">
        <Spinner speed={5} customText={'Loading...'} />
      </div>
    )
  }
  return (
    <div className="home-main">
        <div className="home-main-loaded">
          <div className="home-header">
            <h3>Home</h3>
          </div>
          <div className="home-stats">
            <div className="home-stats-item" id="total-cryptos">
              {mainStats.total}
              <p>Total Cryptocurrencies</p>
            </div>
            <div className="home-stats-item" id="24hr-volume">
              ${millify(mainStats.total24hVolume)}
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
    </div>
  )
}

export default Home