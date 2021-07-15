import React, { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';

import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';

import styles from './burger-ingredients.module.css';
import { showIngredientDetails } from '../../services/actions/modal';

const propTypes = {
    selectedIdsWithCounts: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    activeTab: PropTypes.string.isRequired,
    onChangeTab: PropTypes.func.isRequired,
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

const BurgerIngredients = ({ activeTab, onChangeTab }) => {
    const dispatch = useDispatch();

    const {
        ingredients,
        selectedIdsWithCounts
    } = useSelector(store => ({
        ingredients: store.ingredientsData?.ingredients,
        selectedIdsWithCounts: store.burgerConstructor?.counts,
    }));

    const tabsWithValues = useMemo(
        () => (
            tabs.map(tab => ({
                ...tab,
                values: ingredients.filter(({ type }) => tab.id === type)
            }))
        ),
        [ingredients]
    );

    const handleOpenIngredientDetails = useCallback(
        (id) => {
            const item = ingredients.find(({ _id }) => _id === id);

            if (!item) return;

            dispatch(showIngredientDetails(item));
        },
        [ingredients, dispatch]
    );

    const handleChangeTab = useCallback(
        (nextTab) => {
            onChangeTab(nextTab);
        },
        [onChangeTab]
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
                        onOpenIngredientDetails={handleOpenIngredientDetails}
                    />
                ))}
            </ul>
        </section>
    );
};

BurgerIngredients.propTypes = propTypes;
export default memo(BurgerIngredients);