import { setCookie } from '../../utils/cookie';
import { postLogin, postPasswordPreResetRequest, postPasswordResetConfirmationRequest, postRegisterNewUser } from '../api';

export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST';
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILED = 'POST_LOGIN_FAILED';

export const POST_REGISTER_USER_REQUEST = 'POST_PASSWORD_RESET_REQUEST';
export const POST_REGISTER_USER_SUCCESS = 'POST_PASSWORD_RESET_SUCCESS';
export const POST_REGISTER_USER_FAILED = 'POST_PASSWORD_RESET_FAILED';

export const POST_PASSWORD_RESET_REQUEST = 'POST_PASSWORD_RESET_REQUEST';
export const POST_PASSWORD_RESET_SUCCESS = 'POST_PASSWORD_RESET_SUCCESS';
export const POST_PASSWORD_RESET_FAILED = 'POST_PASSWORD_RESET_FAILED';

export const POST_PASSWORD_RESET_CONFIRMATION_REQUEST = 'POST_PASSWORD_PRE_RESET_REQUEST';
export const POST_PASSWORD_RESET_CONFIRMATION_SUCCESS = 'POST_PASSWORD_PRE_RESET_SUCCESS';
export const POST_PASSWORD_RESET_CONFIRMATION_FAILED = 'POST_PASSWORD_PRE_RESET_FAILED';

export const login = (params, callback) => async (dispatch) => {
    dispatch({ type: POST_LOGIN_REQUEST });

    const { success, hasError, ...data } = await postLogin(params);

    if (hasError || !success) {
        dispatch({ type: POST_LOGIN_FAILED });
    } else {
        dispatch({ type: POST_LOGIN_SUCCESS });

        const { accessToken, refreshToken } = data;

        setCookie('token', accessToken, { expires: 20 });
        localStorage.setItem('refreshToken', refreshToken);

        if (callback) callback();
    };
};

export const registerNewUser = (params) => async (dispatch) => {
    dispatch({ type: POST_REGISTER_USER_REQUEST });

    const { success, hasError } = await postRegisterNewUser(params);

    if (hasError || !success) {
        dispatch({ type: POST_REGISTER_USER_FAILED });
    } else {
        dispatch({ type: POST_REGISTER_USER_SUCCESS });
    };
};

export const requestPasswordReset = (email, callback) => async (dispatch) => {
    dispatch({ type: POST_PASSWORD_RESET_REQUEST });

    const { success, hasError } = await postPasswordPreResetRequest(email);

    if (hasError || !success) {
        dispatch({ type: POST_PASSWORD_RESET_FAILED });
    } else {
        dispatch({ type: POST_PASSWORD_RESET_SUCCESS });

        if (callback) {
            callback();
        }
    };
};

export const confirmPasswordReset = (params) => async (dispatch) => {
    dispatch({ type: POST_PASSWORD_RESET_CONFIRMATION_REQUEST });

    const { success, hasError } = await postPasswordResetConfirmationRequest(params);

    if (hasError || !success) {
        dispatch({ type: POST_PASSWORD_RESET_CONFIRMATION_FAILED });
    } else {
        dispatch({ type: POST_PASSWORD_RESET_CONFIRMATION_SUCCESS });
    };
};