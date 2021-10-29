import { Reducer } from 'redux';
import { IBurgerIngredientsItem } from '../../components/burger-ingredients-item/burger-ingredients-item';
import {
    BurgerIngredientsActionTypes,
    BurgerIngredientsTypeKeys,
} from '../actions/burgerIngredients';

export interface IBurgerIngredientsState {
    ingredients: IBurgerIngredientsItem[];
    getIngredientsLoading: boolean;
    getIngredientsFailed: boolean;
};

const initialState: IBurgerIngredientsState = {
    ingredients: [],
    getIngredientsLoading: false,
    getIngredientsFailed: false,
};

export const burgerIngredientsReducer: Reducer<IBurgerIngredientsState, BurgerIngredientsActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case BurgerIngredientsTypeKeys.REQUEST:
            return {
                ...state,
                getIngredientsLoading: true,
                getIngredientsFailed: false,
            };

        case BurgerIngredientsTypeKeys.SUCCESS:
            return {
                ...state,
                getIngredientsLoading: false,
                ingredients: action.ingredients,
                getIngredientsFailed: false,
            };

        case BurgerIngredientsTypeKeys.FAILED:
            return {
                ...state,
                getIngredientsLoading: false,
                getIngredientsFailed: true,
            };

        default:
            return state;
    }
};
