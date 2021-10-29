import React, { FC, memo } from 'react'
import { useDrag } from 'react-dnd';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';

export type BurgerIngredientType = 'bun' | 'sauce' | 'main';

export interface IBurgerIngredientsItem {
    _id: string;
    image: string;
    price: number;
    name: string;
    type: BurgerIngredientType;
    key?: string;
    image_large?: string;
    calories?: number;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
};

interface BurgerIngredientsItemProps {
    data: IBurgerIngredientsItem;
    selectedCount: number;
    onOpen: (data: IBurgerIngredientsItem) => void;
};

const BurgerIngredientsItem: FC<BurgerIngredientsItemProps> = ({ selectedCount, data, onOpen }) => {
    const [{ isDragging }, ref] = useDrag({
        type: 'ingredient',
        item: data,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <li
            className={styles.item}
            ref={ref}
            style={{ cursor: 'grabbing', opacity: isDragging ? 0.5 : 1 }}
            onClick={() => onOpen(data)}
        >
            {!!selectedCount && (
                <Counter count={selectedCount} size="default" />
            )}
            <img
                className={styles.image}
                src={data.image}
                alt={data.name}
                width="240"
                height="120"
            />
            <p className={`${styles.price} text text_type_digits-default`}>
                <span className="mr-2">
                    {data.price}
                </span>
                <CurrencyIcon type="primary" />
            </p>
            <span className="text text_type_main-default">
                {data.name}
            </span>
        </li>
    );
};

export default memo(BurgerIngredientsItem);
