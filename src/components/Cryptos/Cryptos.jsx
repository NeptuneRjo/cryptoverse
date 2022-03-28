import React from 'react';
import './style.css';
import { default as Crypto } from './Crypto/Crypto';
import { useState } from 'react';
import store from '../../store';

const Cryptos = ({ coinProps }) => {

  store.dispatch(
    { type: 'SET_NAVBAR', payload: 'cryptos' }
  )

  const coinPending = coinProps.isPending;

  const [q, setQ] = useState('');
  const [searchParam] = useState(['name'])

  let coins;
  let coinData;

  if(!coinPending) {
    coinData = coinProps.data.data
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

  if (coinPending) {
    return (
      <div className="cryptos-pending">Loading...</div>
    )
  }
  return (
    <div className="cryptos-main">
      <div className="cryptos-header">
        <h3>Top 50 Cryptocurrencies</h3>
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