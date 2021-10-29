import React, { memo } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '../../services/store';

import orderDoneIcon from '../../images/order-done-icon.svg';

import styles from './order-details.module.css';

const OrderDetails = () => {
    const { postOrderLoading, postOrderFailed, orderNumber } = useSelector((store: RootState) => ({
        postOrderLoading: store?.orderData.postOrderLoading,
        postOrderFailed: store?.orderData.postOrderFailed,
        orderNumber: store?.orderData.orderNumber,
    }));

    if (postOrderLoading) {
        return (
            <h2 className="text text_type_main-medium m-15">
                Отправляем заказ
            </h2>
        );
    };

    if (postOrderFailed) {
        return (
            <h2 className="text text_type_main-medium m-15">
                Что-то пошло не так.. Попробуйте снова
            </h2>
        );
    };

    return (
        <>
            <h2 className={`${styles.orderId} text text_type_digits-large mt-2 mb-8`}>
                {orderNumber || 'без номера'}
            </h2>
            <p className="text text_type_main-medium mb-15">
                идентификатор заказа
            </p>
            <img
                className="mb-15"
                src={orderDoneIcon}
                alt="Заказ принят"
                width="107"
                height="102"
            />
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-15">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    );
};

export default memo(OrderDetails);