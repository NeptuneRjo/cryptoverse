import React, { useEffect, useState } from 'react'
import store from '../../store'
import NewsItem from './NewsItem/NewsItem'
import Spinner from '../../animations/Spinner/Spinner';

const News = ({ newsProps }) => {

  const newsPending = newsProps.isPending;

  const [q, setQ] = useState('')
  const [searchParam] = useState(['categories'])

  let articles;

  if (!newsPending) {
    articles = newsProps.data.news
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
      { type: 'SET_NAVBAR', payload: 'news' }
    )
  }, [])
  

  if (newsPending) {
    return (
      <div className="news-pending">
        <Spinner speed={5} customText={'Loading...'} />
      </div>
    )
  }
  return (
    <div className="news-main">
      <div className="news-header">
        <h3>Today's Crypto News</h3>
      </div>
      <div className="news-search">
        <label htmlFor="search-form">
          <input 
            type="search" 
            name="search-form" 
            id="news-search-form" 
            placeholder='Search by a tag'
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>
      <div className="news-grid">
        {
          search(articles).map((news, index) => (
            <NewsItem
              news={news}
              key={index}
            />
          ))
        }
      </div>
      <div className="news-totop">
        <span onClick={scrollToTop}>Back to top</span>
      </div>
    </div>
  )
}

export default News