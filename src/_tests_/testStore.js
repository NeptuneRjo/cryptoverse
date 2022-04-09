import { createStore } from 'redux';

const store = createStore(() => ({
    coinApi: {
        data: {
            data: {
                stats: {
                    "total": '3',
                    "totalCoins": '10000',
                    "totalMarkets": '35000',
                    "totalExchanges": '300',
                    "totalMarketCap": "239393904304",
                    "total24hVolume": "50"
                },
                coins: [
                    {
                        "uuid": "Qwsogvtv82FCd",
                        "symbol": "BTC",
                        "name": "Bitcoin",
                        "color": "#f7931A",
                        "iconUrl": "https://cdn.coinranking.com/Sy33Krudb/btc.svg",
                        "marketCap": "159393904304",
                        "price": "9370",
                        "btcPrice": "1",
                        "listedAt": "1483228800",
                        'rank': '1'
                    }
                ]
            }
        }, 
        isPending: false,
        error: null
    },
    coinDetailsApi: {
        data: {
            data: {
                coin: {
                        "uuid": "Qwsogvtv82FCd",
                        "change": '-3.25',
                        "symbol": "BTC",
                        "name": "Bitcoin",
                        "color": "#f7931A",
                        "iconUrl": "https://cdn.coinranking.com/Sy33Krudb/btc.svg",
                        "marketCap": "1593",
                        "price": "9370",
                        "btcPrice": "1",
                        "listedAt": "1483",
                        'rank': '1',
                        '24hVolume': "100",
                        'allTimeHigh': {
                            'price': '100'
                        },
                        'supply': {
                            'total': '100',
                            'circulating': '100'
                        },
                        'description': 'Hello, world',
                        'links': [
                            {
                                'name': 'Bitcoin',
                                'type': 'website',
                                'url': 'https://www.google.com'
                            }
                        ]
                }
            }
        },
        isPending: false,
        error: null
    },
    newsApi: {
        data: {
            news: [
                {
                    imageUrl: "https://en-cdn.beincrypto.com/wp-content/uploads/2022/04/Thai-phone-watermarked.jpeg",
                    title: "Thai Crypto Ban: Did Thailand Just Prohibit Cryptocurrencies?",
                    categories: ['Other'],
                    date: "2022-04-03T23:00:00.000Z",
                    datestamp: "04-03-2022",
                    rawDescription: 'description',
                },
                {
                    imageUrl: "https://en-cdn.beincrypto.com/wp-content/uploads/2022/04/Thai-phone-watermarked.jpeg",
                    title: "Thai Crypto Ban: Did Thailand Just Prohibit Cryptocurrencies?",
                    categories: ['Other'],
                    date: "2022-04-03T23:00:00.000Z",
                    datestamp: "04-03-2022",
                    rawDescription: 'description',
                }
            ]
        },
        isPending: false,
        error: null
    },
    navbar: {
        currentNav: 'home'
    },
    newsIndex: {
        index: 0
    }
}))

export default store