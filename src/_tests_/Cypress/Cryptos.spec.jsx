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

describe('Cryptos', () => {
    describe('Desktop', () => {
        beforeEach(() => {
            cy.viewport(1200,900)
        })

        describe('Homepage cryptos', () => {
            it('renders the coin on the homepage', () => {
                renderWithRedux(<App />, { store })
    
                cy.get('.home-main').should('be.visible')
                cy.get('.crypto-main').should('be.visible')
            })

            it('the correct coin name is displayed', () => {
                renderWithRedux(<App />, { store })

                cy.get('.crypto-info-name')
                    .should('be.visible')
                    .contains('Bitcoin')
            })

            it('the correct coin rank is displayed', () => {
                renderWithRedux(<App />, { store })

                cy.get('.crypto-info-number')
                    .contains('1')
                    .should('be.visible')
            })

            it('the correct coin price is displayed', () => {
                renderWithRedux(<App />, { store })

                cy.get('.crypto-info-price')
                    .contains('$9370.00')
                    .should('be.visible')
            })

            it('the correct UX is displayed for desktop', () => {
                renderWithRedux(<App />, { store })

                cy.get('.crypto-click').should('be.visible')
            })

            it('displays the coin icon', () => {
                renderWithRedux(<App />, { store })

                cy.get('.crypto-icon').should('be.visible')
            })
        })

        describe('Cryptos Details', () => {
            it('the cryptos details is rendered', () => {
                renderWithRedux(<App />, { store })
                cy.get('.crypto-main').click()

                cy.get('.details-main').should('be.visible')
            })

            it('the header is correct', () => {
                renderWithRedux(<App />, { store })

                cy.get('.details-header')
                    .should('be.visible')
                    .contains('Bitcoin Info')
            })

            it('the rank is correct', () => {
                renderWithRedux(<App />, { store })

                cy.get('.details-header-left')
                    .should('be.visible')
                    .contains('Rank 1')
            })

            it('the price change is correct', () => {
                renderWithRedux(<App />, { store })

                cy.get('.details-header-right')
                    .should('be.visible')
                    .contains('-3.25%')
            })

            it('the statistics header is correct', () => {
                renderWithRedux(<App />, { store })

                cy.get('.details-statistics h3')
                    .should('be.visible')
                    .contains('BTC value statistics')
            })

            it('renders the correct coin to usd', () => {
                renderWithRedux(<App />, { store })

                cy.get('.details-tousd p')
                    .should('be.visible')
                    .contains('BTC to USD')

                cy.get('.details-tousd')
                    .should('be.visible')
                    .contains('$9370.00')
            })

            it('the 24h volume is correct', () => {
                renderWithRedux(<App />, { store })

                cy.get('.details-24hvolume')
                    .should('be.visible')
                    .contains('$100')
            })

            it('the market cap is correct', () => {
                renderWithRedux(<App />, { store })

                cy.get('.details-marketcap')
                    .should('be.visible')
                    .contains('1.6K')
            })
        })
    })
})