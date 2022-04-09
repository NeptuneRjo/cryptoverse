import React from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import store from '../../../store';

const NewsItem = ({ news, id }) => {

    const image = news.imageUrl;

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
 
    const pageUrl = news.title.toLowerCase().replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

    const setNewsIndex = () => {
        store.dispatch({
            type: 'SET_NEWS_INDEX', payload: id
        })
        sessionStorage.setItem('sessionNewsId', id);
    }

    return (
        <Link to={`/news/${pageUrl}`} data-testid='link-to-article'>
            <div className="newsitem-main" onClick={() => setNewsIndex()}>
                <div className="newsitem-hero" >
                   <img src={checkImageUrl(image)} alt="article image"  data-testid='news-img'/>
                </div>
                <div className="newsitem-info">
                    <div className="newsitem-header" data-testid='news-title'>
                        {news.title}
                    </div>
                    <div className="newsitem-date" data-testid='news-date'>
                        {news.datestamp}
                    </div>
                    <div className="newsitem-info-more">
                        <div className="newsitem-click">click to view more...</div>
                        <div className="newsitem-tap">tap to view more...</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NewsItem