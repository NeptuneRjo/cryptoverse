const initialState = {
	data: null,
	isPending: true,
	error: null,
}

export default function coinHistoryReducer(state = initialState, action) {
	switch (action.type) {
		case 'COINHISTORY_FETCH_PENDING':
			return {
				...state,
				isPending: true,
			}
		case 'COINHISTORY_FETCH_COMPLETED':
			return {
				...state,
				data: action.payload,
				isPending: false,
				error: null,
			}
		case 'COINHISTORY_FETCH_FAILED':
			return {
				...state,
				isPending: false,
				error: action.payload,
			}
		default:
			return state
	}
}
