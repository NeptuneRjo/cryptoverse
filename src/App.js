import './App.css';
import { Cryptos, Home, Nav, News } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchCoins, fetchNews } from './api'

function App() {

  fetchCoins();
  fetchNews();

  return (
    <BrowserRouter>
      <div className="app-main">
        <Nav />
        <div className="app-content">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/crypto' element={<Cryptos />} />
            <Route path='/news' element={<News />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
