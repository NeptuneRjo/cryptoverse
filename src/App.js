import './App.css';
import { Cryptos, Home, Nav, News } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFetch from './api/useFetch';
import CoinDetails from './components/Cryptos/CoinDetails/CoinDetails';
import NewsPage from './components/News/NewsPage/NewsPage';

function App() {

  const api = {
    coinUrl: 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0',
    coinHost: 'coinranking1.p.rapidapi.com',

    newsUrl: 'https://crypto-open-news.p.rapidapi.com/news',
    newsHost: 'crypto-open-news.p.rapidapi.com'
  }

  const { data: coinData, isPending: coinIsPending, error: coinError } = useFetch(api.coinUrl, api.coinHost);
  const { data: newsData, isPending: newsIsPending, error: newsError } = useFetch(api.newsUrl, api.newsHost);

  const coinProps = {
    data: coinData,
    isPending: coinIsPending,
    error: coinError
  }

  const newsProps = {
    data: newsData,
    isPending: newsIsPending,
    error: newsError
  }

  return (
    <BrowserRouter>
      <div className="app-main">
        <Nav />
        <div className="app-content">
          <Routes>
            <Route 
              exact path='/' 
              element={
              <Home 
                coinProps={coinProps}
                newsProps={newsProps}
              />
            } 
            />
            <Route 
              path='/crypto' 
              element={
              <Cryptos 
                coinProps={coinProps}
              />
            } 
            />
            <Route 
              path='/crypto/:coinId'
              element={
                <CoinDetails 
                  coinProps={coinProps}
                />
              }
            />
            <Route 
              path='/news' 
              element={
              <News 
                newsProps={newsProps}
              />
            } 
            />
            <Route  
              path='/news/:newsId'
              element={
                <NewsPage />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
