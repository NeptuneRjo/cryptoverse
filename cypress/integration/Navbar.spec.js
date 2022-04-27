
const urls = [
    'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',

    'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h',
    
    'https://crypto-open-news.p.rapidapi.com/news',
]


describe('Navbar', () => {

    beforeEach(() => {
        cy.intercept('GET', urls[0], { fixture: 'coinApi.json' })
        cy.intercept('GET', urls[1], { fixture: 'coinDetailsApi.json' })
        cy.intercept('GET', urls[2], { fixture: 'newsApi.json' })

        cy.visit('https://neptunerjo.github.io/cryptoverse/')
    })

    it('should render the mock data', () => {
        cy.get('.crypto-main').should('be.visible')
        cy.get('.newsitem-main').should('be.visible')
    })

    describe('Mobile Nav', () => {
        it('should render the mobile nav', () => {
            cy.get('.nav-mobile-main').should('be.visible')
        })

        it('should not render the desktop nav', () => {
            cy.get('.nav-desktop-main').should('not.be.visible')
        })
        
    })
})