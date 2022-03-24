const fetchNews = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'crypto-open-news.p.rapidapi.com',
            'X-RapidAPI-Key': '8ab56c9046mshf9298833651359cp1b0994jsndcc03fa4cad9'
        }
    };

    fetch('https://crypto-open-news.p.rapidapi.com/news', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return response;
        }).catch(err => console.error(err))
}

export default fetchNews;