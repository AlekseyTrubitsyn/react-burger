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
};

const propTypes = {
    data: burgerConstructorItemPropTypes,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    draggable: PropTypes.bool,
};

const BurgerConstructorItem = ({ isFirst, isLast, draggable, data }) => {
    let type = isFirst
        ? 'top'
        : isLast
            ? 'bottom'
            : undefined;

    return (
        <div className="burger-constructor-item pl-8 mb-4">
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
        </div>
    );
};

BurgerConstructorItem.propTypes = propTypes;

BurgerConstructorItem.defaultProps = {
    isFirst: false,
    isLast: false,
    draggable: false
};

export default memo(BurgerConstructorItem);