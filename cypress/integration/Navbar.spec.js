import { api_intercept, mock_data_check } from './constants/exports'

const NavbarTestSuite = () => {
	describe('Navbar', () => {
		beforeEach(() => {
			api_intercept()
		})

		mock_data_check()

		describe('Mobile Nav', () => {
			it('should render the mobile nav', () => {
				cy.get('.nav-mobile-main').should('be.visible')
			})

			it('should not render the desktop nav', () => {
				cy.get('.nav-desktop-main').should('not.be.visible')
			})

			it('should render the mobile nav toggle button', () => {
				cy.get('.nav-mobile-toggle').should('be.visible')
				cy.get('.nav-mobile-toggle svg').should('be.visible')
			})

			it('should not render the menu if the toggle is not clicked', () => {
				cy.get('.nav-mobile-menu').should('not.be.visible')
			})

			it('should render the menu if the toggle is clicked', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu').should('be.visible')
			})

			it('should close the menu if toggled again', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu').should('be.visible')

				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu').should('not.be.visible')
			})

			it('should render each menu link if toggled', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu-item').should('be.visible')
			})

			it('Should render the "Home" link', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu-item').contains('Home')
			})

			it('the "Home" link should take you to the "Home" page', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu-item').contains('Home').click()

				cy.get('.home-main').should('be.visible')
			})

			it('should not render the nav after a link is clicked', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu-item div').contains('Home').click()

				cy.get('.nav-mobile-menu').should('not.be.visible')
			})

			it('Should render the "Cryptos" link', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu-item').contains('Cryptos')
			})

			it('the "Cryptos" link should take you to the "Cryptos" page', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu-item').contains('Cryptos').click()

				cy.get('.cryptos-main').should('be.visible')
			})

			it('should not render the nav after a link is clicked', () => {
				cy.get('.nav-mobile-toggle svg').click()
				cy.get('.nav-mobile-menu-item div').contains('Cryptos').click()

				cy.get('.nav-mobile-menu').should('not.be.visible')
			})
		})

		describe('Desktop Navbar', () => {
			beforeEach(() => {
				cy.viewport(1200, 900)
			})

			it('should render the desktop nav', () => {
				cy.get('.nav-desktop-main').should('be.visible')
			})

			it('should not render the mobile nav', () => {
				cy.get('.nav-mobile-main').should('not.be.visible')
			})

			it('should render each menu link', () => {
				cy.get('.nav-desktop-menu-item').should('be.visible')
			})

			it('should render the "Home" link', () => {
				cy.get('.nav-desktop-menu-item').contains('Home').should('be.visible')
			})

			it('the "Home" link takes you to the "Home" page', () => {
				cy.get('.nav-desktop-menu-item').contains('Home').click()
				cy.get('.home-main').should('be.visible')
			})

			it('should render the "Cryptocurrencies" link', () => {
				cy.get('.nav-desktop-menu-item')
					.contains('Cryptocurrencies')
					.should('be.visible')
			})

			it('the "Cryptos" link takes you to the "Cryptos" page', () => {
				cy.get('.nav-desktop-menu-item').contains('Cryptocurrencies').click()
				cy.get('.cryptos-main').should('be.visible')
			})
		})
	})
}

export default NavbarTestSuite
