import React, { memo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';

import { showIngredientDetails } from '../../services/actions/modal';

import BurgerIngredientsItem, { burgerIngredientsItemPropTypes } from '../burger-ingredients-item/burger-ingredients-item';

import styles from './burger-ingredients-group.module.css';

const propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(burgerIngredientsItemPropTypes).isRequired,
    selectedIdsWithCounts: PropTypes.objectOf(PropTypes.number).isRequired,
    onShowInViewport: PropTypes.func.isRequired,
};

const BurgerIngredientsGroup = ({
    id,
    title,
    data,
    selectedIdsWithCounts,
    onShowInViewport
}) => {
    const { ref, inView } = useInView({ threshold: 0.3, delay: 200 });

    const dispatch = useDispatch();

    const handleOpen = useCallback(
        (item) => {
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
                {data.map(item => (
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

BurgerIngredientsGroup.propTypes = propTypes;
export default memo(BurgerIngredientsGroup);