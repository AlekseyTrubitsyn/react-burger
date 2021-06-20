import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BurgerConstructorItem, { burgerConstructorItemPropTypes } from '../burger-constructor-item/burger-constructor-item';
import BurgerConstructorTotal from '../burger-constructor-total/burger-constructor-total';

const propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.string,),
    data: PropTypes.objectOf(burgerConstructorItemPropTypes),
    total: PropTypes.number.isRequired,
};

const BurgerConstructor = ({ selectedItems, total, data }) => (
    <section className="burger-constructor pt-25 pr-4 pl-4">
        {!!selectedItems && (
            <ul className="burger-constructor-list mb-10">
                {(selectedItems || []).map((id, i) => {
                    const itemData = ((data || {})[id] || [])[0];

                    return !!itemData && (
                        <BurgerConstructorItem
                            key={id}
                            data={itemData}
                            draggable={i !== 0}
                        />
                    )}
                )}
            </ul>
        )}
        <BurgerConstructorTotal total={total} />
    </section>
);

BurgerConstructor.propTypes = propTypes;
export default memo(BurgerConstructor);