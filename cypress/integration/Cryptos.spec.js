import { api_intercept, mock_data_check } from './constants/exports'

const CryptosTestSuite = () => {
	describe('Cryptos', () => {
		beforeEach(() => {
			api_intercept()
		})

		mock_data_check()

		describe('Home page', () => {
			it('should render the *single* coin on the homepage', () => {
				cy.get('.crypto-main').should('be.visible')
			})

			it('should render the correct coin name', () => {
				cy.get('.crypto-info-name').should('be.visible').contains('Bitcoin')
			})

			it('should render the correct coin rank', () => {
				cy.get('.crypto-info-number').should('be.visible').contains('1.')
			})

			it('should render the correct coin price', () => {
				cy.get('.crypto-info-price').should('be.visible').contains('$9370.00')
			})

			it('should render the "view more" text', () => {
				cy.get('.crypto-click').should('be.visible')
			})
		})

		describe('Cryptocurrencies page', () => {
			beforeEach(() => {
				cy.get('.nav-mobile-main svg').click()
				cy.get('.nav-mobile-menu-item div').contains('Cryptos').click()
			})

			it('should render the *single* coin on the cryptos page', () => {
				cy.get('.crypto-main').should('be.visible')
			})

			it('should render the correct coin name', () => {
				cy.get('.crypto-info-name').should('be.visible').contains('Bitcoin')
			})

			it('should render the correct coin rank', () => {
				cy.get('.crypto-info-number').should('be.visible').contains('1.')
			})

			it('should render the correct coin price', () => {
				cy.get('.crypto-info-price').should('be.visible').contains('$9370.00')
			})

			it('should render the "view more" text', () => {
				cy.get('.crypto-click').should('be.visible')
			})

			it('should render the correct header', () => {
				cy.get('.cryptos-header')
					.should('be.visible')
					.contains('Top 50 Cryptocurrencies')
			})

			it('should render the search bar', () => {
				cy.get('.cryptos-search input').should('be.visible')
			})

			it('should have the correct value in the search bar', () => {
				cy.get('.cryptos-search input').type('Test Search')
				cy.get('.cryptos-search input').should('have.value', 'Test Search')
			})

			it('should render the back to top button', () => {
				cy.get('.cryptos-totop').should('be.visible')
				cy.get('.cryptos-totop span')
					.should('be.visible')
					.contains('Back to top')
			})
		})

		describe('Cryptos details page', () => {
			beforeEach(() => {
				cy.get('.crypto-main').click()
			})

			it('should render the crypto details page', () => {
				cy.get('.details-main').should('be.visible')
			})

			it('should render the correct header', () => {
				cy.get('.details-header').should('be.visible').contains('Bitcoin Info')
			})

			it('should render the correct price change', () => {
				cy.get('.details-item').contains('-3.25%').should('be.visible')
			})

			it('should render the correct statistics header', () => {
				cy.get('.details-section-header')
					.contains('BTC Statistics')
					.should('be.visible')
			})

			it('should render both conversions correctly', () => {
				cy.get('.details-item').contains('BTC to USD').should('be.visible')

				cy.get('.details-item').contains('USD to BTC').should('be.visible')
			})

			it('should render the correct coin to usd', () => {
				cy.get('.details-item').contains('$9370.00').should('be.visible')
			})

			it('should render the correct usd to coin', () => {
				cy.get('.details-item').contains('1.00 BTC').should('be.visible')
			})

			it('should render the correct 24h volume', () => {
				cy.get('.details-item').contains('$100').should('be.visible')
			})

			it('should render the market cap', () => {
				cy.get('.details-item').contains('$1.6K').should('be.visible')
			})

			it('should render the all time high', () => {
				cy.get('.details-item').contains('$100').should('be.visible')
			})

			it('should render the supply header', () => {
				cy.get('.details-section-header')
					.contains('Supply Information')
					.should('be.visible')
			})

			it('should render the total supply', () => {
				cy.get('.details-item').contains('102').should('be.visible')
			})

			it('should render the circulating supply', () => {
				cy.get('.details-item').contains('103').should('be.visible')
			})

			it('should render the info header', () => {
				cy.get('.details-section-header')
					.contains('What is Bitcoin?')
					.should('be.visible')
			})

			it('should render the coin description', () => {
				cy.get('.details-description')
					.contains('Hello, world')
					.should('be.visible')
			})

			it('should render the links header', () => {
				cy.get('.details-section-header')
					.contains('Bitcoin Links')
					.should('be.visible')
			})

			it('should render the links', () => {
				cy.get('.details-item').contains('website').should('be.visible')

				cy.get('.details-item a')
					.contains('Bitcoin')
					.should('be.visible')
					.should('have.attr', 'href')
					.should('include', 'https://www.google.com')
			})

			it('should render the back to top button', () => {
				cy.get('.details-totop span')
					.should('be.visible')
					.contains('Back to top')
			})
		})
	})
}

CryptosTestSuite()

export default CryptosTestSuite
