import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import { burgerIngredientsItemPropTypes } from '../burger-ingredients-item/burger-ingredients-item';

import './burger-ingredients.css';

const propTypes = {
    selectedItems: PropTypes.arrayOf(burgerIngredientsItemPropTypes),
    data: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.arrayOf(burgerIngredientsItemPropTypes),
            PropTypes.objectOf(burgerIngredientsItemPropTypes),
        ])
    )
};

class BurgerIngredients extends Component {
    state = {
        selectedGroupId: "bun",
        productTypes: [
            {
                id: "bun",
                name: "Булки"
            },
            {
                id: "sauce",
                name: "Соусы"
            },
            {
                id: "main",
                name: "Начинки"
            }
        ]
    };

    static groupSelectedItemsCount = (arr = []) => {
        const result = {};

        arr.forEach(item => {
            result[item._id] = (result[item._id] || 0) + 1;
        });

        return result;
    };

    render() {
        const groupedSelectedItems = BurgerIngredients.groupSelectedItemsCount(this.props.selectedItems);

        return (
            <section className="burger-ingredients">
                <BurgerIngredientsTabs
                    selectedGroupId={this.state.selectedGroupId}
                    tabs={this.state.productTypes}
                />
                <ul className="burger-ingredients-groups">
                    {(this.state.productTypes || []).map(group => (
                        <BurgerIngredientsGroup 
                            key={group.id}
                            title={group.name}
                            data={this.props.data[group.id] || []}
                            selectedItems={groupedSelectedItems}
                        />
                    ))}
                </ul>
            </section>
        );
    };
};

BurgerIngredients.propTypes = propTypes;
export default memo(BurgerIngredients);