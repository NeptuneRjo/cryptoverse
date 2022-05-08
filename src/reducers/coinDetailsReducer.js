const initialState = {
    data: null,
    isPending: true,
    error: null
}

export default function coinDetailsReducer (state = initialState, action) {
    switch(action.type) {
        case 'COINDETAILS_FETCH_PENDING':
            return {
                ...state,
                isPending: true
            };
        case 'COINDETAILS_FETCH_COMPLETED':
            return {
                ...state,
                data: action.payload,
                isPending: false,
                error: null
            };
        case 'COINDETAILS_FETCH_FAILED': 
            return {
                ...state,
                isPending: false,
                error: action.payload
            }
        default:
            return state;
    }
}