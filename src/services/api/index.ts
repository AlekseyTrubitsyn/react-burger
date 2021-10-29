import { IBurgerIngredientsItem } from "../../components/burger-ingredients-item/burger-ingredients-item";
import fetchData, { IFetchDataResult } from "../../utils/fetchData";

const getDataURL = 'https://norma.nomoreparties.space/api/ingredients';
const postOrderURL = 'https://norma.nomoreparties.space/api/orders';

export interface IPostOrderRequestResult extends IFetchDataResult {
    order: {
        number: number;
    };
};

export type TPostOrderRequest = (ids?: string[]) => Promise<IPostOrderRequestResult>;

export const postOrderRequest: TPostOrderRequest = async (ids = []) => (
    await fetchData<IPostOrderRequestResult>({
        url: postOrderURL,
        params: {
            method: 'POST',
            body: JSON.stringify({
                ingredients: ids
            })
        }
    })
);

export interface IGetIngredientsRequestResult extends IFetchDataResult {
    data: IBurgerIngredientsItem[];
};

export type TGetIngredientsRequest = () => Promise<IGetIngredientsRequestResult>;

export const getIngredientsRequest: TGetIngredientsRequest = async () => (
    await fetchData<IGetIngredientsRequestResult>({ url: getDataURL })
);