import React, { useState, useEffect } from 'react';
import './style.css';
import { default as Crypto } from './Crypto/Crypto';
import store from '../../store';
import Spinner from '../../animations/Spinner/Spinner';
import { useSelector } from 'react-redux';

const Cryptos = () => {

  const coinApi = useSelector((state) => state.coinApi);

  const coinPending = coinApi.isPending;

  const [q, setQ] = useState('');
  const [searchParam] = useState(['name'])

  let coins;
  let coinData;

  if(!coinPending) {
    coinData = coinApi.data.data
    coins = coinData.coins
  }

  const search = (items) => {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLocaleLowerCase()) > -1
        )
      });
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    store.dispatch(
      { type: 'SET_NAVBAR', payload: 'cryptos' }
    )
  }, [])

  if (coinPending) {
    return (
      <div className="cryptos-pending">
        <Spinner speed={5} customText={'Loading...'} />
      </div>
    )
  }
  return (
    <div className="cryptos-main">
      <div className="cryptos-header">
        <h3 data-testid='cryptos-header'>Top 50 Cryptocurrencies</h3>
      </div>
      <div className="cryptos-search">
        <label htmlFor="search-form">
          <input 
            type="search" 
            name="search-form" 
            id="search-form"
            placeholder='Search for a coin' 
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>
      <div className="cryptos-grid">
        {
          search(coins).map((coin, index) => (
            <Crypto
              coinData={coin}
              key={index}
            />
          ))
        }
      </div>
      <div className="cryptos-totop">
        <span onClick={scrollToTop}>Back to top</span>
      </div>
    </div>
  )
}

export default Cryptos