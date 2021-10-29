import { combineReducers } from 'redux';

import { burgerConstructorReducer } from './burgerConstructor';
import { burgerIngredientsReducer } from './burgerIngredients';
import { ingredientDetailsReducer } from './ingredientDetails';
import { modalReducer } from './modal';
import { orderDetailsReducer } from './orderDetails';

export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    ingredientsData: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    modal: modalReducer,
    orderData: orderDetailsReducer
});