import { IBurgerIngredientsItem } from '../../components/burger-ingredients-item/burger-ingredients-item';
import { getIngredientsRequest } from '../api';
import { AppDispatch } from '../store';

export enum BurgerIngredientsTypeKeys {
    REQUEST = 'GET_INGREDIENTS_REQUEST',
    SUCCESS = 'GET_INGREDIENTS_SUCCESS',
    FAILED = 'GET_INGREDIENTS_FAILED',
}

export interface IGetIngredientsRequestAction {
    type: BurgerIngredientsTypeKeys.REQUEST;
};

export interface IGetIngredientsSuccessAction {
    type: BurgerIngredientsTypeKeys.SUCCESS;
    ingredients: IBurgerIngredientsItem[];
};

export interface IGetIngredientsFailedAction {
    type: BurgerIngredientsTypeKeys.FAILED;
};

export type BurgerIngredientsActionTypes = IGetIngredientsRequestAction | IGetIngredientsSuccessAction | IGetIngredientsFailedAction;

export const updateIngredientsList = () => async (dispatch: AppDispatch) => {
    dispatch<IGetIngredientsRequestAction>({ type: BurgerIngredientsTypeKeys.REQUEST });

    const { data, success, hasError } = await getIngredientsRequest();

    if (hasError || !success) {
        dispatch<IGetIngredientsFailedAction>({ type: BurgerIngredientsTypeKeys.FAILED });
    } else {
        dispatch<IGetIngredientsSuccessAction>({
            type: BurgerIngredientsTypeKeys.SUCCESS,
            ingredients: data
        });
    };
};
