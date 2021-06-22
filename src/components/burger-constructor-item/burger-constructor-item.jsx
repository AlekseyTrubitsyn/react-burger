import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import {
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

export const burgerConstructorItemPropTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

const propTypes = {
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    draggable: PropTypes.bool,
    data: PropTypes.shape(burgerConstructorItemPropTypes),
};

const BurgerConstructorItem = ({ isFirst, isLast, draggable, data }) => {
    const type = useMemo(
        () => (
            isFirst
                ? 'top'
                : isLast
                    ? 'bottom'
                    : undefined
        ),
        [isFirst, isLast]
    );

    return (
        <li className={styles.item}>
            {!!draggable && (
                <DragIcon type="primary" />
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