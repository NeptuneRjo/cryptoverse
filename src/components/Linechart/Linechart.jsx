import React from 'react'

import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

import './style.css'

const Linechart = ({ coinHistory, coinName, currentPrice }) => {
	const coinPrice = []
	const coinTimestamp = []

	for (let i = 0; i < coinHistory?.history?.length; i++) {
		coinPrice.push(coinHistory?.history[i].price)
	}

	for (let i = 0; i < coinHistory?.history?.length; i++) {
		coinTimestamp.push(
			new Date(coinHistory?.history[i].timestamp * 1000).toLocaleDateString()
		)
	}

	return (
		<div className='linechart-main'>
			<Line
				datasetIdKey='id'
				data={{
					labels: coinTimestamp.reverse(),
					datasets: [
						{
							label: 'Price in USD',
							data: coinPrice.reverse(),
							fill: false,
							backgroundColor: '#eeeeee',
							borderColor: '#0d47a1',
						},
					],
				}}
			/>
		</div>
	)
}

export default Linechart
