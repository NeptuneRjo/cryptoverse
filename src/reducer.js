import { combineReducers } from 'redux'
import { navReducer, coinReducer, coinDetailsReducer } from './reducers'

const rootReducer = combineReducers({
	navbar: navReducer,
	coinApi: coinReducer,
	coinDetailsApi: coinDetailsReducer,
})

export default rootReducer
