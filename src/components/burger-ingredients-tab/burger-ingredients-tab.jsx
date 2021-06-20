import React, { memo } from 'react'

import './burger-ingredients-tab.css';

const BurgerIngredientsTab = ({ name, selected}) => (
    <div className={`burger-ingredients-tab p-4 text text_type_main-default ${selected ? 'selected' : ''}`}>
        <span>{name}</span>
    </div>
);

export default memo(BurgerIngredientsTab);
