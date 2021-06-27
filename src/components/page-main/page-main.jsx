import React, { useCallback, useEffect, useState } from 'react'

import PageTitle from '../page-title/page-title';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import styles from './page-main.module.css';
import { calcCountsById } from '../../utils';

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

const PageMain = () => {
    const [data, setData] = useState([]);
    const [selectedIdsWithCounts, setSelectedIdsWithCounts] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);

    const init = useCallback(
        async () => {
            fetch(URL)
                .then(response => response.json())
                .then(json => {
                    const { data } = json || {};

                    setData(data);
                })
                .catch(e => {
                    console.log(e);
                })
        },
        []
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

    useEffect(
        () => {
            init();
        },
        [init]
    );

    return (
        <main className={styles.main}>
            <PageTitle />
            <BurgerIngredients
                selectedIdsWithCounts={selectedIdsWithCounts}
                data={data}
            />
            <BurgerConstructor
                selectedItems={selectedItems}
                total={total}
            />
        </main>
    );
};

export default PageMain;