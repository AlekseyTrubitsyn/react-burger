import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import BurgerConstructorItem, { burgerConstructorItemPropTypes } from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

import styles from './burger-constructor.module.css';

const propTypes = {
    selectedItems: PropTypes.arrayOf(
        PropTypes.shape(burgerConstructorItemPropTypes),
    ).isRequired,
    total: PropTypes.number.isRequired,
};

const BurgerConstructor = ({ selectedItems, total }) => {
    const {
        firstElement,
        draggableElements,
        lastElement
    } = useMemo(
        () => ({
            firstElement: selectedItems[0],
            draggableElements: selectedItems.slice(1, -1) || [],
            lastElement: selectedItems.slice(-1)[0],
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
            <BurgerConstructorTotal total={total} />
        </section>
    );
};

BurgerConstructor.propTypes = propTypes;
export default memo(BurgerConstructor);