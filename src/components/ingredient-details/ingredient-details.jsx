import React, { memo } from 'react'
import { useSelector } from 'react-redux';

import IngredientNutritionFact from '../ingredient-nutrition-fact/ingredient-nutrition-fact';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const item = useSelector(store => store.ingredientDetails.item);

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

export default memo(IngredientDetails);