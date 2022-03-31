import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ priceHistory }) => {

    const coinPrice = [];
    const coinTimeStamp = [];

    for (let i = 0; i < priceHistory?.history?.length; i+= 1) {
        coinPrice.push(priceHistory?.history[i].price)
        coinTimeStamp.push(new Date(priceHistory?.history[i].timestamp).toLocaleDateString())
    }

    const data = {
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ],
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            }
        ]
    }

    // const options = {
    //     scales: {
    //         yAxes: [
    //             {
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }
    //         ]
    //     }
    // }


  return (
    <>
        <div className="details-chart-header">
            <h4>Price History for 1yr</h4>
        </div> 
        <div className="details-chart-container">
            <Line data={data} />
        </div>
    </>
  )
}

export default LineChart