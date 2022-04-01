import { combineReducers } from 'redux';

import navReducer from './components/Nav/navReducer';

import coinReducer from './api/reducers/Coins/coinReducer';
import coinDetailsReducer from './api/reducers/Coins/coinDetailsReducer';

import newsReducer from './api/reducers/News/newsReducer';
import newsDetailsReducer from './api/reducers/News/newsDetailsReducer';

const rootReducer = combineReducers({
    navbar: navReducer,
    coinApi: coinReducer,
    coinDetailsApi: coinDetailsReducer,
    newsApi: newsReducer,
    newsDetailsApi: newsDetailsReducer,
})

export default rootReducer;