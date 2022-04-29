
const urls = [
    'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',

    'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h',

    'https://crypto-open-news.p.rapidapi.com/news',
]

describe('Home', () => {
    beforeEach(() => {
        cy.intercept('GET', urls[0], { fixture: 'coinApi.json' })
        cy.intercept('GET', urls[1], { fixture: 'coinDetailsApi.json' })
        cy.intercept('GET', urls[2], { fixture: 'newsApi.json' })

        cy.visit('http://localhost:3000')
    })

    it('should render the mock data', () => {
        // This test is used on each integration test
        // to verify that the app is not using the servers

        // App is rendered
        cy.get('.crypto-main').should('be.visible')
        cy.get('.newsitem-main').should('be.visible')

        // The correct content is passed
        cy.get('#total-cryptos')
            .should('be.visible')
            .contains('3')
    })

    it('should render the home page', () => {
        cy.get('.home-main').should('be.visible')
    })

    it('should render the correc header', () => {
        cy.get('.home-header')
            .should('be.visible')
            .contains('Home')
    })

    it('should render the stats component', () => {
        cy.get('.home-stats').should('be.visible')
        cy.get('.home-stats-item').should('be.visible')
    })

    it('should render the total cryptos', () => {
        cy.get('#total-cryptos')
            .should('be.visible')
            .contains('3')
        
        cy.get('#total-cryptos p')
            .should('be.visible')
            .contains('Total Cryptocurrencies')
    })

    it('shoud reder the 24h volume', () => {
        cy.get('#24hr-volume')
            .should('be.visible')
            .contains('50')

        cy.get('#24hr-volume p')
            .should('be.visible')
            .contains('Total 24hr Volume')
    })

    it('should render the total exchanges', () => {
        cy.get('#total-exchanges')
            .should('be.visible')
            .contains('300')

        cy.get('#total-exchanges p')
            .should('be.visible')
            .contains('Total Exchanges')
    })

    it('should render the top 10 header', () => {
        cy.get('.home-cryptos h3')
            .should('be.visible')
            .contains('Top 10 Cryptocurrencies')
    })

    it('should render the *single coin*', () => {
        cy.get('.crypto-main').should('be.visible')
    })

    it('should render the news header', () => {
        cy.get('.home-news h3')
            .should('be.visible')
            .contains('Latest News')
    })

    it('should render the news articles', () => {
        cy.get('.newsitem-main').should('be.visible')
    })
})