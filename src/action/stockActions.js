import {ADD_STOCK, REMOVE_STOCK, SELECT_STOCK} from "../constants";

export const addStock = (ticker) => {
    return {
        type: ADD_STOCK,
        ticker
    }
}

export const removeStock = (ticker) => {
    return {
        type: REMOVE_STOCK,
        ticker
    }
}

export const selectStock = (ticker) => {
    return {
        type: SELECT_STOCK,
        ticker
    }
}