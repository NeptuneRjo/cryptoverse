import { combineReducers } from 'redux';

import navReducer from './components/Nav/navReducer';

const rootReducer = combineReducers({
    navbar: navReducer,
})

export default rootReducer;