import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducer';

import App from '../App';


function renderWithRedux(
    ui,
    {initialState, store = createStore(rootReducer, initialState)} = {},
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
    }
}

const store = createStore(() => ({
    coinApi: {
        data: {
            data: {
                stats: {
                    "total": 3,
                    "totalCoins": 10000,
                    "totalMarkets": 35000,
                    "totalExchanges": 300,
                    "totalMarketCap": "239393904304",
                    "total24hVolume": "503104376.06373006"
                },
                coins: [
                    {
                        "uuid": "Qwsogvtv82FCd",
                        "symbol": "BTC",
                        "name": "Bitcoin",
                        "color": "#f7931A",
                        "iconUrl": "https://cdn.coinranking.com/Sy33Krudb/btc.svg",
                        "marketCap": "159393904304",
                        "price": "9370.9993109108",
                        "btcPrice": "1",
                        "listedAt": "1483228800"
                    }
                ]
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
    }
}))

it('should render with redux with defaults', () => {
    const { getByTestId } = renderWithRedux(<App />)
    expect(getByTestId('home-loading-text')).toHaveTextContent('Loading');
})

it('should render with redux with a custom store', () => {
    const { getByText } = renderWithRedux(<App />,  { store })
    expect(getByText('Total Exchanges')).toBeInTheDocument()
})

describe('Nav', () => {

    it('should render the mobile nav toggle', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        expect(
            getByTestId('toggle-menu').querySelector('svg')
        ).toBeInTheDocument();

        fireEvent.click(
            getByTestId('toggle-menu').querySelector('svg')
        )

        expect(
            getByTestId('toggle-menu').querySelector('svg')
        ).toBeInTheDocument();
    })

    it('should render the nav links', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        // Mobile Nav Links

        expect(getByTestId('home-link-mobile')).toBeInTheDocument();
        expect(getByTestId('crypto-link-mobile')).toBeInTheDocument();
        expect(getByTestId('news-link-mobile')).toBeInTheDocument();

        // Desktop Nav Links

        expect(getByTestId('home-link-desktop')).toBeInTheDocument();
        expect(getByTestId('crypto-link-desktop')).toBeInTheDocument();
        expect(getByTestId('news-link-desktop')).toBeInTheDocument();
    })

    it('should render the correct pages on mobile', () => {
        const { getByTestId, } = renderWithRedux(<App />, { store })

        expect(getByTestId('home-header')).toBeInTheDocument();

        fireEvent.click(getByTestId('crypto-link-mobile')) 
        expect(getByTestId('cryptos-header')).toBeInTheDocument(); 
        
        fireEvent.click(getByTestId('news-link-mobile'))
        expect(getByTestId('news-header')).toBeInTheDocument();

        fireEvent.click(getByTestId('home-link-mobile'))
    })

    it('should render the correct pages on desktop', () => {
        const { getByTestId, } = renderWithRedux(<App />, { store })

        expect(getByTestId('home-header')).toBeInTheDocument();

        fireEvent.click(getByTestId('crypto-link-desktop')) 
        expect(getByTestId('cryptos-header')).toBeInTheDocument(); 
        
        fireEvent.click(getByTestId('news-link-desktop'))
        expect(getByTestId('news-header')).toBeInTheDocument();

        // Renders homepage before next test
        fireEvent.click(getByTestId('home-link-desktop'))
    })
})