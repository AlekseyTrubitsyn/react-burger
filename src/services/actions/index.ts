import { BurgerConstructorActionTypes } from './burgerConstructor';
import { BurgerIngredientsActionTypes } from './burgerIngredients';
import { IngredientDetailsActionTypes } from './ingredientDetails';
import { ModalActionTypes } from './modal';
import { OrderDetailsActionTypes } from './orderDetails';

export type ActionTypes = BurgerConstructorActionTypes
  | BurgerIngredientsActionTypes
  | IngredientDetailsActionTypes
  | ModalActionTypes
  | OrderDetailsActionTypes;
