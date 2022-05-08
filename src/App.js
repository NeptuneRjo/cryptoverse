import './App.css'
import { Cryptos, Home, Nav } from './components'
import { HashRouter, Routes, Route } from 'react-router-dom'
import fetchApi from './api/fetchApi'
import CoinDetails from './components/Cryptos/CoinDetails/CoinDetails'
import { useEffect } from 'react'

function App() {
	const api = {
		coinUrl:
			'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',
		coinHost: process.env.REACT_APP_COIN_HOST,
	}

	useEffect(() => {
		fetchApi(api.coinUrl, api.coinHost, 'COIN')
	}, [])

	return (
		<HashRouter>
			<div className='app-main'>
				<Nav />
				<div className='app-content'>
					<Routes>
						<Route exact path='/' element={<Home />} />
						<Route path='/crypto' element={<Cryptos />} />
						<Route path='/crypto/:coinId' element={<CoinDetails />} />
					</Routes>
				</div>
			</div>
		</HashRouter>
	)
}

export default App
