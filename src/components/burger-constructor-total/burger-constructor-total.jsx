import React, { memo, useContext } from 'react';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-total.module.css';
import { BurgerContext } from '../app/app';

const BurgerConstructorTotal = () => {
    const { total, onOrderClick } = useContext(BurgerContext);

    return (
        <div className={styles.total}>
            <span className="text text_type_digits-medium mr-2">
                {total}
            </span>
            <CurrencyIcon type="primary" />
            <Button type="primary" size="large" onClick={onOrderClick}>
                Оформить заказ
            </Button>
        </div>
    );
};

export default memo(BurgerConstructorTotal);