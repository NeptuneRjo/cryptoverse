
const urls = [
    'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',

    'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h',

    'https://crypto-open-news.p.rapidapi.com/news',
]


describe('Cryptos', () => {
    beforeEach(() => {
        cy.intercept('GET', urls[0], { fixture: 'coinApi.json' })
        cy.intercept('GET', urls[1], { fixture: 'coinDetailsApi.json' })
        cy.intercept('GET', urls[2], { fixture: 'newsApi.json' })

        cy.visit('https://neptunerjo.github.io/cryptoverse/')
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

    describe('Home page', () => {
        it('should render the *single* coin on the homepage', () => {
            cy.get('.crypto-main').should('be.visible')
        })

        it('should render the correct coin name', () => {
            cy.get('.crypto-info-name')
                .should('be.visible')
                .contains('Bitcoin')
        })

        it('should render the correct coin rank', () => {
            cy.get('.crypto-info-number')
                .should('be.visible')
                .contains('1.')
        })

        it('should render the correct coin price', () => {
            cy.get('.crypto-info-price')
                .should('be.visible')
                .contains('$9370.00')
        })

        it('should render the correct coin UX *for mobile*', () => {
            cy.get('.crypto-tap').should('be.visible')
            cy.get('.crypto-click').should('not.be.visible')
        })

        it('should render the correct coin UX *for desktop*', () => {
            cy.viewport(1200, 900)

            cy.get('.crypto-tap').should('not.be.visible')
            cy.get('.crypto-click').should('be.visible')

        })

        it('should render the correct coin icon', () => {
            const src = 'https://cdn.coinranking.com/Sy33Krudb/btc.svg'

            cy.get('.crypto-icon').should('be.visible')
            cy.get('.crypto-icon img')
                .should('have.attr', 'src')
                .should('include', src)
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
            cy.get('.crypto-info-name')
                .should('be.visible')
                .contains('Bitcoin')
        })

        it('should render the correct coin rank', () => {
            cy.get('.crypto-info-number')
                .should('be.visible')
                .contains('1.')
        })

        it('should render the correct coin price', () => {
            cy.get('.crypto-info-price')
                .should('be.visible')
                .contains('$9370.00')
        })

        it('should render the correct coin UX *for mobile*', () => {
            cy.get('.crypto-tap').should('be.visible')
            cy.get('.crypto-click').should('not.be.visible')
        })

        it('should render the correct coin UX *for desktop*', () => {
            cy.viewport(1200, 900)

            cy.get('.crypto-tap').should('not.be.visible')
            cy.get('.crypto-click').should('be.visible')

        })

        it('should render the correct coin icon', () => {
            const src = 'https://cdn.coinranking.com/Sy33Krudb/btc.svg'

            cy.get('.crypto-icon').should('be.visible')
            cy.get('.crypto-icon img')
                .should('have.attr', 'src')
                .should('include', src)
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
            cy.get('.cryptos-search input')
                .should('have.value', 'Test Search')
        })

        it('should render the back to top button', () => {
            cy.get('.cryptos-totop')
                .should('be.visible')
            cy.get('.cryptos-totop span')
                .should('be.visible')
                .contains('Back to top')
        })

    })

    describe('Cryptos details page', () => {

        beforeEach(() => {
            cy.get('.cryptos-main').click()
        })
    })

})