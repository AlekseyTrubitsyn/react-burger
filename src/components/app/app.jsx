import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateIngredientsList } from '../../services/actions/burgerIngredients';

import Modal from '../modal/modal';
import AppHeader from '../app-header/app-header';
import PageTitle from '../page-title/page-title';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import styles from './app.module.css';

const App = () => {
    const dispatch = useDispatch();

    const [activeTab, setTab] = useState('bun');

    useEffect(
        () => {
            dispatch(updateIngredientsList());
        },
        [dispatch]
    );

    return (
        <div className={styles.wrapper}>
            <AppHeader />
            <main className={styles.main}>
                <PageTitle />
                <BurgerIngredients
                    activeTab={activeTab}
                    onChangeTab={setTab}
                />
                <BurgerConstructor />
            </main>
            <Modal />
            <div id="react-modals" />
        </div>
    );
};

export default App;
