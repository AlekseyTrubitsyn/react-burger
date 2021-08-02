import React, { useCallback, useState } from 'react'

import { Link } from 'react-router-dom';

import { Button, EmailInput, Input, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './register-page.module.css';

const RegisterPage = () => {
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
                    Регистрация
                </h1>
                <Input
                    placeholder="Имя"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                />
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
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.links}>
                <p className="text text_type_main-default mb-4">
                    <span>Уже зарегистрированы?</span>
                    <Link className={styles.link} to="/login">
                        Войти
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default RegisterPage;