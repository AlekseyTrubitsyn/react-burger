import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postOrderAndShowOrderDetails } from '../../services/actions/modal';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-total.module.css';

const BurgerConstructorTotal = () => {
    const dispatch = useDispatch();

    const {
        total,
        itemIds
    } = useSelector(store => ({
        total: store.burgerConstructor.total,
        itemIds: store.burgerConstructor.itemIds
    }));

    const handleOrderClick = useCallback(
        () => {
            dispatch(postOrderAndShowOrderDetails(itemIds));
        },
        [dispatch, itemIds]
    )
    return (
        <div className={styles.total}>
            <span className="text text_type_digits-medium mr-2">
                {total}
            </span>
            <CurrencyIcon type="primary" />
            <Button type="primary" size="large" onClick={handleOrderClick}>
                Оформить заказ
            </Button>
        </div>
    );
};

export default memo(BurgerConstructorTotal);