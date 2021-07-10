import React, { memo } from 'react'

import orderDoneIcon from '../../images/order-done-icon.svg';

import styles from './order-details.module.css';

const OrderDetails = ({ loading, orderData }) => {
    if (loading) {
        return (
            <h2 className="text text_type_main-medium m-15">
                Отправляем заказ
            </h2>
        );
    };

    if (!orderData.success) {
        return (
            <h2 className="text text_type_main-medium m-15">
                Что-то пошло не так.. Попробуйте снова
            </h2>
        );
    };

    return (
        <>
            <h2 className={`${styles.orderId} text text_type_digits-large mt-2 mb-8`}>
                {orderData?.order?.number || 'без номера'}
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