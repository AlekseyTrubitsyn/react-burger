import React, { memo, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import { burgerIngredientsItemPropTypes } from '../burger-ingredients-item/burger-ingredients-item';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './burger-ingredients.module.css';

const propTypes = {
    selectedIdsWithCounts: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    data: PropTypes.arrayOf(burgerIngredientsItemPropTypes).isRequired
};

const tabs = [
    {
        id: 'bun',
        name: 'Булки'
    },
    {
        id: 'sauce',
        name: 'Соусы'
    }, {
        id: 'main',
        name: 'Начинки'
    }
];

const defaultModalState = { open: false };

const BurgerIngredients = ({ selectedIdsWithCounts, data }) => {
    const [activeTab, setTab] = useState('bun');
    const [modalState, setModalState] = useState(defaultModalState);

    const tabsWithValues = useMemo(
        () => (
            tabs.map(tab => ({
                ...tab,
                values: data.filter(({ type }) => tab.id === type)
            }))
        ),
        [data]
    );

    const handleChangeTab = useCallback(
        (nextTab) => {
            setTab(nextTab);
        },
        []
    );

    const handleOpenModal = useCallback(
        (id) => {
            const item = data.find(({ _id }) => _id === id);

            if (!item) return;

            setModalState({ open: true, item })
        },
        [data]
    );

    const handleCloseModal = useCallback(
        () => {
            setModalState(defaultModalState);
        },
        []
    );

    return (
        <section>
            <BurgerIngredientsTabs
                activeTab={activeTab}
                tabs={tabs}
                onClick={handleChangeTab}
            />
            <ul className={styles.list}>
                {tabsWithValues.map(tab => (
                    <BurgerIngredientsGroup
                        key={tab.id}
                        title={tab.name}
                        data={tab.values}
                        selectedIdsWithCounts={selectedIdsWithCounts}
                        onOpenDetails={handleOpenModal}
                    />
                ))}
            </ul>
            <IngredientDetails
                {...modalState}
                onClose={handleCloseModal}
            />
        </section>
    );
};

BurgerIngredients.propTypes = propTypes;
export default memo(BurgerIngredients);