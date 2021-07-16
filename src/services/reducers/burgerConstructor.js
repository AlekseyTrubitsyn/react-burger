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
    items: {
        topBun: null,
        main: [],
        bottomBun: null
    },
    itemIds: []
};

const checkIfOrderButtonIsAvailable = items => !!(items.topBun && items.bottomBun);

const calcCountsAndTotals = selectedItemsArray => (
    {
        total: selectedItemsArray.reduce((sum, { price }) => sum + price, 0),
        counts: calcCountsById(selectedItemsArray)
    }
);

const getFlatSelectedItems = items => {
    const { topBun, bottomBun, main } = items || {};

    return [topBun, bottomBun, ...(main || [])].filter(item => !!item);
};

const getNewStateByAdd = ({ state, item }) => {
    const getNewSelectedItems = () => {
        if (item.type === 'bun') {
            return {
                ...state?.items,
                topBun: item,
                bottomBun: item,
            }
        };

        return {
            ...state?.items,
            main: (state?.items?.main || []).concat(item)
        }
    };

    const newSelectedItems = getNewSelectedItems();
    const flatItems = getFlatSelectedItems(newSelectedItems);

    return {
        ...state,
        items: newSelectedItems,
        itemIds: flatItems.map(({ _id }) => _id),
        ...calcCountsAndTotals(flatItems),
        orderButtonIsAvailable: checkIfOrderButtonIsAvailable(newSelectedItems)
    };
};

const getNewStateByDelete = ({ state, index }) => {
    const clonedMain = (state?.items?.main || []).slice();
    clonedMain.splice(index, 1);

    const newSelectedItems = {
        ...state?.items,
        main: clonedMain
    }

    const flatItems = getFlatSelectedItems(newSelectedItems);

    return {
        ...state,
        items: newSelectedItems,
        itemIds: flatItems.map(({ _id }) => _id),
        ...calcCountsAndTotals(flatItems),
        orderButtonIsAvailable: checkIfOrderButtonIsAvailable(newSelectedItems)
    };
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return getNewStateByAdd({ state, item: action.payload });

        case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
            return getNewStateByDelete({ state, index: action.payload });

        case RESET_CONSTRUCTOR:
            return initialState;

        default:
            return state;
    };
};