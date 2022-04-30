import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../../animations/Spinner/Spinner';
import useFetch from '../../../api/useFetch';
import './style.css';
import millify from 'millify';
import { useSelector } from 'react-redux';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


const CoinDetails = () => {
    const { coinId } = useParams();
    const parse = require('html-react-parser');

    const api = {
        coinUrl: `https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`,
        coinHost: 'coinranking1.p.rapidapi.com'
    }

    useFetch(api.coinUrl, api.coinHost, 'COINDETAILS')
    const coinApi = useSelector((state) => state.coinDetailsApi)

    let coin;

    if (!coinApi.isPending) {
        coin = coinApi.data.data.coin;
    }

    const toCoinPrice = (coinPrice) => {
        if (Number(coinPrice) < 1) {
            return Number(coinPrice).toFixed(12)
        }
        return Number(coinPrice).toFixed(2);
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };

    useEffect(() => {
        scrollToTop()
    }, [])

    if (!coinApi.error === null) {
        return (
            <div className="details-error">
                <h4>Error</h4>
                <p>The information for this coin could not be found...</p>
            </div>
        )
    }
    else if (coinApi.isPending) {
        return (
            <div className="details-loading">
                <Spinner speed={5} customText={'Loading...'} />
            </div>
        )
    }
    return (
        <>
            <div className="details-main">
                <div className="details-header" data-testid='coin-header'>
                    <h3 data-testid='coin-name'>{coin.name} Info</h3>
                </div>
                {/* <div className="details-header-split">
                    <div className="details-header-left">
                        <img 
                            src={coin.iconUrl} 
                            data-testid='coin-icon' 
                            alt='cryptocurrency icon'
                        />
                        <p data-testid='coin-rank'>Rank {coin.rank}</p>
                    </div>
                    <div className="details-header-right">
                        <p data-testid='coin-change'>{coin.change}%</p>
                        <h4>Price Change</h4>
                    </div>
                </div> */}
                <Card sx={{ minWidth: '100%' }}>
                    <CardContent>
                        <CardMedia 
                            component='img'
                            image={coin.iconUrl}
                            alt='coin icon'
                            sx={{
                                height: '35px',
                                width: '35px',
                                background: 'transparent'
                            }}
                        /> 
                        <Typography variant='h6' component='div'>
                            Rank {coin.rank}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography varient='h6' component='div'>
                            {coin.change}%
                        </Typography>
                        <Typography varient='h6' component='div'>
                            Price Change
                        </Typography>
                    </CardContent>
                </Card>
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
                    <div className="details-24hvolume" >
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
                    <h3 className='details-description-header' data-testid='coin-desc-header'>
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