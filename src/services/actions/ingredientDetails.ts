import { IBurgerIngredientsItem } from '../../components/burger-ingredients-item/burger-ingredients-item';

export enum IngredientDetailsTypeKeys {
    SHOW = 'SHOW_INGREDIENT_DETAILS',
    RESET = 'RESET_INGREDIENT_DETAILS',
}

export interface IShowIngredientDetailsAction {
    type: IngredientDetailsTypeKeys.SHOW;
    payload: IBurgerIngredientsItem;
};

export interface IResetIngredientDetailsAction {
    type: IngredientDetailsTypeKeys.RESET;
};

export type IngredientDetailsActionTypes = IShowIngredientDetailsAction | IResetIngredientDetailsAction;

export const showIngredientDetails = (details: IBurgerIngredientsItem) => (
    {
        type: IngredientDetailsTypeKeys.SHOW,
        payload: details
    }
);

export const resetIngredientDetails = () => ({ type: IngredientDetailsTypeKeys.RESET });