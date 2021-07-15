import { combineReducers } from 'redux';

import { burgerIngredientsReducer } from './burgerIngredients';
// import { burgerConstructorReducer } from './burgerConstructor';
// import { ingredientDetailsReducer } from './ingredientDetails';
// import { modalReducer } from './modal';
import { orderDetailsReducer } from './orderDetails';

export const rootReducer = combineReducers({
    ingredientsData: burgerIngredientsReducer,
    // burgerConstructorReducer,
    // ingredientDetailsReducer,
    // modalReducer,
    orderData: orderDetailsReducer
});