import React, { FC, memo } from 'react'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-tabs.module.css';

interface IBurgerIngredientsTab {
    id: string;
    name: string;
}

interface IBurgerIngredientsTabsProps {
    tabs: IBurgerIngredientsTab[];
    activeTab: string;
    onClick: (tabName: string) => void;
}

const BurgerIngredientsTabs: FC<IBurgerIngredientsTabsProps> = ({ tabs, activeTab, onClick }) => (
    <nav className={styles.tabs}>
        {tabs.map(item => (
            <Tab
                key={item.id}
                value={item.id}
                active={activeTab === item.id}
                onClick={onClick}
            >
                {item.name}
            </Tab>
        ))}
    </nav>
);

export default memo(BurgerIngredientsTabs);
