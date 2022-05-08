import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../../../animations/Spinner/Spinner'
import useFetch from '../../../api/useFetch'
import './style.css'
import millify from 'millify'
import { useSelector } from 'react-redux'
import Linechart from '../../Linechart/Linechart'

const CoinDetails = () => {
	const { coinId } = useParams()
	const parse = require('html-react-parser')

	const api = {
		coinUrl: `https://coinranking1.p.rapidapi.com/coin/${coinId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`,
		coinHost: 'coinranking1.p.rapidapi.com',

		coinHistory: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=7d`,
	}

	useFetch(api.coinUrl, api.coinHost, 'COINDETAILS')
	useFetch(api.coinHistory, api.coinHost, 'COINHISTORY')

	const coinApi = useSelector((state) => state.coinDetailsApi)
	const coinHistoryApi = useSelector((state) => state.coinHistoryApi)

	let coin = coinApi?.data?.data?.coin
	let coinHistory = coinHistoryApi?.data?.data

	const toCoinPrice = (coinPrice) => {
		if (Number(coinPrice) < 1) {
			return Number(coinPrice).toFixed(12)
		}
		return Number(coinPrice).toFixed(2)
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		scrollToTop()
	}, [])

	if (!coinApi.error === null) {
		return (
			<div className='details-error'>
				<h4>Error</h4>
				<p>The information for this coin could not be found...</p>
			</div>
		)
	} else if (coinApi.isPending) {
		return (
			<div className='details-loading'>
				<Spinner speed={5} customText={'Loading...'} />
			</div>
		)
	}
	return (
		<div className='details-main'>
			<h3 className='details-header'>{coin.name} Info</h3>
			<div className='details-graph'>
				<h3 className='details-section-header'>30 Day Price History</h3>
				<Linechart
					coinHistory={coinHistory}
					coinName={coin.name}
					coinPrice={Number(coin.price).toFixed(2)}
				/>
			</div>
			<div className='details-section'>
				<h3 className='details-section-header'>{coin.symbol} Statistics</h3>
				<div className='details-item'>
					<p>Price Change</p>
					<div>{coin.change}%</div>
				</div>
				<div className='details-item'>
					<p>{coin.symbol} to USD</p>
					<div>${Number(coin.price).toFixed(2)}</div>
				</div>
				<div className='details-item'>
					<p>USD to {coin.symbol}</p>
					<div>
						{toCoinPrice(coin.btcPrice)} {coin.symbol}
					</div>
				</div>
				<div className='details-item'>
					<p>24 Hour Volume</p>
					<div>${millify(coin['24hVolume'])}</div>
				</div>
				<div className='details-item'>
					<p>Market Cap</p>
					<div>${millify(coin.marketCap)}</div>
				</div>
				<div className='details-item'>
					<p>All Time High</p>
					<div>${millify(coin.allTimeHigh.price)}</div>
				</div>
			</div>
			<div className='details-section'>
				<h3 className='details-section-header'>Supply Information</h3>
				<div className='details-item'>
					<p>Total supply</p>
					<div>
						{coin.supply.total === null ? (
							<>0</>
						) : (
							<>{millify(coin.supply.total)}</>
						)}
					</div>
				</div>
				<div className='details-item'>
					<p>Circulating supply</p>
					<div>{millify(coin.supply.circulating)}</div>
				</div>
			</div>
			<div className='details-section'>
				<h3 className='details-section-header' data-testid='coin-desc-header'>
					What is {coin.name}?
				</h3>
				<div className='details-description'>{parse(coin?.description)}</div>
			</div>
			<div className='details-section'>
				<h3 className='details-section-header'>{coin.name} Links</h3>
				{coin.links.map((link, index) => (
					<div key={index} className='details-item'>
						<p>{link.type}</p>
						<a href={link.url}>{link.name}</a>
					</div>
				))}
				<div className='details-totop'>
					<span onClick={scrollToTop}>Back to top</span>
				</div>
			</div>
		</div>
	)
}

export default CoinDetails
