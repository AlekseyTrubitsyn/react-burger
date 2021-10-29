import { Reducer } from "redux";
import { OrderDetailsActionTypes, OrderDetailsTypeKeys } from "../actions/orderDetails";

interface IOrderDetailsState {
    orderNumber: number | null;
    postOrderLoading: boolean;
    postOrderFailed: boolean;
}

const initialState = {
    orderNumber: null,
    postOrderLoading: false,
    postOrderFailed: false
};

export const orderDetailsReducer: Reducer<IOrderDetailsState, OrderDetailsActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case OrderDetailsTypeKeys.REQUEST:
            return {
                ...state,
                postOrderLoading: true,
                postOrderFailed: false,
            };

        case OrderDetailsTypeKeys.SUCCESS:
            return {
                ...state,
                postOrderLoading: false,
                postOrderFailed: false,
                orderNumber: action.orderNumber ?? null,
            };

        case OrderDetailsTypeKeys.FAILED:
            return {
                ...state,
                orderNumber: null,
                postOrderLoading: false,
                postOrderFailed: true,
            };

        case OrderDetailsTypeKeys.RESET:
            return initialState;

        default:
            return state;
    }
};