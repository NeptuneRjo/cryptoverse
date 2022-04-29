
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

        it('should render the correct news image', () => {
            const src = 'https://en-cdn.beincrypto.com/wp-content/uploads/2022/04/Thai-phone-watermarked.jpeg'

            cy.get('.newsitem-hero img')
                .should('be.visible')
                .should('have.attr', 'src')
                .should('include', src)
        })

        it('should render the correct news header', () => {
            cy.get('.newsitem-header')
                .should('be.visible')
                .contains('Thai Crypto Ban: Did Thailand Just Prohibit Cryptocurrencies?')
        })

        it('should render the correct date', () => {
            cy.get('.newsitem-date')
                .should('be.visible')
                .contains('04-03-2022')
        })

        it('should render the correct UX', () => {
            cy.get('.newsitem-tap').should('be.visible')

            cy.viewport(1200, 900)
            cy.get('.newsitem-click').should('be.visible')
        })
    })

    describe('News page', () => {

        beforeEach(() => {
            cy.visit('http://localhost:3000/#/news')
        })

        it('should render the news page', () => {
            cy.get('.news-main').should('be.visible')
        })

        it('should render the search bar', () => {
            cy.get('.news-search input').should('be.visible')
        })

        it('should have the correct value in the search bar', () => {
            cy.get('.news-search input').type('Test Search')
            cy.get('.news-search input')
                .should('have.value', 'Test Search')
        })

        it('should render the correct header', () => {
            cy.get('.news-header h3')
                .should('be.visible')
                .contains("Today's Crypto News")
        })

        it('should render the news article', () => {
            cy.get('.newsitem-main').should('be.visible')
        })

        it('should render the correct news image', () => {
            const src = 'https://en-cdn.beincrypto.com/wp-content/uploads/2022/04/Thai-phone-watermarked.jpeg'

            cy.get('.newsitem-hero img')
                .should('be.visible')
                .should('have.attr', 'src')
                .should('include', src)
        })

        it('should render the correct news header', () => {
            cy.get('.newsitem-header')
                .should('be.visible')
                .contains('Thai Crypto Ban: Did Thailand Just Prohibit Cryptocurrencies?')
        })

        it('should render the correct date', () => {
            cy.get('.newsitem-date')
                .should('be.visible')
                .contains('04-03-2022')
        })

        it('should render the correct UX', () => {
            cy.get('.newsitem-tap').should('be.visible')

            cy.viewport(1200, 900)
            cy.get('.newsitem-click').should('be.visible')
        })
    })

    describe('news articles', () => {
        it('should take you to the article page', () => {
            cy.get('.newsitem-main').click({ multiple: true })
            cy.url('https://google.com')
        })
    })
})