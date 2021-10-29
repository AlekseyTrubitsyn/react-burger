export enum ModalActionTypeKeys {
    OPEN = 'OPEN_MODAL',
    CLOSE = 'CLOSE_MODAL',
};

export type TModalContentName = 'OrderDetails' | 'IngredientDetails';

export interface IOpenModalActionPayload {
    elementName: TModalContentName;
    title?: string;
};

export interface IOpenModalAction {
    type: ModalActionTypeKeys.OPEN;
    payload: IOpenModalActionPayload;
};

export interface ICloseModalAction {
    type: ModalActionTypeKeys.CLOSE;
};

export type ModalActionTypes = IOpenModalAction | ICloseModalAction;

export const openModal = (payload: IOpenModalActionPayload) => ({
    type: ModalActionTypeKeys.OPEN,
    payload
});

export const closeModal = () => ({ type: ModalActionTypeKeys.CLOSE });
