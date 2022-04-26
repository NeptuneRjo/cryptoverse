import React, { useEffect, useState } from 'react'
import store from '../../store'
import NewsItem from './NewsItem/NewsItem'
import Spinner from '../../animations/Spinner/Spinner';
import { useSelector } from 'react-redux';
import './style.css'

const News = () => {

  const newsApi = useSelector((state) => state.newsApi)

  const newsPending = newsApi.isPending;

  const [q, setQ] = useState('')
  const [searchParam] = useState(['categories'])

  let articles;

  if (!newsPending && newsApi.data !== null) {
    articles = newsApi.data.news
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
        <h3 data-testid='news-header'>Today's Crypto News</h3>
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
      {
        newsApi.data == null &&
          <div className="news-unavailable">
            <h4>Sorry, there is currrently no news available at the moment.</h4>
            <h4>Please try again later</h4>
          </div>
      }
      {
        newsApi.data !== null && 
          <>
            <div className="news-grid">
              {
                search(articles).map((news, index) => (
                  <NewsItem
                    news={news}
                    key={index}
                    id={index}
                  />
                ))
              }
            </div>
            <div className="news-totop">
              <span onClick={scrollToTop}>Back to top</span>
            </div>
          </>
      }

    </div>
  )
}

export default News