import React, { FC, memo, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';

import { openModal } from '../../services/actions/modal';
import { AppDispatch } from '../../services/store';

import { THandleShowInViewport } from '../burger-ingredients/burger-ingredients';
import BurgerIngredientsItem, { IBurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';
import { showIngredientDetails } from '../../services/actions/ingredientDetails';

import styles from './burger-ingredients-group.module.css';

interface BurgerIngredientsGroupProps {
    id: string;
    title: string;
    data: IBurgerIngredientsItem[];
    selectedIdsWithCounts: { [key: string]: number };
    onShowInViewport: THandleShowInViewport;
};

const BurgerIngredientsGroup: FC<BurgerIngredientsGroupProps> = ({
    id,
    title,
    data,
    selectedIdsWithCounts,
    onShowInViewport
}) => {
    const { ref, inView } = useInView({ threshold: 0.3, delay: 200 });

    const dispatch = useDispatch<AppDispatch>();

    const handleOpen = useCallback(
        (item) => {
            dispatch(
                openModal({
                    elementName: 'IngredientDetails',
                    title: 'Детали ингредиента'
                })
            );

            dispatch(showIngredientDetails(item));
        },
        [dispatch]
    );

    useEffect(
        () => {
            onShowInViewport(id, inView);
        },
        [inView, onShowInViewport, id]
    );

    return (
        <li className={styles.group} ref={ref}>
            <h2 className={`${styles.header} text text_type_main-medium`}>
                {title}
            </h2>
            <ul className={styles.list}>
                {data.map((item: IBurgerIngredientsItem) => (
                    <BurgerIngredientsItem
                        key={item._id}
                        data={item}
                        selectedCount={selectedIdsWithCounts[item._id] || 0}
                        onOpen={handleOpen}
                    />
                ))}
            </ul>
        </li>
    );
};

export default memo(BurgerIngredientsGroup);
