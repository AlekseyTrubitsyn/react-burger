import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { confirmPasswordReset } from '../../services/actions/userData';

import UserDataForm from '../../components/user-data-form/user-data-form';
import UserPageLinks from '../../components/user-page-links/user-page-links';

import styles from './reset-password-page.module.css';

const ResetPasswordPage = () => {
    const [values, setValues] = useState({
        newPassword: '',
        code: '',
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
            dispatch(confirmPasswordReset(values));
        },
        [dispatch, values]
    );

    return (
        <main className={`p-5 pt-30 ${styles.main}`}>
            <UserDataForm
                title="Восстановление пароля"
                showNewPassword
                showCode
                values={values}
                buttonText="Сохранить"
                onChange={handleChange}
                onClick={handleSubmit}
            />

            <UserPageLinks showRememberPassword />
        </main>
    );
};

export default ResetPasswordPage;