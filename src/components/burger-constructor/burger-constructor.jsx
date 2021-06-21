import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BurgerConstructorItem, { burgerConstructorItemPropTypes } from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

const propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.string,),
    data: PropTypes.objectOf(burgerConstructorItemPropTypes),
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
                            key={firstElement._id}
                            isFirst
                            data={firstElement}
                        />
                    )}
                    
                    {draggableElements.map(itemData => (
                        <BurgerConstructorItem
                            key={itemData._id}
                            data={itemData}
                            draggable
                        />
                    ))}
                    {lastElement && (
                        <BurgerConstructorItem
                            key={lastElement._id}
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