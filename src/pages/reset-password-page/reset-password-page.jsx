import React, { useCallback, useState } from 'react';

import UserDataForm from '../../components/user-data-form/user-data-form';
import UserPageLinks from '../../components/user-page-links/user-page-links';

import styles from './reset-password-page.module.css';

const ResetPasswordPage = () => {
    const [values, setValues] = useState({
        newPassword: '',
        code: '',
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
                showNewPassword
                showCode
                values={values}
                buttonText="Сохранить"
                onChange={handleChange}
                onClick={() => console.log('click')}
            />

            <UserPageLinks showRememberPassword />
        </main>
    );
};

export default ResetPasswordPage;