import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../../animations/Spinner/Spinner';
import useFetch from '../../../api/useFetch';
import './style.css';
import millify from 'millify';

const CoinDetails = ({ coinProps }) => {
    const { coinId } = useParams();
    const parse = require('html-react-parser');

    const api = {
        coinUrl: `https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`,

        coinHost: 'coinranking1.p.rapidapi.com'
    }

    const {data, isPending, error} = useFetch(api.coinUrl, api.coinHost)

    let coin;

    if (!isPending) {
        coin = data?.data?.coin;

        console.log(coin)
    }

    const toCoinPrice = (coinPrice) => {
        if (Number(coinPrice) < 1) {
            return Number(coinPrice).toFixed(8)
        }
        return Number(coinPrice).toFixed(2);
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };

    if (!error === null) {
        return (
            <div className="details-error">
                <h4>Error</h4>
                <p>The information for this coin could not be found...</p>
            </div>
        )
    }
    else if (isPending) {
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
                    <h3>{coin.name} Info</h3>
                </div>
                <div className="details-header-split">
                    <div className="details-header-left">
                        <img src={coin.iconUrl} />
                        <p>Rank {coin.rank}</p>
                    </div>
                    <div className="details-header-right">
                        <p>{coin.change}%</p>
                        <h4>Price Change</h4>
                    </div>
                </div>
                <div className="details-statistics">
                    <h3>{coin.symbol} value statistics</h3>
                    <div className="details-tousd">
                        <p>{coin.symbol} to USD</p>
                        ${Number(coin.price).toFixed(2)}
                    </div>
                    <div className="details-tocoin">
                        <p>USD to {coin.symbol}</p>
                        {toCoinPrice(coin.btcPrice)} {coin.symbol}
                    </div>
                    <div className="details-24hvolume">
                        <p>24 Hour Volume</p>
                        ${millify(coin['24hVolume'])}
                    </div>
                    <div className="details-marketcap">
                        <p>Market Cap</p>
                        ${millify(coin.marketCap)}
                    </div>
                    <div className="details-alltimehigh">
                        <p>All Time High</p>
                        ${millify(coin.allTimeHigh.price)}
                    </div>
                </div>
                <div className="details-supplyinfo">
                    <h3>Supply Information</h3>
                    <div className="details-supply">
                        <p>Total supply</p>
                        {coin.supply.total === null
                            ? <>0</>
                            : <>{millify(coin.supply.total)}</>
                        }

                    </div>
                    <div className="details-circulating">
                        <p>Circulating supply</p>
                        {millify(coin.supply.circulating)}
                    </div>
                </div>
                <div className="details-description">
                    <h3 className='details-description-header'>
                        What is {coin.name}?
                    </h3>
                    <div className="details-descriptiontext">
                        {parse(coin?.description)}
                    </div>
                </div>
                <div className="details-links">
                    <h3>{coin.name} Links</h3>
                    {
                        coin.links.map((link, index) => (
                            <div key={index} >
                                <p>{link.type}</p>
                                <a href={link.url}>{link.name}</a>
                            </ div>
                        ))
                    }
                    <div className="details-totop">
                        <span onClick={scrollToTop}>Back to top</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoinDetails