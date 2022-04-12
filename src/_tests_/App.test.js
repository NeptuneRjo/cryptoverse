import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import rootReducer from '../reducer';
import { createStore } from 'redux';
import store from './testStore';

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

    it('should render the mobile nav links', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        expect(getByTestId('home-link-mobile')).toBeInTheDocument();
        expect(getByTestId('crypto-link-mobile')).toBeInTheDocument();
        expect(getByTestId('news-link-mobile')).toBeInTheDocument();
    })

    it('should render the mobile nav links correctly', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        expect(getByTestId('home-link-mobile')).toHaveTextContent('Home');
        expect(getByTestId('crypto-link-mobile')).toHaveTextContent('Cryptos');
        expect(getByTestId('news-link-mobile')).toHaveTextContent('News');
    })

    it('should render the desktop nav links', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        expect(getByTestId('home-link-desktop')).toBeInTheDocument();
        expect(getByTestId('crypto-link-desktop')).toBeInTheDocument();
        expect(getByTestId('news-link-desktop')).toBeInTheDocument();
    })

    it('should render the desktop nav links correctly', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        expect(getByTestId('home-link-desktop')).toHaveTextContent('Home');
        expect(getByTestId('crypto-link-desktop')).toHaveTextContent('Cryptocurrencies');
        expect(getByTestId('news-link-desktop')).toHaveTextContent('News');
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

describe('Home', () => {

    it('should display statistics', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        expect(getByTestId('total-cryptos')).toHaveTextContent('3')
        expect(getByTestId('24h-volume')).toHaveTextContent('$50')
        expect(getByTestId('total-exchanges')).toHaveTextContent('300')
    })

    it('should display a cryptocurrency', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })
        const url = "https://cdn.coinranking.com/Sy33Krudb/btc.svg"

        expect(getByTestId('crypto-name')).toBeInTheDocument();

        expect(getByTestId('crypto-num')).toHaveTextContent('1');
        expect(getByTestId('crypto-name')).toHaveTextContent('Bitcoin');
        expect(getByTestId('crypto-price')).toHaveTextContent('$9370');

        // Icon Tests
        expect(getByTestId('crypto-icon')).toHaveAttribute('src', url)
        expect(getByTestId('crypto-icon')).toHaveAttribute('alt', 'Cryptocurrency icon');
    })

    it('should display a news article', () => {
        const { getAllByTestId } = renderWithRedux(<App />, { store })

        getAllByTestId('news-title').forEach(element => {
            expect(element).toBeInTheDocument();
            expect(element).toHaveTextContent('Thai Crypto Ban:')
        });

        getAllByTestId('news-date').forEach(element => {
            expect(element).toBeInTheDocument();
            expect(element).toHaveTextContent('04-03-2022');
        })

        getAllByTestId('news-img').forEach(element => {
            expect(element).toBeInTheDocument();
        })
    })
})

describe('Cryptocurrencies', () => {

    it('should render the cryptocurrencies page', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })
        const url = "https://cdn.coinranking.com/Sy33Krudb/btc.svg"

        fireEvent.click(getByTestId('crypto-link-desktop'))
        expect(getByTestId('cryptos-header')).toBeVisible();

        expect(getByTestId('crypto-num')).toHaveTextContent('1');
        expect(getByTestId('crypto-name')).toHaveTextContent('Bitcoin');
        expect(getByTestId('crypto-price')).toHaveTextContent('$9370');

        // Icon Tests
        expect(getByTestId('crypto-icon')).toHaveAttribute('src', url)
        expect(getByTestId('crypto-icon')).toHaveAttribute('alt', 'Cryptocurrency icon');
    })

    it('should render the coin page', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        fireEvent.click(getByTestId('crypto-item'))
        expect(getByTestId('coin-header')).toBeVisible();
    })

    it('should render the coin details', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        expect(getByTestId('coin-name')).toHaveTextContent('Bitcoin Info')
        expect(getByTestId('coin-rank')).toHaveTextContent('1')
        expect(getByTestId('coin-change')).toHaveTextContent('-3.25%')
        expect(getByTestId('coin-desc-header')).toHaveTextContent('What is Bitcoin')
    })
})

describe('News', () => {

    it('should render news page', () => {
        const { getByTestId } = renderWithRedux(<App />, { store })

        fireEvent.click(getByTestId('news-link-desktop'))
        expect(getByTestId('news-header')).toBeInTheDocument();
    })

    it('should render articles', () => {
        const { getAllByTestId } = renderWithRedux(<App />, { store })

        getAllByTestId('news-img').forEach(element => {
            expect(element).toBeInTheDocument();
        });
        getAllByTestId('news-title').forEach(element => {
            expect(element).toHaveTextContent('Thai Crypto Ban:');
        });
        getAllByTestId('news-date').forEach(element => {
            expect(element).toHaveTextContent('04-03-2022');
        });
    })

    it('should render the article page', () => {
        const { 
            getByTestId,
            getAllByTestId,
        } = renderWithRedux(<App />, { store })

        fireEvent.click(getAllByTestId('link-to-article')[0])
        
        expect(getByTestId('article-title')).toHaveTextContent('Thai Crypto Ban: Did Thailand Just Prohibit Cryptocurrencies?');
        expect(getByTestId('article-disclaimer')).toBeVisible();
        expect(getByTestId('article-date')).toHaveTextContent('04-03-2022')
        expect(getByTestId('article-description')).toHaveTextContent('description')

        fireEvent.click(getByTestId('home-link-desktop'))
    })
})