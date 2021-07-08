import React, { memo } from 'react'
import PropTypes from 'prop-types'

import IngredientNutritionFact from '../ingredient-nutrition-fact/ingredient-nutrition-fact';

import styles from './ingredient-details.module.css';

export const itemDetailsPropTypes = {
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
};

const propTypes = {
    item: PropTypes.shape(itemDetailsPropTypes),
};

const IngredientDetails = ({ item }) => {
    if (!item) return null;

    return (
        <>
            <img
                className="mb-4"
                src={item.image_large}
                width="480"
                height="240"
                alt={item.name}
            />
            <h2 className="text text_type_main-medium mb-8">
                {item.name}
            </h2>
            <div className={`${styles.nutrition}`}>
                <IngredientNutritionFact
                    text="Калории, ккал"
                    value={item.calories}
                />
                <IngredientNutritionFact
                    text="Белки, г"
                    value={item.proteins}
                />
                <IngredientNutritionFact
                    text="Жиры, г"
                    value={item.fat}
                />
                <IngredientNutritionFact
                    text="Углеводы, г"
                    value={item.carbohydrates}
                />
            </div>
        </>
    );
};

IngredientDetails.propTypes = propTypes;
IngredientDetails.defaultProps = { item: null };
export default memo(IngredientDetails);