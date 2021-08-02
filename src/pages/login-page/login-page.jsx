import React, { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, EmailInput, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login-page.module.css';

const LoginPage = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            setValues(v => ({
                ...v,
                [name]: value
            }));
        },
        []
    );

    return (
        <main className={`p-5 pt-30 ${styles.main}`}>
            <div className="mb-20">
                <Logo />
            </div>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium">
                    Вход
                </h1>
                <EmailInput
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <PasswordInput
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default mb-4">
                    <span>Вы — новый пользователь?</span>
                    <Link className={styles.link} to="/register">
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default mb-4">
                    <span>Забыли пароль?</span>
                    <Link className={styles.link} to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default LoginPage;