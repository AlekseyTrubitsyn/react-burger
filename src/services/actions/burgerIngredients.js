import { getIngredientsRequest } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const updateIngredientsList = () => async (dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });

    const { data, success, hasError } = await getIngredientsRequest();

    if (hasError || !success) {
        dispatch({
            type: GET_INGREDIENTS_FAILED
        });
    } else {
        dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data
        });
    };
};