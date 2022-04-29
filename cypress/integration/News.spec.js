
const urls = [
    'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',

    'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h',

    'https://crypto-open-news.p.rapidapi.com/news',
]

describe('News', () => {

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

    describe('Homepage news', () => {

        it('should render the news item on the homepage', () => {
            cy.get('.newsitem-main').should('be.visible')
        })
    })
})