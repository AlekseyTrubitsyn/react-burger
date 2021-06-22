import React, { memo } from 'react';
import PropTypes from 'prop-types'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-total.module.css';

const propTypes = {
    total: PropTypes.number.isRequired,
};

const BurgerConstructorTotal = ({ total }) => (
    <div className={styles.total}>
        <span className="text text_type_digits-medium mr-2">
            {total}
        </span>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="large">
            Оформить заказ
        </Button>
    </div>
);

BurgerConstructorTotal.propTypes = propTypes;
export default memo(BurgerConstructorTotal);