import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import Spinner from '../../../animations/Spinner/Spinner';

const NewsPage = () => {
  const parse = require('html-react-parser');

  const newsApi = useSelector((state) => state.newsApi)
  const newsIndex = useSelector((state) => state.newsIndex)

  let article;

  if (!newsApi.isPending) {
    console.log(newsApi.data.news[newsIndex.index])

    article = newsApi.data.news[newsIndex.index];
  }

  const checkImageUrl = (url) => {
    const urlString = url.toLowerCase();
    const https = 'https://'

    if (!urlString.includes('http')) {
        return  (
            https.concat(url)
        )
    }
    return url
  }

  if (newsApi.isPending) {
    return (
      <div className="newspage-loading">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="newspage-main">
      <div className="newspage-header">
        <h3>{article.title}</h3>
      </div>
      <div className="newspage-hero">
        <img src={checkImageUrl(article.imageUrl)} />
      </div>
      <div className="newspage-author">
        <a href={article.articleUrl}>Author</a>
      </div>
    </div>
  )
}

export default NewsPage