import React, { useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './user-profile-page.module.css';

const UserProfilePage = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [modified, setModified] = useState(false);

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

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e?.target;

            setValues(v => ({
                ...v,
                [name]: value
            }));

            setModified(true);
        },
        []
    );

    return (
        <main className={`${styles.main} p-10 pt-30`}>
            <div className={`${styles.grid} mb-8`}>
                <div className={styles.nav}>
                    <Link
                        className={`text text_type_main-medium ${styles.link} ${isProfile ? styles.linkCurrent : ''}`}
                        to="/profile"
                    >
                        Профиль
                    </Link>
                    <Link
                        className={`text text_type_main-medium ${styles.link} ${isOrders ? styles.linkCurrent : ''}`}
                        to="/profile/orders"
                    >
                        История заказов
                    </Link>
                    <Link className={`text text_type_main-medium ${styles.link}`}>
                        Выход
                    </Link>
                </div>
                <div className={styles.inputs}>
                    <Input
                        placeholder="Имя"
                        name="name"
                        value={values.name}
                        icon="EditIcon"
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Логин"
                        type="email"
                        name="email"
                        value={values.email}
                        icon="EditIcon"
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        value={values.password}
                        icon="EditIcon"
                        onChange={handleChange}
                    />
                    {modified && (
                        <div className={styles.buttons}>
                            <Button type="secondary">
                                Отмена
                            </Button>
                            <Button type="primary">
                                Сохранить
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className={`${styles.description} text text_type_main-default text_color_inactive`}>
                В этом разделе вы можете изменить свои персональные данные
            </div>
        </main>
    )
};

export default UserProfilePage;