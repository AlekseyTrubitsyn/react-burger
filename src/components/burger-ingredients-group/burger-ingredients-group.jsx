import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsItem, { burgerIngredientsItemPropTypes } from '../burger-ingredients-item/burger-ingredients-item';

import './burger-ingredients-group.css';

const propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(burgerIngredientsItemPropTypes).isRequired,
    selectedItems: PropTypes.objectOf(PropTypes.number).isRequired
};

const BurgerIngredientsGroup = ({ title, data, selectedItems }) => (
    <div className="burger-ingredients-group mb-2">
        <h2 className="text text_type_main-medium mb-6">
            {title}
        </h2>
        {data && data.length
            ? data.map(item => (
                <BurgerIngredientsItem
                    key={item._id}
                    data={item}
                    selectedCount={selectedItems[item._id] || 0}
                />
            ))
            : (
                <p className="text text_type_main-default">
                    Нет данных
                </p>
            )
        }
    </div>
);

BurgerIngredientsGroup.propTypes = propTypes;
export default memo(BurgerIngredientsGroup);