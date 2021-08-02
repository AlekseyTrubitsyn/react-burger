import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';

import UserDataForm from '../../components/user-data-form/user-data-form';
import UserPageLinks from '../../components/user-page-links/user-page-links';
import { registerNewUser } from '../../services/actions/userData';

import styles from './register-page.module.css';

const RegisterPage = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

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
            dispatch(registerNewUser(values));
        },
        [dispatch, values]
    );

    return (
        <main className={`p-5 pt-30 ${styles.main}`}>
            <UserDataForm
                title="Регистрация"
                showName
                showEmail
                showPassword
                values={values}
                buttonText="Зарегистрироваться"
                onChange={handleChange}
                onClick={handleSubmit}
            />

            <UserPageLinks showAlreadyRegistered />
        </main>
    );
};

export default RegisterPage;