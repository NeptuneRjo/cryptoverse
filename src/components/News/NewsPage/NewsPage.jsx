import React, { useEffect, useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import Spinner from '../../../animations/Spinner/Spinner';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const parse = require('html-react-parser');

  const newsApi = useSelector((state) => state.newsApi)
  const newsIndex = useSelector((state) => state.newsIndex)

  const sessionId = sessionStorage.getItem('sessionNewsId')

  let article;
  console.log(article)

  if (!newsApi.isPending && sessionId !== undefined) {
    article = newsApi.data.news[sessionStorage.getItem('sessionNewsId')]
  }
  else if (!newsApi.isPending && newsIndex.index !== null) {
    article = newsApi.data.news[newsIndex.index];
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [])

  if (newsIndex.index === null && sessionId === undefined) {
    return (
      <div className="newspage-invalid">
        <p>This instance is no longer valid.</p>
        <p>Please click <Link to="/news">here</Link> to go back</p>
      </div>
    )
  }
  else if (newsApi.isPending) {
    return (
      <div className="newspage-loading">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="newspage-main" >
      <div className="newspage-header">
        <h3>{article.title}</h3>
      </div>
      <div className="newspage-disclaimer">
        <h3>Disclaimer:</h3> <p>Some articles are not fully available on this website. If you wish to continue reading, please visit the link below, or click <a href={article.articleUrl}>here</a></p>
      </div>
      <div className="newspage-date">
        {article.datestamp}
      </div>
      <div className="newspage-content">
        {parse(article.rawDescription)}
      </div>
      <div className="newspage-author">
        <a href={article.articleUrl}>View the Original Article</a>
      </div>
    </div>
  )
}

export default NewsPage