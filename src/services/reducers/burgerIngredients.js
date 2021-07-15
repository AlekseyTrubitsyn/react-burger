import { 
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/burgerIngredients';

const initialState = {
    ingredients: [],
    getIngredientsLoading: false,
    getIngredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                getIngredientsLoading: true,
                getIngredientsFailed: false,
            };
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                getIngredientsLoading: false,
                ingredients: action.ingredients,
                getIngredientsFailed: false,
            };
        }

        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                getIngredientsLoading: false,
                getIngredientsFailed: true,
            };
        }

        default: {
            return state;
        }
    }
};