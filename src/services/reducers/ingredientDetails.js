import {
    SHOW_INGREDIENT_DETAILS,
    RESET_INGREDIENT_DETAILS
} from '../actions/ingredientDetails';

const initialState = {
    item: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT_DETAILS:
            return {
                ...state,
                item: action.payload
            }

        case RESET_INGREDIENT_DETAILS:
            return initialState;

        default:
            return state;
    }
};