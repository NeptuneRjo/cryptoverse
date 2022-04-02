import { combineReducers, createStore } from "redux";

import navReducer from '../components/Nav/navReducer';

import coinReducer from '../api/reducers/Coins/coinReducer';
import coinDetailsReducer from '../api/reducers/Coins/coinDetailsReducer';

import newsReducer from '../api/reducers/News/newsReducer';

import newsPageReducer from '../api/reducers/News/newsDetailsReducer';

export function createTestStore() {
    const store = createStore(
        combineReducers({
            navbar: navReducer,
            coinApi: coinReducer,
            coinDetailsApi: coinDetailsReducer,
            newsApi: newsReducer,
            newsIndex: newsPageReducer
        })
    )
    return store
}