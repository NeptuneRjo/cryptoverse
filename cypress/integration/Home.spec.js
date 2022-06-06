import { api_intercept, mock_data_check } from './constants/exports'

const HomeTestSuite = () => {
	describe('Home', () => {
		beforeEach(() => {
			api_intercept()
		})

		mock_data_check()

		it('should render the home page', () => {
			cy.get('.home-main').should('be.visible')
		})

		it('should render the correct header', () => {
			cy.get('.home-header').should('be.visible').contains('Home')
		})

		it('should render the stats component', () => {
			cy.get('.home-section').should('be.visible')
			cy.get('.home-item').should('be.visible')
		})

		it('should render the total cryptos', () => {
			cy.get('.home-item').contains('3').should('be.visible')
		})

		it('shoud reder the 24h volume', () => {
			cy.get('.home-item').contains('50').should('be.visible')
		})

		it('should render the total exchanges', () => {
			cy.get('.home-item').contains('300').should('be.visible')
		})

		it('should render the top 10 header', () => {
			cy.get('.home-section-header')
				.contains('Top 10 Cryptocurrencies')
				.should('be.visible')
		})

		it('should render the *single coin*', () => {
			cy.get('.crypto-main').should('be.visible')
		})
	})
}

export default HomeTestSuite
