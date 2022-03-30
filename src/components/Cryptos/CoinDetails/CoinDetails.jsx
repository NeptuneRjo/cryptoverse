import React from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

const CoinDetails = () => {
    const { coinId } = useParams();

  return (
    <div>CoinDetails {coinId} </div>
  )
}

export default CoinDetails