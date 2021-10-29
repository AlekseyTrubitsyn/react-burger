import React, { FC, memo } from 'react';

import styles from './ingredient-nutrition-fact.module.css';

interface IIngredientNutritionFactProps {
    text: string;
    value: number;
};

const IngredientNutritionFact: FC<IIngredientNutritionFactProps> = ({ text, value }) => (
    <div className={styles.item}>
        <span className="text text_type_main-default text_color_inactive">
            {text}
        </span>
        <span className="text text_type_digits-default text_color_inactive">
            {value}
        </span>
    </div>
);

export default memo(IngredientNutritionFact);