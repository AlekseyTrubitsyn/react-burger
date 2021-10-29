import { Reducer } from "redux";
import { ModalActionTypeKeys, ModalActionTypes } from "../actions/modal";

interface IModalState {
    open: boolean;
    elementName: string;
    title: string;
}

const initialState: IModalState = {
    open: false,
    elementName: '',
    title: ''
};

export const modalReducer: Reducer<IModalState, ModalActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case ModalActionTypeKeys.OPEN:
            return {
                ...state,
                open: true,
                elementName: action.payload?.elementName || '',
                title: action.payload?.title || ''
            };

        case ModalActionTypeKeys.CLOSE:
            return initialState;

        default:
            return state;
    }
};
