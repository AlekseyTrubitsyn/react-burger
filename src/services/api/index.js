import fetchData from "../../utils/fetchData";

const getDataURL = 'https://norma.nomoreparties.space/api/ingredients';
const postOrderURL = 'https://norma.nomoreparties.space/api/orders';

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