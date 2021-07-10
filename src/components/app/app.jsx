import React, { useState, useCallback, useEffect, useMemo, useReducer, createContext } from 'react';

import selectedItemsReducer from './selected-items-reducer';

import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import PageTitle from '../page-title/page-title';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import fetchData from '../../utils/fetchData';

import styles from './app.module.css';

const getDataURL = 'https://norma.nomoreparties.space/api/ingredients';
const postOrderURL = 'https://norma.nomoreparties.space/api/orders';

export const BurgerContext = createContext({
    selectedItems: [],
    selectedItemCounts: {},
    selectedItemTotal: 0,
    onOrderClick: () => {}
});

const App = () => {
    const [data, setData] = useState([]);
    const [activeTab, setTab] = useState('bun');
    const [orderState, setOrderState] = useState({ loading: true });

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
            const item = data.find(({ _id }) => _id === id);

            if (!item) return;

            dispatchSelectedItems({ type: "add", payload: item });

            setModalState({
                open: true,
                elementName: 'IngredientDetails',
                props: { item }
            });
        },
        [data]
    );

    const handleOpenOrderDetails = useCallback(
        async () => {
            if (!orderButtonIsAvailable) return;

            setModalState({
                open: true,
                elementName: 'OrderDetails'
            });

            setOrderState({ loading: true });

            const orderData = await fetchData({
                url: postOrderURL,
                params: {
                    method: 'POST',
                    body: JSON.stringify({
                        ingredients: (selectedItemsState.items.map(({ _id }) => _id))
                    })
                }
            });

            setOrderState({ loading: false, orderData })
        },
        [orderButtonIsAvailable, selectedItemsState.items]
    );

    const handleCloseModal = useCallback(
        () => {
            setModalState(initialModalState);
        },
        [initialModalState]
    );

    const init = useCallback(
        async () => {
            const { data, success } = await fetchData({ url: getDataURL });

            if (!success) return;

            setData(data);
        },
        []
    );

    useEffect(
        () => {
            init();
        },
        [init]
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
                        data={data}
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
                        <IngredientDetails {...modalState.props} />
                    )}
                </Modal>
                <div id="react-modals" />
            </BurgerContext.Provider>
        </div>
    );
};

export default App;
