import React, { memo } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsItem, { burgerIngredientsItemPropTypes } from '../burger-ingredients-item/burger-ingredients-item';

import styles from './burger-ingredients-group.module.css';

const propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(burgerIngredientsItemPropTypes).isRequired,
    selectedIdsWithCounts: PropTypes.objectOf(PropTypes.number).isRequired
};

const BurgerIngredientsGroup = ({ title, data, selectedIdsWithCounts }) => (
    <li className={styles.group}>
        <h2 className={`${styles.header} text text_type_main-medium`}>
            {title}
        </h2>
        <ul className={styles.list}>
            {data.map(item => (
                <BurgerIngredientsItem
                    key={item._id}
                    data={item}
                    selectedCount={selectedIdsWithCounts[item._id] || 0}
                />
            ))}
        </ul>
    </li>
);

BurgerIngredientsGroup.propTypes = propTypes;
export default memo(BurgerIngredientsGroup);