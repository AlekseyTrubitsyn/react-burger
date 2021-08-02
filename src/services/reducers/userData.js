import {
    POST_PASSWORD_RESET_REQUEST,
    POST_PASSWORD_RESET_SUCCESS,
    POST_PASSWORD_RESET_FAILED,
    POST_PASSWORD_RESET_CONFIRMATION_REQUEST,
    POST_PASSWORD_RESET_CONFIRMATION_SUCCESS,
    POST_PASSWORD_RESET_CONFIRMATION_FAILED,
} from '../actions/userData';

const initialState = {
    passwordResetLoading: false,
    passwordResetFailed: false,
    passwordResetConfirmationLoading: false,
    passwordResetConfirmationFailed: false,
};

export const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_PASSWORD_RESET_REQUEST:
            return {
                ...state,
                passwordResetLoading: true,
                passwordResetFailed: false,
            };

        case POST_PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                passwordResetLoading: false,
                passwordResetFailed: false,
            };

        case POST_PASSWORD_RESET_FAILED:
            return {
                ...state,
                passwordResetLoading: false,
                passwordResetFailed: true,
            };

        case POST_PASSWORD_RESET_CONFIRMATION_REQUEST:
            return {
                ...state,
                passwordResetConfirmationLoading: true,
                passwordResetConfirmationFailed: false,
            };

        case POST_PASSWORD_RESET_CONFIRMATION_SUCCESS:
            return {
                ...state,
                passwordResetConfirmationLoading: false,
                passwordResetConfirmationFailed: false,
            };

        case POST_PASSWORD_RESET_CONFIRMATION_FAILED:
            return {
                ...state,
                passwordResetConfirmationLoading: false,
                passwordResetConfirmationFailed: true,
            };


        default:
            return state;
    }
};