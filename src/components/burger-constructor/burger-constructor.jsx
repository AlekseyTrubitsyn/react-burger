import React, { memo, useContext, useMemo } from 'react'

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

import { BurgerContext } from '../app/app';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const { selectedItems } = useContext(BurgerContext);

    const {
        firstElement,
        draggableElements,
        lastElement
    } = useMemo(
        () => ({
            firstElement: selectedItems[0],
            draggableElements: selectedItems.slice(1, -1) || [],
            lastElement: selectedItems.length > 1 ? selectedItems.slice(-1)[0] : null,
        }),
        [selectedItems]
    );

    return (
        <section className={styles.constructor}>
            {!!selectedItems && (
                <ul className={styles.list}>
                    {firstElement && (
                        <BurgerConstructorItem
                            key={`${firstElement._id}_0`}
                            isFirst
                            data={firstElement}
                        />
                    )}

                    <li className={styles.draggable}>
                        <ul>
                            {draggableElements.map(
                                (item, i) => (
                                    <BurgerConstructorItem
                                        key={`${item._id}_${i}`}
                                        data={item}
                                        draggable
                                    />
                                )
                            )}
                        </ul>
                    </li>

                    {lastElement && (
                        <BurgerConstructorItem
                            key={`${lastElement._id}_${selectedItems.length - 1}`}
                            isLast
                            data={lastElement}
                        />
                    )}
                </ul>
            )}
            <BurgerConstructorTotal />
        </section>
    );
};

export default memo(BurgerConstructor);