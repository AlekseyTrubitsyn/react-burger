import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsItem, { burgerIngredientsItemPropTypes } from '../burger-ingredients-item/burger-ingredients-item';

import styles from './burger-ingredients-group.module.css';
import { useInView } from 'react-intersection-observer';

const propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(burgerIngredientsItemPropTypes).isRequired,
    selectedIdsWithCounts: PropTypes.objectOf(PropTypes.number).isRequired,
    onOpenIngredientDetails: PropTypes.func.isRequired,
};

const BurgerIngredientsGroup = ({
    id,
    title,
    data,
    selectedIdsWithCounts,
    onShowInViewport,
    onOpenIngredientDetails
}) => {
    const { ref, inView } = useInView({ threshold: 0.3, delay: 200 });

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
                {data.map(item => (
                    <BurgerIngredientsItem
                        key={item._id}
                        data={item}
                        selectedCount={selectedIdsWithCounts[item._id] || 0}
                        onOpenIngredientDetails={onOpenIngredientDetails}
                    />
                ))}
            </ul>
        </li>
    );
};

BurgerIngredientsGroup.propTypes = propTypes;
export default memo(BurgerIngredientsGroup);