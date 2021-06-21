import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import './burger-ingredients-tabs.css';

const propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    selectedGroupId: PropTypes.string.isRequired,
};

const BurgerIngredientsTabs = ({ tabs, selectedGroupId }) => (
    <div className="burger-ingredients-tabs mb-10">
        {(tabs || []).map(item => (
            <Tab
                key={item.id}
                value={item.id}
                active={selectedGroupId === item.id}
                onClick={() => {}}
            >
                {item.name}
            </Tab>
        ))}
    </div>
);

BurgerIngredientsTabs.propTypes = propTypes;
export default memo(BurgerIngredientsTabs);