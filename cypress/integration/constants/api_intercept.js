export default function api_intercept() {
	const urls = [
		'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',

		'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h',
	]

	cy.intercept('GET', urls[0], { fixture: 'coinApi.json' })
	cy.intercept('GET', urls[1], { fixture: 'coinDetailsApi.json' })

	cy.visit('http://localhost:3000')
}
