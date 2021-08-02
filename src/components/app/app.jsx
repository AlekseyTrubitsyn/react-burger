import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <PageTitle />
                    <BurgerIngredients
                        activeTab={activeTab}
                        onChangeTab={setTab}
                    />
                    <BurgerConstructor />
                </main>
            </DndProvider>
            <Modal />
            <div id="react-modals" />
        </div>
    );
};

export default App;
