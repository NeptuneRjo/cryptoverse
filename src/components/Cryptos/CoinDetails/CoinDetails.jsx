import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../../animations/Spinner/Spinner';
import useFetch from '../../../api/useFetch';
import LineChart from '../../Chart/LineChart';
import './style.css';
import millify from 'millify';

const CoinDetails = () => {
    const { coinId } = useParams();

    const api = {
        coinUrl: `https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`,
        priceUrl: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=7d',

        coinHost: 'coinranking1.p.rapidapi.com'
    }

    const {data: coinData, isPending: coinPending, error: coinError} = useFetch(api.coinUrl, api.coinHost)
    const {data: priceData, isPending: pricePending, error: priceError} = useFetch(api.priceUrl, api.coinHost)

    let coin;
    let price;

    if (!coinPending && !pricePending) {
        coin = coinData.data.coin;
        price = priceData.data

        console.log(coin)
        console.log(price)
    }


    if (coinPending || pricePending) {
        return (
            <div className="details-loading">
                <Spinner speed={5} customText={'Loading...'} />
            </div>
        )
    }
    return (
        <>
            <div className="details-main">
                <div className="details-header">
                    <h3>{coin.name}</h3>
                </div>
                <div className="details-chart">
                    
                    <LineChart priceHistory={price} />
                </div>
            </div>
        </>
    )
}

export default CoinDetails