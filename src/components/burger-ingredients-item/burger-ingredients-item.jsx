import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import './burger-ingredients-item.css';

export const burgerIngredientsItemPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});

const propTypes = {
    data: burgerIngredientsItemPropTypes,
    selectedCount: PropTypes.number.isRequired,
};

const BurgerIngredientsItem = ({ selectedCount, data }) => (
    <div className="burger-ingredients-item mr-3 mb-8 ml-3">
        {!!selectedCount && (
            <i className="burger-ingredients-item-count text text_type_digits-default">
                {selectedCount}
            </i>
        )}
        <img
            className="mr-4 mb-1 ml-4"
            src={data.image}
            alt={data.name}
            width="240"
            height="120"
        />
        <p className="burger-ingredients-item-price mb-1 text text_type_digits-default">
            <span className="mr-2">
                {data.price}
            </span>
            <CurrencyIcon type="primary" />
        </p>
        <span className="text text_type_main-default">
            {data.name}
        </span>
    </div>
);

BurgerIngredientsItem.propTypes = propTypes;
export default memo(BurgerIngredientsItem);