import { IBurgerIngredientsItem } from '../../components/burger-ingredients-item/burger-ingredients-item';
import { AppDispatch } from '../store';

export enum BurgerConstructorTypeKeys {
    ADD = 'ADD_INGREDIENT_TO_CONSTRUCTOR',
    DELETE = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR',
    RESET = 'RESET_CONSTRUCTOR',
    MOVE = 'MOVE_INGREDIENT'
}

export interface IDeleteFromConstructorAction {
    type: BurgerConstructorTypeKeys.DELETE;
    payload: number;
}

export interface IAddToConstructorAction {
    type: BurgerConstructorTypeKeys.ADD;
    payload: IBurgerIngredientsItem;
}

export interface IMoveFillerInConstructorProps {
    fromIndex: number;
    toIndex: number;
}

export interface IMoveFillerInConstructorAction {
    type: BurgerConstructorTypeKeys.MOVE;
    payload: IMoveFillerInConstructorProps;
}

export interface IResetConstructorAction {
    type: BurgerConstructorTypeKeys.RESET;
}

export type BurgerConstructorActionTypes = IDeleteFromConstructorAction
    | IAddToConstructorAction
    | IMoveFillerInConstructorAction
    | IResetConstructorAction;

export const addToConstructor = (item: IBurgerIngredientsItem) => (dispatch: AppDispatch) => (
    dispatch<IAddToConstructorAction>({ type: BurgerConstructorTypeKeys.ADD, payload: item })
);

export const deleteFromConstructor = (index: number) => (dispatch: AppDispatch) => (
    dispatch<IDeleteFromConstructorAction>({ type: BurgerConstructorTypeKeys.DELETE, payload: index })
);

export const moveFillerInConstructor = ({ fromIndex, toIndex }: IMoveFillerInConstructorProps) => (dispatch: AppDispatch) => (
    dispatch<IMoveFillerInConstructorAction>({ type: BurgerConstructorTypeKeys.MOVE, payload: { fromIndex, toIndex } })
);

export const resetConstructor = () => ({ type: BurgerConstructorTypeKeys.RESET })