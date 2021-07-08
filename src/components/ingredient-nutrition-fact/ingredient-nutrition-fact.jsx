import React, { memo } from 'react';
import PropTypes from 'prop-types'

import styles from './ingredient-nutrition-fact.module.css';

const propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

const IngredientNutritionFact = ({ text, value }) => (
    <div className={styles.item}>
        <span className="text text_type_main-default text_color_inactive">
            {text}
        </span>
        <span className="text text_type_digits-default text_color_inactive">
            {value}
        </span>
    </div>
);

IngredientNutritionFact.propTypes = propTypes;
export default memo(IngredientNutritionFact);