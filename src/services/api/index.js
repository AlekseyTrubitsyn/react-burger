import fetchData from "../../utils/fetchData";

const getDataURL = 'https://norma.nomoreparties.space/api/ingredients';
const postOrderURL = 'https://norma.nomoreparties.space/api/orders';
const postRegisterNewUserURL = 'https://norma.nomoreparties.space/api/auth/register';
const postLoginURL = 'https://norma.nomoreparties.space/api/auth/login';
const postLogoutURL = 'https://norma.nomoreparties.space/api/auth/logout';
const postRefreshTokenURL = 'https://norma.nomoreparties.space/api/auth/token';
const postPasswordPreResetURL = 'https://norma.nomoreparties.space/api/password-reset';
const postPasswordResetConfirmationURL = 'https://norma.nomoreparties.space/api/password-reset/reset';

export const postOrderRequest = async (ids = []) => (
    await fetchData({
        url: postOrderURL,
        params: {
            method: 'POST',
            body: JSON.stringify({
                ingredients: ids
            })
        }
    })
);

export const getIngredientsRequest = async () => await fetchData({ url: getDataURL });

export const postRegisterNewUser = async (params) => (
    await fetchData({
        url: postRegisterNewUserURL,
        params: {
            method: 'POST',
            body: JSON.stringify(params)
        }
    })
);

export const postLogin = async (params) => (
    await fetchData({
        url: postLoginURL,
        params: {
            method: 'POST',
            body: JSON.stringify(params)
        }
    })
);

export const postLogout = async (params) => (
    await fetchData({
        url: postLogoutURL,
        params: {
            method: 'POST',
            body: JSON.stringify(params)
        }
    })
);

export const postRefreshToken = async (params) => (
    await fetchData({
        url: postRefreshTokenURL,
        params: {
            method: 'POST',
            body: JSON.stringify(params)
        }
    })
);

export const postPasswordPreResetRequest = async (email) => (
    await fetchData({
        url: postPasswordPreResetURL,
        params: {
            method: 'POST',
            body: JSON.stringify({ email })
        }
    })
);

export const postPasswordResetConfirmationRequest = async ({ newPassword, code }) => (
    await fetchData({
        url: postPasswordResetConfirmationURL,
        params: {
            method: 'POST',
            body: JSON.stringify({
                password: newPassword,
                token: code,
            })
        }
    })
);