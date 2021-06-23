import React from 'react'

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderButton from '../header-button/header-button';

import styles from './app-header.module.css';

const AppHeader = () => (
    <header className={styles.header}>
        <nav>
            <HeaderButton
                active
                icon={( <BurgerIcon type="primary" /> )}
                text="Конструктор"
            />
            <HeaderButton
                icon={( <ListIcon type="primary" /> )}
                text="Лента заказов"
            />
        </nav>
        <Logo />
        <div>
            <HeaderButton
                icon={( <ProfileIcon type="primary" /> )}
                text="Личный кабинет"
            />
        </div>
    </header>
);

export default AppHeader;