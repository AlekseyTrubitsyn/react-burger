import React, { Component, memo } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import { burgerIngredientsItemPropTypes } from '../burger-ingredients-item/burger-ingredients-item';

const propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.objectOf(PropTypes.arrayOf(burgerIngredientsItemPropTypes))
};

class BurgerIngredients extends Component {
    state = {
        selectedGroupId: "buns",
        groups: [
            {
                id: "buns",
                name: "Булки"
            },
            {
                id: "sauces",
                name: "Соусы"
            },
            {
                id: "main",
                name: "Начинки"
            }
        ]
    };

    static groupSelectedItemsCount = (arr) => {
        const result = {};

        (arr || []).forEach(id => {
            result[id] = (result[id] || 0) + 1;
        })

        return result;
    };

    render() {
        const groupedSelectedItems = BurgerIngredients.groupSelectedItemsCount(this.props.selectedItems);

        return (
            <div className="burger-ingredients">
                <BurgerIngredientsTabs
                    selectedGroupId={this.state.selectedGroupId}
                    tabs={this.state.groups}
                />
                {(this.state.groups || []).map(group => (
                    <BurgerIngredientsGroup
                        key={group.id}
                        title={group.name}
                        data={this.props.data[group.id] || []}
                        selectedItems={groupedSelectedItems}
                    />
                ))}
            </div>
        );
    };
};

BurgerIngredients.propTypes = propTypes;
export default memo(BurgerIngredients);