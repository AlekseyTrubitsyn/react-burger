import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import UserDataForm from '../../components/user-data-form/user-data-form';
import UserPageLinks from '../../components/user-page-links/user-page-links';
import { login } from '../../services/actions/userData';

import styles from './login-page.module.css';

const LoginPage = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const history = useHistory();

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

    const handleSubmit = useCallback(
        () => {
            const callback = () => {
                history.replace('/')
            };

            dispatch(login(values, callback));
        },
        [dispatch, values, history]
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
                onClick={handleSubmit}
            />

            <UserPageLinks
                showRegister
                showForgotPassword
            />
        </main>
    );
};

export default LoginPage;