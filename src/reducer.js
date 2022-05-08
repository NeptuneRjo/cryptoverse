import { combineReducers } from 'redux'
import {
	navReducer,
	coinReducer,
	coinDetailsReducer,
	coinHistoryReducer,
} from './reducers'

const rootReducer = combineReducers({
	navbar: navReducer,
	coinApi: coinReducer,
	coinDetailsApi: coinDetailsReducer,
	coinHistoryApi: coinHistoryReducer,
})

export default rootReducer
