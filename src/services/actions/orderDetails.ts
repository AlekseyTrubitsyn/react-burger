import { postOrderRequest } from '../api';
import { AppDispatch } from '../store';

export enum OrderDetailsTypeKeys {
    REQUEST = 'POST_ORDER_REQUEST',
    SUCCESS = 'POST_ORDER_SUCCESS',
    FAILED = 'POST_ORDER_FAILED',
    RESET = 'RESET_ORDER',
};

export interface IOrderDetailsRequestAction {
    type: OrderDetailsTypeKeys.REQUEST;
}

export interface IOrderDetailsFailedAction {
    type: OrderDetailsTypeKeys.FAILED;
}

export interface IOrderDetailsSuccessAction {
    type: OrderDetailsTypeKeys.SUCCESS;
    orderNumber?: number;
}

export interface IOrderDetailsResetAction {
    type: OrderDetailsTypeKeys.RESET;
}

export type OrderDetailsActionTypes = IOrderDetailsRequestAction
    | IOrderDetailsFailedAction
    | IOrderDetailsSuccessAction
    | IOrderDetailsResetAction;

export const postOrder = (ids: string[]) => async (dispatch: AppDispatch) => {
    dispatch({ type: OrderDetailsTypeKeys.REQUEST });

    const { order, success, hasError } = await postOrderRequest(ids);

    if (hasError || !success) {
        dispatch({ type: OrderDetailsTypeKeys.FAILED });
    } else {
        dispatch({
            type: OrderDetailsTypeKeys.SUCCESS,
            orderNumber: order?.number
        });
    };
};

export const resetOrderDetails = () => ({ type: OrderDetailsTypeKeys.RESET });
