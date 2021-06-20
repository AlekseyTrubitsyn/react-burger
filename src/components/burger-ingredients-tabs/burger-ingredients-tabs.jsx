import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab';

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
            <BurgerIngredientsTab
                key={item.id}
                name={item.name}
                selected={item.id === selectedGroupId}
            />
        ))}
    </div>
);

BurgerIngredientsTabs.propTypes = propTypes;
export default memo(BurgerIngredientsTabs);