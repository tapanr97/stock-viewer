import {ADD_STOCK, REMOVE_STOCK, SELECT_STOCK} from "../constants";

const initialState = {
    stocks: [],
    selectedStock: ""
}

export const stockReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_STOCK:
            return {
                ...state,
                stocks: [...state.stocks, action.ticker]
            };
        case REMOVE_STOCK:
            return {
                ...state,
                stocks: state.stocks.filter(stock => stock !== action.ticker)
            };
        case SELECT_STOCK:
            return {
                ...state,
                selectedStock: action.ticker
            }
        default:
            return state;
    }
}