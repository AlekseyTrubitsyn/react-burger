import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';

import './burger-constructor-item.css';

export const burgerConstructorItemPropTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

const propTypes = {
    data: PropTypes.shape(burgerConstructorItemPropTypes),
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    draggable: PropTypes.bool,
};

const BurgerConstructorItem = ({ className, isFirst, isLast, draggable, data }) => {
    let type = isFirst
        ? 'top'
        : isLast
            ? 'bottom'
            : undefined;

    return (
        <li className={`burger-constructor-item pl-8 ${className || ''}`}>
            {!!draggable && (
                <span className="burger-constructor-item-drag-icon">
                    <DragIcon type="primary" />
                </span>
            )}
            <ConstructorElement
                type={type}
                isLocked={!draggable}
                text={data.name}
                price={data.price}
                thumbnail={data.image}
            />
        </li>
    );
};

BurgerConstructorItem.propTypes = propTypes;

BurgerConstructorItem.defaultProps = {
    isFirst: false,
    isLast: false,
    draggable: false
};

export default memo(BurgerConstructorItem);