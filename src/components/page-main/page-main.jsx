import React, { useEffect, useState } from 'react'

import data from '../../data.json';

import PageTitle from '../page-title/page-title';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import styles from './page-main.module.css';
import { calcCountsById } from '../../utils';

const defaultSelectedIds = [
    '60666c42cc7b410027a1a9b1',
    '60666c42cc7b410027a1a9b9',
    '60666c42cc7b410027a1a9b4',
    '60666c42cc7b410027a1a9bc',
    '60666c42cc7b410027a1a9bb',
    '60666c42cc7b410027a1a9bb',
    '60666c42cc7b410027a1a9b1'
];

const PageMain = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedIdsWithCounts, setSelectedIdsWithCounts] = useState({});

    useEffect(
        () => {
            const selectedItems = defaultSelectedIds
                .map(id => data.find(({ _id }) => id === _id))
                .filter(item => !!item);

            setSelectedItems(selectedItems);
            setTotal(selectedItems.reduce((sum, { price }) => sum + price, 0))
            setSelectedIdsWithCounts(calcCountsById(defaultSelectedIds));
        },
        []
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