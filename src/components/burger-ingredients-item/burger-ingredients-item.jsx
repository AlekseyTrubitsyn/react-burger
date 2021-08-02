import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';

export const burgerIngredientsItemPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});

const propTypes = {
    data: burgerIngredientsItemPropTypes.isRequired,
    selectedCount: PropTypes.number.isRequired,
    onOpen: PropTypes.func.isRequired,
};

const BurgerIngredientsItem = ({ selectedCount, data, onOpen }) => {
    const [{ isDragging }, ref] = useDrag({
        type: 'ingredient',
        item: data,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <li
            className={styles.item}
            ref={ref}
            style={{ cursor: 'grabbing', opacity: isDragging ? 0.5 : 1 }}
            onClick={() => onOpen(data)}
        >
            {!!selectedCount && (
                <Counter count={selectedCount} size="default" />
            )}
            <img
                className={styles.image}
                src={data.image}
                alt={data.name}
                width="240"
                height="120"
            />
            <p className={`${styles.price} text text_type_digits-default`}>
                <span className="mr-2">
                    {data.price}
                </span>
                <CurrencyIcon type="primary" />
            </p>
            <span className="text text_type_main-default">
                {data.name}
            </span>
        </li>
    );
};

BurgerIngredientsItem.propTypes = propTypes;
export default memo(BurgerIngredientsItem);