import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    RESET_ORDER
} from '../actions/orderDetails';

const initialState = {
    orderNumber: '',
    postOrderLoading: false,
    postOrderFailed: false
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return {
                ...state,
                postOrderLoading: true,
                postOrderFailed: false,
            };

        case POST_ORDER_SUCCESS:
            return {
                ...state,
                postOrderLoading: false,
                postOrderFailed: false,
                orderNumber: action.orderNumber,
            };

        case POST_ORDER_FAILED:
            return {
                ...state,
                orderNumber: '',
                postOrderLoading: false,
                postOrderFailed: true,
            };

        case RESET_ORDER:
            return initialState;

        default:
            return state;
    }
};