import React, { memo } from 'react'
import PropTypes from 'prop-types'

import './burger-ingredients-tab.css';

const propTypes = {
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
};

const BurgerIngredientsTab = ({ name, selected}) => (
    <div className={`burger-ingredients-tab p-4 text text_type_main-default ${selected ? 'selected' : ''}`}>
        <span>{name}</span>
    </div>
);

BurgerIngredientsTab.propTypes = propTypes;
export default memo(BurgerIngredientsTab);
