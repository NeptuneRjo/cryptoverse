const initialState = {
    index: null
}

export default function newsPageReducer (state = initialState, action) {
    switch(action.type) {
        case 'SET_NEWS_INDEX':
            return {
                ...state,
                index: action.payload
            }
        default: 
            return state;
    }
}