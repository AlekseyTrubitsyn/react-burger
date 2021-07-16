import React, { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromConstructor } from '../../services/actions/burgerConstructor';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const selectedItems = useSelector(store => store.burgerConstructor.items);

    const {
        topBun,
        draggableElements,
        bottomBun
    } = useMemo(
        () => {
            const buns = [];
            const filling = [];

            selectedItems.forEach(item => {
                if (item.type === 'bun') {
                    buns.push(item);
                } else {
                    filling.push(item);
                };
            });

            return ({
                topBun: buns[0],
                draggableElements: filling,
                bottomBun: buns[1],
            })
        },
        [selectedItems]
    );

    const handleDelete = useCallback(
        (id) => {
            dispatch(deleteFromConstructor(id));
        },
        [dispatch]
    )

    return (
        <section className={styles.constructor}>
            {!!selectedItems && (
                <ul className={styles.list}>
                    {topBun && (
                        <BurgerConstructorItem
                            key={`${topBun._id}_0`}
                            isLocked
                            type='top'
                            data={topBun}
                        />
                    )}

                    <li className={styles.draggable}>
                        <ul>
                            {draggableElements.map(
                                (item, i) => (
                                    <BurgerConstructorItem
                                        index={i}
                                        key={`${item._id}_${i}`}
                                        data={item}
                                        draggable
                                        onDelete={handleDelete}
                                    />
                                )
                            )}
                        </ul>
                    </li>

                    {bottomBun && (
                        <BurgerConstructorItem
                            key={`${bottomBun._id}_${selectedItems.length - 1}`}
                            isLocked
                            type='bottom'
                            data={bottomBun}
                        />
                    )}
                </ul>
            )}
            <BurgerConstructorTotal />
        </section>
    );
};

export default memo(BurgerConstructor);