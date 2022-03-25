const fetchCoins = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
            'X-RapidAPI-Key': '8ab56c9046mshf9298833651359cp1b0994jsndcc03fa4cad9'
        }
    };
    
    const data = await fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
        .then(response => {
            console.log(response.json())})
        .catch(err => console.error(err));

    console.log(data);
}

export default fetchCoins;