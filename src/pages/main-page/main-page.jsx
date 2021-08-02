import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateIngredientsList } from '../../services/actions/burgerIngredients';

import styles from './main-page.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../../components/app-header/app-header';
import PageTitle from '../../components/page-title/page-title';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';

const MainPage = () => {
    const dispatch = useDispatch();

    const [activeTab, setTab] = useState('bun');

    useEffect(
        () => {
            dispatch(updateIngredientsList());
        },
        [dispatch]
    );

    return (
        <>
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
        </>
    );
};

export default MainPage;