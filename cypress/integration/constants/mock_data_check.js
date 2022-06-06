export default function mock_data_check() {
	it('should render the mock data', () => {
		cy.get('.crypto-main').should('be.visible')
		cy.get('#total-cryptos').should('be.visible').contains('3')
	})
}
