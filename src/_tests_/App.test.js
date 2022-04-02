import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { createTestStore } from './createTestStore';

import App from '../App';
import { Nav, Cryptos, Home, News } from '../components';


let store;

describe('App', () => {
    let div = document.createElement('div')

    beforeEach(() => {
        store = createTestStore();
    });
    
    const appComponent = () => {
        render(
        <Provider store={store} >
            <Nav />
        </Provider>
    )}

    const navComponent = () => {
        render(
            <Provider store={store} >
                <Nav />
            </Provider>, 
            {wrapper: MemoryRouter}
        )
    }

    it('should render the desktop nav', async () => {
        navComponent();

        const home = screen.getByTestId('home-link-desktop')
        const cryptos = screen.getByTestId('crypto-link-desktop')
        const news = screen.getByTestId('news-link-desktop');

        expect(home).toBeVisible;
        expect(cryptos).toBeVisible;
        expect(news).toBeVisible;
    })
    // describe('Nav', () => {
    //     it('should render the desktop nav', () => {

    //     })
    // })
})