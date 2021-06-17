import React from 'react'

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderButton from '../header-button/header-button';

import './app-header.css';

const AppHeader = () => (
    <header className="header">
        <nav>
            <HeaderButton
                active
                className="mr-2"
                icon={( <BurgerIcon type="primary" /> )}
                text="Конструктор"
            />
            <HeaderButton
                icon={( <ListIcon type="primary" /> )}
                text="Лента заказов"
            />
        </nav>
        <HeaderButton
            withoutPaddings
            icon={( <Logo /> )}
        />
        <div className="profile-button-wrapper">
            <HeaderButton
                icon={( <ProfileIcon type="primary" /> )}
                text="Личный кабинет"
            />
        </div>
    </header>
);

export default AppHeader;