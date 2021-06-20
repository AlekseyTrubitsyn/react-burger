import React, { memo } from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import './burger-ingredients-item.css';

const BurgerIngredientsItem = ({ selectedCount, image, price, name }) => (
    <div className="burger-ingredients-item pr-3 pb-8 pl-3">
        {!!selectedCount && (
            <i className="burger-ingredients-item-count">{selectedCount}</i>
        )}
        <img
            className="mr-4 mb-1 ml-4"
            src={image}
            alt={name}
            width="240"
            height="120"
        />
        <p className="mb-1 text text_type_digits-default">
            <span className="mr-2">
                {price}
            </span>
            <CurrencyIcon type="primary" />
        </p>
        <span className="text text_type_main-default">
            {name}
        </span>
    </div>
);

export default memo(BurgerIngredientsItem);