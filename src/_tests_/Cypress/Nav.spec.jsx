import { mount } from '@cypress/react'
import App from '../../App'

import store from '../testStore';
import rootReducer from '../../reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';



function renderWithRedux(
    ui,
    {initialState, store = createStore(rootReducer, initialState)} = {},
) {
    return {
        ...mount(<Provider store={store}>{ui}</Provider>),
        store,
    }
}

describe('Nav', () => {
    describe('Desktop', () => {
        beforeEach(() => {
            cy.viewport(1200, 900)
        })

        it('the app is rendered', () => {
            renderWithRedux(<App />, { store })

            cy.get('.app-main').should('be.visible')
        })


        it('the desktop nav is rendered', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-main').should('be.visible')
        })

        it('the mobile nav is not rendered', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main').should('not.be.visible')
        })

        it('the links in the desktop nav are visible', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-menu-item').should('be.visible')
        })

        it('renders the "Home" link', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-menu-item')
                .contains('Home').should('be.visible')
        })

        it('renders the "Cryptocurrencies" link', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-menu-item')
                .contains('Cryptocurrencies').should('be.visible')
        })

        it('renders the "News" link', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-menu-item')
                .contains('News').should('be.visible')
        })

        it('the "Home" link takes you to the home page', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-menu-item')
                .contains('Home').click();
            cy.get('.home-main').should('be.visible');
        })

        it('the "Crypto" link takes you to the cryptos page', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-menu-item')
                .contains('Cryptocurrencies').click();
            cy.get('.cryptos-main').should('be.visible');
        })

        it('the "News" link takes you to the news page', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-menu-item')
                .contains('News').click();
            cy.get('.news-main').should('be.visible');
        })
    })

    describe('Mobile', () => {
        it('the mobile nav is rendered', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main').should('be.visible')
        })

        it('the desktop nav is not rendered', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-desktop-main').should('not.be.visible')
        })

        it('the nav should not be visible if not toggled', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-menu-item').should('not.be.visible')
        })

        it('the links in the mobile nav are visible if toggled', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main svg').click()
            cy.get('.nav-mobile-menu-item').should('be.visible')
        })

        it('renders the "Home" link', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main svg').click()
            cy.get('.nav-mobile-menu-item')
                .contains('Home').should('be.visible')
        })

        it('renders the "Cryptocurrencies" link', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main svg').click()
            cy.get('.nav-mobile-menu-item')
                .contains('Cryptos').should('be.visible')
        })

        it('renders the "News" link', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main svg').click()
            cy.get('.nav-mobile-menu-item')
                .contains('News').should('be.visible')
        })

        it('the "Home" link takes you to the home page', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main svg').click()
            cy.get('.nav-mobile-menu-item')
                .contains('Home').click();
            cy.get('.home-main').should('be.visible');
        })

        it('the "Crypto" link takes you to the cryptos page', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main svg').click()
            cy.get('.nav-mobile-menu-item')
                .contains('Cryptos').click();
            cy.get('.cryptos-main').should('be.visible');
        })

        it('the "News" link takes you to the news page', () => {
            renderWithRedux(<App />, { store })

            cy.get('.nav-mobile-main svg').click()
            cy.get('.nav-mobile-menu-item')
                .contains('News').click();
            cy.get('.news-main').should('be.visible');
        })
    })
})