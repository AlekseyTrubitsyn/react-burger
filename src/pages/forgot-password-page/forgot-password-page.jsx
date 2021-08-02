import React, { useCallback, useState } from 'react';

import UserDataForm from '../../components/user-data-form/user-data-form';
import UserPageLinks from '../../components/user-page-links/user-page-links';

import styles from './forgot-password-page.module.css';

const ForgotPasswordPage = () => {
    const [values, setValues] = useState({
        email: '',
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
                title="Восстановление пароля"
                showEmail
                values={values}
                buttonText="Восстановить"
                onChange={handleChange}
                onClick={() => console.log('click')}
            />

            <UserPageLinks showRememberPassword />
        </main>
    );
};

export default ForgotPasswordPage;