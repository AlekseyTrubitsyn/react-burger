import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BurgerConstructorItem, { burgerConstructorItemPropTypes } from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

import './burger-constructor.css';

const propTypes = {
    selectedItems: PropTypes.arrayOf(
        PropTypes.shape(burgerConstructorItemPropTypes),
        ),
    data: PropTypes.objectOf(
        PropTypes.shape(burgerConstructorItemPropTypes),
    ),
    total: PropTypes.number.isRequired,
};

const BurgerConstructor = ({ selectedItems, total, data }) => {
    const firstElement = selectedItems[0];
    const draggableElements = selectedItems.slice(1, -1) || [];
    const lastElement = selectedItems.slice(-1)[0];

    return (
        <section className="burger-constructor pt-25 pr-4 pl-4">
            {!!selectedItems && (
                <ul className="burger-constructor-list mb-10">
                    {firstElement && (
                        <BurgerConstructorItem
                            key={`${firstElement._id}_0`}
                            className="mb-4"
                            isFirst
                            data={firstElement}
                        />
                    )}

                    <li className="burger-constructor-draggable-list-container mb-4">
                        <ul className="burger-constructor-draggable-list">
                            {draggableElements.map((itemData, i, arr) => (
                                <BurgerConstructorItem
                                    key={`${itemData._id}_${i}`}
                                    className={i < arr.length - 1 ? 'mb-4' : ''}
                                    data={itemData}
                                    draggable
                                />
                            ))}
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