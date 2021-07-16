import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    RESET_CONSTRUCTOR
} from '../actions/burgerConstructor';

import { calcCountsById } from '../../utils';

const initialState = {
    orderButtonIsAvailable: false,
    total: 0,
    counts: {},
    items: [],
    itemIds: []
};

const checkIfOrderButtonIsAvailable = items => (items || []).some(item => item.type === 'bun');

const calcCountsAndTotals = selectedItemsArray => (
    {
        total: selectedItemsArray.reduce((sum, { price }) => sum + price, 0),
        counts: calcCountsById(selectedItemsArray)
    }
);

const getNewStateByAdd = ({ state, item }) => {
    if (item.type === 'bun') {
        const newSelectedItems = [...(state.items || [])]
            .filter(item => item.type !== 'bun')
            .concat([item, item]);

        return {
            ...state,
            items: newSelectedItems,
            itemIds: newSelectedItems.map(({ _id }) => _id),
            ...calcCountsAndTotals(newSelectedItems),
            orderButtonIsAvailable: checkIfOrderButtonIsAvailable(newSelectedItems)
        };
    };

    const newSelectedItems = [...(state.items || [])].concat(item);

    return {
        ...state,
        items: newSelectedItems,
        itemIds: newSelectedItems.map(({ _id }) => _id),
        ...calcCountsAndTotals(newSelectedItems),
        orderButtonIsAvailable: checkIfOrderButtonIsAvailable(newSelectedItems)
    };
};

const getNewStateByDelete = ({ state, idToDelete }) => {
    const newSelectedItems = (state.items || []).filter(({ _id }) => idToDelete !== _id);

    return {
        ...state,
        items: newSelectedItems,
        ...calcCountsAndTotals(newSelectedItems),
        orderButtonIsAvailable: checkIfOrderButtonIsAvailable(newSelectedItems)
    };
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return getNewStateByAdd({ state, item: action.payload });

        case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
            return getNewStateByDelete({ state, idToDelete: action.payload });

        case RESET_CONSTRUCTOR:
            return initialState;

        default:
            return state;
    };
};