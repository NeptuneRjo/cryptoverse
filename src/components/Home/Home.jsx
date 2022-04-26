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
  let news2;
  
  if (!coinPending && !newsPending) {
    mainStats = coinData.data.stats;
    coins = coinData.data.coins.slice(0, 10);

    if (newsData !== null) {
      news = newsData.news[0];
      news2 = newsData.news[1];
    }
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
            <h3 data-testid='home-header'>Home</h3>
          </div>
          <div className="home-stats">
            <div className="home-stats-item" id="total-cryptos" data-testid='total-cryptos'>
              {mainStats.total}
              <p>Total Cryptocurrencies</p>
            </div>
            <div className="home-stats-item" id="24hr-volume" data-testid='24h-volume'>
              ${millify(mainStats.total24hVolume)}
              <p>Total 24hr Volume</p>
            </div>
            <div className="home-stats-item" id="total-exchanges" data-testid='total-exchanges'>
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
            {
              newsData == null &&  
                <div className="home-news-unavailable">
                  <h4>Sorry, there is currrently no news available at the moment.</h4>
                  <h4>Please try again later</h4>
                </div>
            }
            {
              newsData !== null &&
              <>
                <div className="home-news-grid">
                  <div className="home-news-grid-item" id='home-news-item-1'>
                    <NewsItem news={news} id={0} />
                  </div>
                  <div className="home-news-grid-item" id='home-news-item-2'>
                    <NewsItem news={news2} id={1} />
                  </div>
                </div>
              </>
            }
          </div>
        </div>
    </div>
  )
}

export default Home