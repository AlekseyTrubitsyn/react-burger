import { postOrderRequest } from '../api';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const postOrder = (ids) => async (dispatch) => {
    dispatch({
        type: POST_ORDER_REQUEST
    });

    const { order, success, hasError } = await postOrderRequest(ids);

    if (hasError || !success) {
        dispatch({
            type: POST_ORDER_FAILED,
        });
    } else {
        dispatch({
            type: POST_ORDER_SUCCESS,
            orderNumber: order?.number
        });
    };
};