import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { calcCountsById } from '../../utils';

import AppHeader from '../app-header/app-header';

import PageTitle from '../page-title/page-title';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import Modal from '../modal/modal';

import styles from './app.module.css';

const defaultSelectedIds = [
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733ce',
    '60d3b41abdacab0026a733c9',
    '60d3b41abdacab0026a733d1',
    '60d3b41abdacab0026a733d0',
    '60d3b41abdacab0026a733d0',
    '60d3b41abdacab0026a733c6'
];

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
    const [data, setData] = useState([]);
    const [selectedIdsWithCounts, setSelectedIdsWithCounts] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [activeTab, setTab] = useState('bun');

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

    const handleOpenIngredientDetails = useCallback(
        (id) => {
            const item = data.find(({ _id }) => _id === id);

            if (!item) return;

            setModalState({
              open: true,
              elementName: 'IngredientDetails',
              props: { item }
            });
        },
        [data]
    );

    const handleOpenOrderDetails = useCallback(
        () => {
            setModalState({
                open: true,
                elementName: 'OrderDetails'
            });
        },
        []
    );

    const handleCloseModal = useCallback(
        () => {
            setModalState(initialModalState);
        },
        [initialModalState]
    );

    useEffect(
        () => {
            const selectedItems = defaultSelectedIds
                .map(id => data.find(({ _id }) => id === _id))
                .filter(item => !!item);

            setSelectedItems(selectedItems);
            setTotal(selectedItems.reduce((sum, { price }) => sum + price, 0))
            setSelectedIdsWithCounts(calcCountsById(defaultSelectedIds));
        },
        [data]
    );

    const init = useCallback(
        async () => {
            fetch(URL)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(response.status);
                })
                .then(json => {
                    const { data } = json || {};

                    setData(data);
                })
                .catch(e => {
                    console.error(`Не удалось получить данные. Статус: ${e}`);
                })
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
            <AppHeader />
            <main className={styles.main}>
                <PageTitle />
                <BurgerIngredients
                    selectedIdsWithCounts={selectedIdsWithCounts}
                    data={data}
                    activeTab={activeTab}
                    onChangeTab={setTab}
                    onOpenIngredientDetails={handleOpenIngredientDetails}
                />
                <BurgerConstructor
                    selectedItems={selectedItems}
                    total={total}
                    onOrderClick={handleOpenOrderDetails}
                />
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
        </div>
    );
};

export default App;
