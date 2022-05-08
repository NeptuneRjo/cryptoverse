import React from 'react'
import './style.css'
import Crypto from '../Cryptos/Crypto/Crypto'
import store from '../../store'
import NewsItem from '../News/NewsItem/NewsItem'
import { useEffect } from 'react'
import Spinner from '../../animations/Spinner/Spinner'
import millify from 'millify'
import { useSelector } from 'react-redux'

const Home = () => {
	const coinApi = useSelector((state) => state.coinApi)
	const newsApi = useSelector((state) => state.newsApi)

	const coinData = coinApi.data
	const coinPending = coinApi.isPending

	const newsData = newsApi.data
	const newsPending = newsApi.isPending

	let mainStats
	let coins

	let news
	let news2

	if (!coinPending && !newsPending) {
		mainStats = coinData.data.stats
		coins = coinData.data.coins.slice(0, 10)

		if (newsData !== null) {
			news = newsData.news[0]
			news2 = newsData.news[1]
		}
	}

	useEffect(() => {
		store.dispatch({ type: 'SET_NAVBAR', payload: 'home' })
	}, [])

	if (coinPending || newsPending) {
		return (
			<div className='home-stats-pending'>
				<Spinner speed={5} customText={'Loading...'} />
			</div>
		)
	}
	return (
		<div className='home-main'>
			<h3 className='home-header'>Home</h3>
			<div className='home-section'>
				<div className='home-item' id='total-cryptos'>
					<p>Total Cryptocurrencies</p>
					<div>{mainStats.total}</div>
				</div>
				<div className='home-item' id='24hr-volume'>
					<p>Total 24hr Volume</p>
					<div>${millify(mainStats.total24hVolume)}</div>
				</div>
				<div className='home-item' id='total-exchanges'>
					<p>Total Exchanges</p>
					<div>{mainStats.totalExchanges}</div>
				</div>
			</div>
			<div className='home-cryptos'>
				<h3>Top 10 Cryptocurrencies</h3>
				<div className='home-cryptos-grid'>
					{coins.map((coin, index) => (
						<Crypto coinData={coin} key={index} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Home
