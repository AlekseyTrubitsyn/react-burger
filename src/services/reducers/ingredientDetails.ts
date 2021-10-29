import { Reducer } from 'redux';
import { IBurgerIngredientsItem } from '../../components/burger-ingredients-item/burger-ingredients-item';
import { IngredientDetailsActionTypes, IngredientDetailsTypeKeys } from '../actions/ingredientDetails';

export interface IIngredientDetailsState {
    item: IBurgerIngredientsItem | null;
};

const initialState = {
    item: null
};

export const ingredientDetailsReducer: Reducer<IIngredientDetailsState, IngredientDetailsActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case IngredientDetailsTypeKeys.SHOW:
            return {
                ...state,
                item: action.payload
            }

        case IngredientDetailsTypeKeys.RESET:
            return initialState;

        default:
            return state;
    }
};
