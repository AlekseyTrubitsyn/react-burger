import React, { memo } from 'react'

import BurgerIngredientsTab from '../burger-ingredients-tab/burger-ingredients-tab';

import './burger-ingredients-tabs.css';

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

export default memo(BurgerIngredientsTabs);