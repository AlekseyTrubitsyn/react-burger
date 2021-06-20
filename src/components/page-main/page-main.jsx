import React, { Component } from 'react'
import PropTypes from 'prop-types'

import data from '../../data.json';

import PageTitle from '../page-title/page-title';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import './page-main.css';

export const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
});

class PageMain extends Component {
    state = {
        selectedItems: [
            '60666c42cc7b410027a1a9b1',
            '60666c42cc7b410027a1a9b9',
            '60666c42cc7b410027a1a9b4',
            '60666c42cc7b410027a1a9bc',
            '60666c42cc7b410027a1a9bb',
            '60666c42cc7b410027a1a9bb',
            '60666c42cc7b410027a1a9b1'
        ],
        total: 610,
        data: {
            bun: [],
            sauce: [],
            main: []
        }
    };

    static groupDataById = (arr) => {
        const result = {};

        (arr || []).forEach(item => {
            result[item._id] = (result[item._id] || []).concat(item);
        });

        return result;
    };

    updateData = () => {
        this.setState({
            data: {
                allGroupedById: PageMain.groupDataById(data),
                bun: data.filter(({ type }) => type === 'bun'),
                sauce: data.filter(({ type }) => type === 'sauce'),
                main: data.filter(({ type }) => type === 'main'),
            }
        })
    };

    componentDidMount() {
        this.updateData();
    }

    render() {
        return (
            <main className="page-main">
                <PageTitle />
                <BurgerIngredients
                    selectedItems={this.state.selectedItems}
                    data={this.state.data}
                />
                <BurgerConstructor
                    selectedItems={this.state.selectedItems}
                    data={this.state.data.allGroupedById}
                    total={this.state.total}
                />
            </main>
        );
    }
};

export default PageMain;