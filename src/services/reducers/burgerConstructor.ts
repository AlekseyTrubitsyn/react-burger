import { nanoid } from 'nanoid'
import { Reducer } from 'redux';
import { IBurgerIngredientsItem } from '../../components/burger-ingredients-item/burger-ingredients-item';

import { calcCountsById } from '../../utils';

import { BurgerConstructorActionTypes, BurgerConstructorTypeKeys } from '../actions/burgerConstructor';

export interface IBurgerConstructorItems {
    topBun: IBurgerIngredientsItem | null;
    main: IBurgerIngredientsItem[];
    bottomBun: IBurgerIngredientsItem | null;
};

export interface IBurgerConstructorState {
    orderButtonIsAvailable: boolean;
    total: number;
    counts: Record<IBurgerIngredientsItem['_id'], number>,
    items: IBurgerConstructorItems,
    itemIds: string[];
};

export type TBurgerConstructorItemsFlatArray = IBurgerIngredientsItem[];

const initialState: IBurgerConstructorState = {
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

const checkIfOrderButtonIsAvailable = (items: IBurgerConstructorItems) => !!(items.topBun && items.bottomBun);

const calcCountsAndTotals = (selectedItemsArray: TBurgerConstructorItemsFlatArray) => (
    {
        total: selectedItemsArray.reduce((sum, { price }) => sum + price, 0),
        counts: calcCountsById(selectedItemsArray)
    }
);

type TGetFlatSelectedItems = (items: IBurgerConstructorItems) => TBurgerConstructorItemsFlatArray;

const getFlatSelectedItems: TGetFlatSelectedItems = (items) => {
    const { topBun, bottomBun, main } = items || {};

    return [topBun, ...(main || []), bottomBun].filter(item => item != null) as IBurgerIngredientsItem[];
};

interface IGetNewStateByAddParams {
    state: IBurgerConstructorState;
    item: IBurgerIngredientsItem;
};

type TGetNewStateByAdd = (params: IGetNewStateByAddParams) => IBurgerConstructorState;

const getNewStateByAdd: TGetNewStateByAdd = ({ state, item }) => {
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
            main: (state?.items?.main || []).concat({ ...item, key: nanoid() })
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

interface TGetNewStateByDeleteParams {
    state: IBurgerConstructorState;
    index: number;
};

type TGetNewStateByDelete = (params: TGetNewStateByDeleteParams) => IBurgerConstructorState;

const getNewStateByDelete: TGetNewStateByDelete = ({ state, index }) => {
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

interface TGetNewStateByMoveParams {
    state: IBurgerConstructorState;
    fromIndex: number;
    toIndex: number;
};

type TGetNewStateByMove = (params: TGetNewStateByMoveParams) => IBurgerConstructorState;

const getNewStateByMove: TGetNewStateByMove = ({ state, fromIndex, toIndex }) => {
    const newMain = [...state.items.main];
    const itemToMove = newMain.splice(fromIndex, 1)[0];
    newMain.splice(toIndex, 0, itemToMove);

    const newSelectedItems = {
        ...state.items,
        main: newMain,
    };

    const flatItems = getFlatSelectedItems(newSelectedItems);

    return {
        ...state,
        items: newSelectedItems,
        itemIds: flatItems.map(({ _id }) => _id),
    };
};

// type TBurgerIngredientsReducer = (state: IBurgerConstructorState, action: BurgerConstructorTypeKeys) => IBurgerConstructorState;

export const burgerConstructorReducer: Reducer<IBurgerConstructorState, BurgerConstructorActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case BurgerConstructorTypeKeys.ADD:
            return getNewStateByAdd({ state, item: action.payload });

        case BurgerConstructorTypeKeys.DELETE:
            return getNewStateByDelete({ state, index: action.payload });

        case BurgerConstructorTypeKeys.MOVE:
            return getNewStateByMove({ state, ...action.payload })

        case BurgerConstructorTypeKeys.RESET:
            return initialState;

        default:
            return state;
    };
};
