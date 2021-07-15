import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const initialState = {
    open: false,
    elementName: ''
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                open: true,
                elementName: action.payload?.elementName,
                title: action.payload?.title
            }

        case CLOSE_MODAL:
            return initialState;

        default:
            return state;
    }
};