import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../services/store';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import { BurgerIngredientType } from '../burger-ingredients-item/burger-ingredients-item';

import styles from './burger-ingredients.module.css';

interface BurgerIngredientsProps {
    activeTab: string;
    onChangeTab: (tabName: string) => void;
};

interface ITabs {
    id: BurgerIngredientType;
    name: string;
};

const tabs: ITabs[] = [
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

type TVisibilityObject = Record<BurgerIngredientType, boolean>;

const initialVisibilityState = tabs.reduce(
    (result, item) => ({
        ...result,
        [item.id]: false
    }),
    {}
) as TVisibilityObject;

export type THandleShowInViewport = (tabId: string, isInView: boolean) => void;

const BurgerIngredients: FC<BurgerIngredientsProps> = ({ activeTab, onChangeTab }) => {
    const {
        ingredients,
        selectedIdsWithCounts
    } = useSelector((store: RootState) => ({
        ingredients: store.ingredientsData?.ingredients || [],
        selectedIdsWithCounts: store.burgerConstructor?.counts || [],
    }));

    const [currentTabInView, setCurrentTabInView] = useState('bun');
    const [, setVisibilityState] = useState<TVisibilityObject>(initialVisibilityState);

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

    const handleShowInViewport = useCallback<THandleShowInViewport>(
        (tabId, isInView) => {
            const findFirstVisibleTab = (visibility: TVisibilityObject) => (
                tabs.find(({ id }) => !!visibility[id])
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

export default memo(BurgerIngredients);
