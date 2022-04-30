import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import rootReducer from '../reducer';
import { createStore } from 'redux';
import store from './testStore';

import App from '../App';


function renderWithRedux(
    ui,
    {initialState, store = createStore(rootReducer, initialState)} = {},
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
    }
}



it('should render with redux with defaults', () => {
    const { getByTestId } = renderWithRedux(<App />)
    expect(getByTestId('home-loading-text')).toHaveTextContent('Loading');
})

it('should render with redux with a custom store', () => {
    const { getByText } = renderWithRedux(<App />,  { store })
    expect(getByText('Total Exchanges')).toBeInTheDocument()
})

