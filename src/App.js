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

  useFetch(api.coinUrl, api.coinHost, 'COIN');
  useFetch(api.newsUrl, api.newsHost, 'NEWS')

  return (
    <BrowserRouter>
      <div className="app-main">
        <Nav />
        <div className="app-content">
          <Routes>
            <Route 
              exact path='/' 
              element={
              <Home />
            } 
            />
            <Route 
              path='/crypto' 
              element={
              <Cryptos />
            } 
            />
            <Route 
              path='/crypto/:coinId'
              element={
                <CoinDetails />
              }
            />
            <Route 
              path='/news' 
              element={
              <News />
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
