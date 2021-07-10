import { calcCountsById } from '../../utils';

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
            ...calcCountsAndTotals(newSelectedItems)
        };
    };

    const newSelectedItems = [...(state.items || [])].concat(item);

    return {
        ...state,
        items: newSelectedItems,
        ...calcCountsAndTotals(newSelectedItems)
    };
};

const getNewStateByDelete = ({ state, index }) => {
    const newSelectedItems = [...(state.items || [])].splice(index, 1);

    return {
        ...state,
        items: newSelectedItems,
        ...calcCountsAndTotals(newSelectedItems)
    };
};

const selectedItemsReducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return getNewStateByAdd({ state, item: action.payload });

        case 'delete':
            return getNewStateByDelete({ state, index: action.payload });

        default: 
            return state;
    }
};

export default selectedItemsReducer;