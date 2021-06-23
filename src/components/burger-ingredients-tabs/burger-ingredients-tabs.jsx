import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-tabs.module.css';

const propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const BurgerIngredientsTabs = ({ tabs, activeTab, onClick }) => (
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

BurgerIngredientsTabs.propTypes = propTypes;
export default memo(BurgerIngredientsTabs);