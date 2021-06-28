import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Modal from '../modal/modal';
import orderDoneIcon from '../../images/order-done-icon.svg';

import styles from './order-details.module.css';

const propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

const OrderDetails = ({
    open,
    onClose
}) => {
    const [orderId, setOrderId] = useState('');

    useEffect(
        () => {
            setOrderId('034536');
        },
        []
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <h2 className={`${styles.orderId} text text_type_digits-large mt-2 mb-8`}>
                {orderId}
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
        </Modal>
    );
};

OrderDetails.propTypes = propTypes;
export default memo(OrderDetails);