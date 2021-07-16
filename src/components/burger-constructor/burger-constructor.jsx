import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { addToConstructor, deleteFromConstructor } from '../../services/actions/burgerConstructor';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const {
        topBun,
        main,
        bottomBun
    } = useSelector(store => store.burgerConstructor.items);

    const handleDrop = useCallback(
        (item) => {
            dispatch(addToConstructor(item));
        },
        [dispatch]
    );

    const [, ref] = useDrop({
        accept: 'ingredient',
        drop: handleDrop
    });

    const handleDelete = useCallback(
        (id) => {
            dispatch(deleteFromConstructor(id));
        },
        [dispatch]
    );

    return (
        <section className={styles.constructor} ref={ref}>
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
                        {(main || []).map(
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