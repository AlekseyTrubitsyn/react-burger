import React, { useCallback, useState } from 'react';

import UserDataForm from '../../components/user-data-form/user-data-form';
import UserPageLinks from '../../components/user-page-links/user-page-links';

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
            <UserDataForm
                title="Вход"
                showEmail
                showPassword
                values={values}
                buttonText="Войти"
                onChange={handleChange}
                onClick={() => console.log('click')}
            />

            <UserPageLinks
                showRegister
                showForgotPassword
            />
        </main>
    );
};

export default LoginPage;