const fetchCoins = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': '8ab56c9046mshf9298833651359cp1b0994jsndcc03fa4cad9'
        }
    };

    fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response;
        }).catch(err => console.error(err))
}

export default fetchCoins;