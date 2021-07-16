import React, { memo, useCallback } from 'react'
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
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    data: PropTypes.shape(burgerConstructorItemPropTypes).isRequired,
    onDelete: PropTypes.func.isRequired,
};

const BurgerConstructorItem = ({ index, type, isLocked, data, onDelete }) => {
    const handleClose = useCallback(
        () => {
            onDelete(index);
        },
        [onDelete, index]
    );

    return (
        <li className={styles.item}>
            {!isLocked && (
                <DragIcon type="primary" />
            )}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={data.name}
                price={data.price}
                thumbnail={data.image}
                handleClose={handleClose}
            />
        </li>
    );
};

BurgerConstructorItem.propTypes = propTypes;

BurgerConstructorItem.defaultProps = {
    type: undefined,
    isLocked: false
};

export default memo(BurgerConstructorItem);