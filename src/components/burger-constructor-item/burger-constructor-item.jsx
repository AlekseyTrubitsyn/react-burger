import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
    DragIcon,
    CurrencyIcon,
    LockIcon,
    DeleteIcon
} from '@ya.praktikum/react-developer-burger-ui-components'; 

import './burger-constructor-item.css';

export const burgerConstructorItemPropTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

const propTypes = {
    data: burgerConstructorItemPropTypes,
    draggable: PropTypes.bool.isRequired,
};

const BurgerConstructorItem = ({ draggable, data }) => (
    <div className="burger-constructor-item pl-8 mb-4">
        {!!draggable && (
            <span className="burger-constructor-item-drag-icon">
                <DragIcon type="primary" />
            </span>
        )}
        <div className="burger-constructor-item-content pt-4 pr-8 pb-4 pl-6">
            <img
                className="mr-5"
                src={data.image}
                alt={data.name}
                width={80}
                height={40}
            />
            <span className="burger-constructor-item-name text text_type_main-default mr-5">
                {data.name}
            </span>
            <span className="text text_type_digits-default mr-2">
                {data.price}
            </span>
            <span className="mr-5">
                <CurrencyIcon type="primary" />
            </span>
            {draggable 
                ? (<LockIcon type="primary" />) // TODO: DeleteIcon падает с ошибкой
                : (<LockIcon  type="secondary" />)
            }
        </div>
    </div>
);

BurgerConstructorItem.propTypes = propTypes;
export default memo(BurgerConstructorItem);