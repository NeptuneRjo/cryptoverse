import React from 'react';
import './style.css';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
    const { newsId } = useParams();

  return (
    <div>NewsPage</div>
  )
}

export default NewsPage