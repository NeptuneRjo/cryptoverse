const initialState = {
    data: null,
    isPending: true,
    error: null
}

export default function coinReducer (state = initialState, action) {
    switch(action.type) {
        case 'COIN_FETCH_PENDING':
            return {
                ...state,
                isPending: true
            };
        case 'COIN_FETCH_COMPLETED':
            return {
                ...state,
                data: action.payload,
                isPending: false,
                error: null
            };
        case 'COIN_FETCH_FAILED': 
            return {
                ...state,
                isPending: false,
                error: action.payload
            }
        default:
            return state;
    }
}