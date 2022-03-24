import './App.css';
import { Cryptos, Home, Nav, News } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchCoins, fetchNews } from './api'

function App() {

  const coinData = fetchCoins();
  const newsData = fetchNews();

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
                coinData={coinData} 
                newsData={newsData} 
              />
            } 
            />
            <Route 
              path='/crypto' 
              element={
              <Cryptos coinData={coinData} />
            } 
            />
            <Route 
              path='/news' 
              element={
              <News newsData={newsData} />
            } 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
