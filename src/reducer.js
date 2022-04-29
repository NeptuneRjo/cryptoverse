import { combineReducers } from 'redux';

import navReducer from './components/Nav/navReducer';

import coinReducer from './api/reducers/Coins/coinReducer';
import coinDetailsReducer from './api/reducers/Coins/coinDetailsReducer';

import newsReducer from './api/reducers/News/newsReducer';


const rootReducer = combineReducers({
    navbar: navReducer,
    coinApi: coinReducer,
    coinDetailsApi: coinDetailsReducer,
    newsApi: newsReducer,
})

export default rootReducer;