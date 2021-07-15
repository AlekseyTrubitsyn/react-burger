import React, { useState, useCallback, useEffect, useMemo, useReducer, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateIngredientsList } from '../../services/actions/burgerIngredients';
import { postOrder } from '../../services/actions/orderDetails';

import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import PageTitle from '../page-title/page-title';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import selectedItemsReducer from './selected-items-reducer';

import styles from './app.module.css';

export const BurgerContext = createContext({
    selectedItems: [],
    selectedItemCounts: {},
    selectedItemTotal: 0,
    onOrderClick: () => {}
});

const App = () => {
    const dispatch = useDispatch();

    const [activeTab, setTab] = useState('bun');
    const [orderState, setOrderState] = useState({ loading: true });
    const [itemForIngredientDetails, setItemForIngredientDetails] = useState({});

    const ingredients = useSelector(store => store?.ingredientsData?.ingredients || []);

    const [selectedItemsState, dispatchSelectedItems] = useReducer(
        selectedItemsReducer,
        {
            items: [],
            counts: {},
            total: 0,
        }
    );

    const orderButtonIsAvailable = useMemo(
        () => selectedItemsState.items.some(item => item.type === 'bun'),
        [selectedItemsState.items]
    );

    const initialModalState = useMemo(
        () => ({
            open: false,
            title: '',
            elementName: '',
            props: {}
        }),
        []
    );

    const [modalState, setModalState] = useState(initialModalState);

    const handleDeleteItem = useCallback(
        (index) => {
            dispatchSelectedItems({ type: "delete", payload: index });
        },
        []
    );

    const handleOpenIngredientDetails = useCallback(
        (id) => {
            const item = ingredients.find(({ _id }) => _id === id);

            if (!item) return;

            dispatchSelectedItems({ type: "add", payload: item });
            setItemForIngredientDetails(item);

            setModalState({
                open: true,
                elementName: 'IngredientDetails'
            });
        },
        [ingredients]
    );

    const handleOpenOrderDetails = useCallback(
        async () => {
            if (!orderButtonIsAvailable) return;

            setModalState({
                open: true,
                elementName: 'OrderDetails'
            });

            setOrderState({ loading: true });

            const ids = (selectedItemsState?.items || []).map(({ _id }) => _id);
            dispatch(postOrder(ids));

            setOrderState({ loading: false, orderData: [] })
        },
        [orderButtonIsAvailable, selectedItemsState.items, dispatch]
    );

    const handleCloseModal = useCallback(
        () => {
            setModalState(initialModalState);
            setOrderState({ loading: true });
            setItemForIngredientDetails({});
        },
        [initialModalState]
    );

    useEffect(
        () => {
            dispatch(updateIngredientsList());
        },
        [dispatch]
    );

    return (
        <div className={styles.wrapper}>
            <BurgerContext.Provider value={{
                selectedItems: selectedItemsState.items,
                selectedItemCounts: selectedItemsState.counts,
                selectedItemTotal: selectedItemsState.total,
                orderButtonIsAvailable,
                orderState,
                onDeleteItem: handleDeleteItem,
                onOrderClick: handleOpenOrderDetails
            }}>
                <AppHeader />
                <main className={styles.main}>
                    <PageTitle />
                    <BurgerIngredients
                        selectedIdsWithCounts={selectedItemsState.counts}
                        activeTab={activeTab}
                        onChangeTab={setTab}
                        onOpenIngredientDetails={handleOpenIngredientDetails}
                    />
                    <BurgerConstructor />
                </main>
                <Modal
                    open={modalState.open}
                    title={modalState.title}
                    onClose={handleCloseModal}
                >
                    {modalState.elementName === 'OrderDetails' && (
                        <OrderDetails />
                    )}
                    {modalState.elementName === 'IngredientDetails' && (
                        <IngredientDetails item={itemForIngredientDetails} />
                    )}
                </Modal>
                <div id="react-modals" />
            </BurgerContext.Provider>
        </div>
    );
};

export default App;
