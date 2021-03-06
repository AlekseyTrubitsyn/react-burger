import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';

import styles from './burger-ingredients.module.css';

const propTypes = {
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
    const {
        ingredients,
        selectedIdsWithCounts
    } = useSelector(store => ({
        ingredients: store.ingredientsData?.ingredients,
        selectedIdsWithCounts: store.burgerConstructor?.counts,
    }));

    const [currentTabInView, setCurrentTabInView] = useState('bun');
    const [, setVisibilityState] = useState({});

    const tabsWithValues = useMemo(
        () => (
            tabs.map(tab => ({
                ...tab,
                values: ingredients.filter(({ type }) => tab.id === type)
            }))
        ),
        [ingredients]
    );

    const handleChangeTab = useCallback(
        (nextTab) => {
            onChangeTab(nextTab);
        },
        [onChangeTab]
    );

    const handleShowInViewport = useCallback(
        (tabId, isInView) => {
            const findFirstVisibleTab = visibility => tabs.find(
                ({ id }) => !!visibility[id]
            );

            setVisibilityState(s => {
                const newState = {
                    ...s,
                    [tabId]: !!isInView
                };

                const tabInView = findFirstVisibleTab(newState);

                if (tabInView) {
                    setCurrentTabInView(tabInView.id);
                }

                return newState;
            });
        },
        []
    );

    useEffect(
        () => {
            onChangeTab(currentTabInView);
        },
        [currentTabInView, onChangeTab]
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
                        id={tab.id}
                        title={tab.name}
                        data={tab.values}
                        selectedIdsWithCounts={selectedIdsWithCounts}
                        onShowInViewport={handleShowInViewport}
                    />
                ))}
            </ul>
        </section>
    );
};

BurgerIngredients.propTypes = propTypes;
export default memo(BurgerIngredients);