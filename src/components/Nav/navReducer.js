const initialState = {
    currentNav: 'home',
}

export default function navReducer (state = initialState, action) {
    switch (action.type) {
        case 'SET_NAVBAR':
            return {
                ...state,
                currentNav: action.payload
            }
        default:
            return state;
    }
}