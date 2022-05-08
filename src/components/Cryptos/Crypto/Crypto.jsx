import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Crypto = ({ coinData }) => {
	return (
		<Link to={`/crypto/${coinData.uuid}`} className='crypto-action'>
			<div className='crypto-main'>
				<div className='crypto-info'>
					<div className='crypto-info-number'>{coinData.rank}.</div>
					<div className='crypto-info-name'>{coinData.name}</div>
					<div className='crypto-info-price'>
						${Number(coinData.price).toFixed(2)}
					</div>
					<p className='crypto-click'>view more...</p>
				</div>
				<div className='crypto-icon'>
					<img
						src={coinData.iconUrl}
						alt='Cryptocurrency icon'
						className='crypto-icon-img'
					/>
				</div>
			</div>
		</Link>
	)
}

export default Crypto
