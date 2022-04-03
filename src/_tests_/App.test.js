import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { createTestStore } from './createTestStore';

import App from '../App';
import { Nav, Cryptos, Home, News } from '../components';
import { store as actualStore } from '../store';
import { useSelector } from 'react-redux';

let store;

describe('App', () => {

    beforeEach(() => {
        store = createTestStore();
    });
    
    const component = (component) => {
        render(
        <Provider store={store} >
            {component}
        </Provider>,
        {wrapper: MemoryRouter}
    )}

    describe('Nav', () => {

        it('should render the desktop nav', async () => {
            component(<Nav />)
    
            const home = screen.getByTestId('home-link-desktop')
            const cryptos = screen.getByTestId('crypto-link-desktop')
            const news = screen.getByTestId('news-link-desktop');
    
            expect(home).toBeVisible;
            expect(cryptos).toBeVisible;
            expect(news).toBeVisible;
        })

        it('should render the mobile nav', async () => {
            component(<Nav />)
            
            const home = screen.getByTestId('home-link-mobile')
            const cryptos = screen.getByTestId('crypto-link-mobile')
            const news = screen.getByTestId('news-link-mobile');

            expect(home).toBeVisible;
            expect(cryptos).toBeVisible;
            expect(news).toBeVisible;
        })

        it('should switch the nav toggle when clicked', () => {
            component(<Nav />)

            const openMenu = screen.getByTestId('3-line-menu')
            expect(openMenu).toBeVisible

            fireEvent.click(openMenu)
            const closeMenu = screen.getByTestId('close-menu')
            expect(closeMenu).toBeVisible
        })
    })
})