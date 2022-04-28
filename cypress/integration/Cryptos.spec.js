
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
            cy.get('.crypto-main').click()
        })

        it('should render the crypto details page', () => {
            cy.get('.details-main').should('be.visible')
        })

        it('should render the correct header', () => {
            cy.get('.details-header')
                .should('be.visible')
                .contains('Bitcoin Info')
        })

        it('should render the correct icon', () => {
            const src = 'https://cdn.coinranking.com/Sy33Krudb/btc.svg'

            cy.get('.details-header-left img')
                .should('be.visible')
                .should('have.attr', 'src')
                .should('include', src)
        })

        it('should render the correct rank', () => {
            cy.get('.details-header-left p ')
                .should('be.visible')
                .contains('Rank 1')
        })

        it('should render the correct price change', () => {
            cy.get('.details-header-right').should('be.visible')

            cy.get('.details-header-right p')
                .should('be.visible')
                .contains('-3.25%')
            cy.get('.details-header-right h4')
                .should('be.visible')
                .contains('Price Change')
        })

        it('should render the correct statistics header', () => {
            cy.get('.details-statistics')
                .should('be.visible')
                .contains('BTC value statistics')
        })

        it('should render both conversions correctly', () => {
            cy.get('.details-tousd')
                .should('be.visible')
                .contains('BTC to USD')
            
            cy.get('.details-tocoin')
                .should('be.visible')
                .contains('USD to BTC')
        })

        it('should render the correct coin to usd', () => {
            cy.get('.details-tousd').contains('$9370.00')
        })

        it('should render the correct usd to coin', () => {
            cy.get('.details-tocoin').contains('1.00 BTC')
        })

        it('should render the correct 24h volume', () => {
            cy.get('.details-24hvolume p')
                .should('be.visible')
                .contains('24 Hour Volume')

            cy.get('.details-24hvolume')    
                .should('be.visible')
                .contains('$100')
        })

        it('should render the market cap', () => {
            cy.get('.details-marketcap p')
                .should('be.visible')
                .contains('Market Cap')

            cy.get('.details-marketcap')
                .should('be.visible')
                .contains('$1.6K')
        })

        it('should render the all time high', () => {
            cy.get('.details-alltimehigh p')  
                .should('be.visible')
                .contains('All Time High')
            
            cy.get('.details-alltimehigh')
                .should('be.visible')
                .contains('$100')
        })

        it('should render the supply header', () => {
            cy.get('.details-supplyinfo h3')
                .should('be.visible')
                .contains('Supply Information')
        })

        it('should render the total supply', () => {
            cy.get('.details-supply')
                .should('be.visible')
                .contains('100')
        })

        it('should render the circulating supply', () => {
            cy.get('.details-circulating')
                .should('be.visible')
                .contains('100')
        })

        it('should render the info header', () => {
            cy.get('.details-description-header')
                .should('be.visible')
                .contains('What is Bitcoin?')
        })

        it('should render the coin description', () => {
            cy.get('.details-descriptiontext')
                .should('be.visible')
                .contains('Hello, world')
        })

        it('should render the links header', () => {
            cy.get('.details-links h3')
                .should('be.visible')
                .contains('Bitcoin Links')
        })

        it('should render the links', () => {
            cy.get('.details-links')
                .should('be.visible')
                .contains('website')

            cy.get('.details-links a')
                .should('be.visible')
                .contains('Bitcoin')
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