import React from 'react'
import { memo } from 'react';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import './burger-ingredients-group.css';

const BurgerIngredientsGroup = ({ title, data }) => (
    <div className="burger-ingredients-group mb-2">
        <h2 className="text text_type_main-medium mb-6">
            {title}
        </h2>
        {data && data.length
            ? data.map(item => (
                <BurgerIngredientsItem
                    key={item.id}
                    {...item}
                />
            ))
            : (
                <p className="text text_type_main-default">
                    Нет данных
                </p>
            )
        }
    </div>
);

export default memo(BurgerIngredientsGroup);