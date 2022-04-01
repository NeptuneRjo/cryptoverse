import React from 'react'
import '../style.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NewsItem = ({ news }) => {

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

    console.log(news);

    return (
        <Link to={`/news/${pageUrl}`}>
            <div className="newsitem-main">
                <div className="newsitem-hero">
                   <img src={checkImageUrl(image)} alt="article image" />
                </div>
                <div className="newsitem-info">
                    <div className="newsitem-header">
                        {news.title}
                    </div>
                    <div className="newsitem-date">
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