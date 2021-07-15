import { addToConstructor } from "./burgerConstructor";
import { RESET_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS } from "./ingredientDetails";
import { postOrder, RESET_ORDER } from "./orderDetails";

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const showIngredientDetails = ingredientData => dispatch => {
    dispatch({
        type: OPEN_MODAL,
        payload: {
            elementName: 'IngredientDetails',
            title: 'Детали ингредиента'
        }
    });

    dispatch({ type: SHOW_INGREDIENT_DETAILS, payload: ingredientData })

    dispatch(addToConstructor(ingredientData));
};

export const showOrderDetails = ids => dispatch => {
    dispatch(postOrder(ids));

    dispatch({
        type: OPEN_MODAL,
        payload: {
            elementName: 'OrderDetails'
        }
    });
};

export const closeModal = () => dispatch => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: RESET_ORDER });
    dispatch({ type: RESET_INGREDIENT_DETAILS });
};