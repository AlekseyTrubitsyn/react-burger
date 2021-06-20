import React, { memo } from 'react';
import PropTypes from 'prop-types'

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import './burger-constructor-total.css';

const propTypes = {
    total: PropTypes.number.isRequired,
};

const BurgerConstructorTotal = ({ total }) => (
    <div className="burger-constructor-total">
        <span className="text text_type_digits-medium mr-2">
            {total}
        </span>
        <span className="mr-10">
            <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large">
            Оформить заказ
        </Button>
    </div>
);

BurgerConstructorTotal.propTypes = propTypes;
export default memo(BurgerConstructorTotal);