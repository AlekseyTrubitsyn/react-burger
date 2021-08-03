import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import HeaderButton from '../header-button/header-button';

import styles from './app-header.module.css';

const AppHeader = () => {
    const { pathname } = useLocation();

    const {
        isProfile,
        isOrders
    } = useMemo(
        () => ({
            isProfile: pathname === '/profile',
            isOrders: pathname === '/profile/orders',
        }),
        [pathname]
    );

    return (
        <div className={styles.backgroundWrapper}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <nav>
                        <ul>
                            <HeaderButton
                                active={!isProfile && !isOrders}
                                icon={( <BurgerIcon type="primary" /> )}
                                text="Конструктор"
                            />
                            <HeaderButton
                                active={isOrders}
                                icon={( <ListIcon type="primary" /> )}
                                text="Лента заказов"
                                to="/profile/orders"
                            />
                        </ul>
                    </nav>
                    <a href="/">
                        <Logo />
                    </a>
                    <nav>
                        <HeaderButton
                            icon={( <ProfileIcon type="primary" /> )}
                            text="Личный кабинет"
                            to="/profile"
                            active={isProfile}
                        />
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default AppHeader;