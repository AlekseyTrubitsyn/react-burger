import React, { memo, useContext } from 'react';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { BurgerContext } from '../app/app';

import styles from './burger-constructor-total.module.css';

const BurgerConstructorTotal = () => {
    const { selectedItemTotal, onOrderClick } = useContext(BurgerContext);

    return (
        <div className={styles.total}>
            <span className="text text_type_digits-medium mr-2">
                {selectedItemTotal}
            </span>
            <CurrencyIcon type="primary" />
            <Button type="primary" size="large" onClick={onOrderClick}>
                Оформить заказ
            </Button>
        </div>
    );
};

export default memo(BurgerConstructorTotal);