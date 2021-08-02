import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postOrderAndShowOrderDetails } from '../../services/actions/modal';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-total.module.css';

const BurgerConstructorTotal = () => {
    const dispatch = useDispatch();

    const {
        total,
        itemIds,
        orderButtonIsAvailable
    } = useSelector(store => store.burgerConstructor);

    const handleOrderClick = useCallback(
        () => {
            if (!orderButtonIsAvailable) return;

            dispatch(postOrderAndShowOrderDetails(itemIds));
        },
        [orderButtonIsAvailable, dispatch, itemIds]
    )
    return (
        <div className={styles.total}>
            <span className="text text_type_digits-medium mr-2">
                {total}
            </span>
            <CurrencyIcon type="primary" />
            <Button
                type="primary"
                size="large"
                onClick={handleOrderClick}
            >
                Оформить заказ
            </Button>
        </div>
    );
};

export default memo(BurgerConstructorTotal);
