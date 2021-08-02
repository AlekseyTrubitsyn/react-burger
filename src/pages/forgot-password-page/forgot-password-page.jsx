import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { requestPasswordReset } from '../../services/actions/userData';

import UserDataForm from '../../components/user-data-form/user-data-form';
import UserPageLinks from '../../components/user-page-links/user-page-links';

import styles from './forgot-password-page.module.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = useCallback(
        (e) => {
            setEmail(e.target.value);
        },
        []
    );

    const handleSubmit = useCallback(
        () => {
            const callback = () => {
                history.replace('/reset-password')
            };

            dispatch(requestPasswordReset(email, callback));
        },
        [dispatch, email, history]
    );

    return (
        <main className={`p-5 pt-30 ${styles.main}`}>
            <UserDataForm
                title="Восстановление пароля"
                showEmail
                values={{ email }}
                buttonText="Восстановить"
                onChange={handleChange}
                onClick={handleSubmit}
            />

            <UserPageLinks showRememberPassword />
        </main>
    );
};

export default ForgotPasswordPage;