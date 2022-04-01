const initialState = {
    data: null,
    isPending: true,
    error: null
}

export default function apiReducer (state = initialState, action) {
    switch(action.type) {
        case 'NEWS_FETCH_PENDING':
            return {
                ...state,
                isPending: true
            };
        case 'NEWS_FETCH_COMPLETED':
            return {
                ...state,
                data: action.payload,
                isPending: false,
                error: null
            };
        case 'NEWS_FETCH_FAILED': 
            return {
                ...state,
                isPending: false,
                error: action.payload
            }
        default:
            return state;
    }
}