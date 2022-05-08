const urls = [
	'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',

	'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h',
]

describe('Home', () => {
	beforeEach(() => {
		cy.intercept('GET', urls[0], { fixture: 'coinApi.json' })
		cy.intercept('GET', urls[1], { fixture: 'coinDetailsApi.json' })

		cy.visit('http://localhost:3000')
	})

	it('should render the mock data', () => {
		// This test is used on each integration test
		// to verify that the app is not using the servers

		// App is rendered
		cy.get('.crypto-main').should('be.visible')

		// The correct content is passed
		cy.get('#total-cryptos').should('be.visible').contains('3')
	})

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
