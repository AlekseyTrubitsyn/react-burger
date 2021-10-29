import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { openModal } from '../../services/actions/modal';
import { postOrder } from '../../services/actions/orderDetails';
import { AppDispatch, RootState } from '../../services/store';

import styles from './burger-constructor-total.module.css';

const BurgerConstructorTotal = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        total,
        itemIds,
        orderButtonIsAvailable
    } = useSelector((store: RootState) => store.burgerConstructor);

    const handleOrderClick = useCallback(
        () => {
            if (!orderButtonIsAvailable) return;

            dispatch(postOrder(itemIds));
            dispatch(openModal({ elementName: 'OrderDetails' }));
        },
        [orderButtonIsAvailable, dispatch, itemIds]
    );

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
