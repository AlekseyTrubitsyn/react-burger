import React, { FC, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { addToConstructor, deleteFromConstructor, moveFillerInConstructor } from '../../services/actions/burgerConstructor';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';
import { IBurgerIngredientsItem } from '../burger-ingredients-item/burger-ingredients-item';

import styles from './burger-constructor.module.css';
import { AppDispatch, RootState } from '../../services/store';

export type THandleMove = (fromIndex: number, toIndex: number) => void;
export type THandleDrop = (item: IBurgerIngredientsItem) => void;
export type THandleDelete = (index: number) => void;

const BurgerConstructor: FC<{}> = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        topBun,
        main,
        bottomBun
    } = useSelector((store: RootState) => store.burgerConstructor.items);

    const handleMove = useCallback<THandleMove>(
        (fromIndex, toIndex) => {
            dispatch(
                moveFillerInConstructor({
                    fromIndex,
                    toIndex
                })
            );
        },
        [dispatch]
    );

    const handleDrop = useCallback<THandleDrop>(
        (item) => {
            dispatch(addToConstructor(item));
        },
        [dispatch]
    );

    const [, ref] = useDrop({
        accept: 'ingredient',
        drop: handleDrop
    });

    const handleDelete = useCallback<THandleDelete>(
        (index) => {
            dispatch(deleteFromConstructor(index));
        },
        [dispatch]
    );

    return (
        <section className={styles['burger-constructor']} ref={ref}>
            <ul className={styles.list}>
                {topBun && (
                    <BurgerConstructorItem
                        key={`top_${topBun._id}`}
                        isLocked
                        type='top'
                        data={topBun}
                    />
                )}

                <li className={styles.draggable}>
                    <ul>
                        {!!(main && main.length) && main.map(
                            (item: IBurgerIngredientsItem, i: number) => (
                                <BurgerConstructorItem
                                    index={i}
                                    key={item._id}
                                    data={item}
                                    draggable
                                    onMove={handleMove}
                                    onDelete={handleDelete}
                                />
                            )
                        )}
                    </ul>
                </li>

                {bottomBun && (
                    <BurgerConstructorItem
                        key={`bottom_${bottomBun._id}`}
                        isLocked
                        type='bottom'
                        data={bottomBun}
                    />
                )}
            </ul>
            <BurgerConstructorTotal />
        </section>
    );
};

export default memo(BurgerConstructor);
