import React, { Component } from 'react'

import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';

import data from '../../data.json';

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
        ],
        data: {
            buns: [],
            sauces: [],
            main: []
        }
    };

    updateData = () => {
        this.setState({
            data: {
                buns: data.filter(({ type }) => type === 'bun'),
                sauces: data.filter(({ type }) => type === 'sauce'),
                main: data.filter(({ type }) => type === 'main'),
            }
        })
    };

    componentDidMount() {
        this.updateData();
    }

    render() {
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
                        data={this.state.data[group.id] || []}
                    />
                ))}
            </div>
        );
    };
};

export default BurgerIngredients;