import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button, EmailInput, Input, Logo, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './user-data-form.module.css';

const propTypes = {
    showName: PropTypes.bool,
    showEmail: PropTypes.bool,
    showPassword: PropTypes.bool,
    showNewPassword: PropTypes.bool,
    showCode: PropTypes.bool,
    title: PropTypes.string.isRequired,
    values: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        newPassword: PropTypes.string,
        code: PropTypes.string,
    }).isRequired,
    buttonText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

const UserDataForm = ({
    showName,
    showEmail,
    showPassword,
    showNewPassword,
    showCode,
    title,
    values,
    buttonText,
    onChange,
    onClick
}) => (
    <form className={styles.form} onSubmit={e => { e.preventDefault(); }}>
        <div className="mb-20">
            <Logo />
        </div>
        <h1 className="text text_type_main-medium">
            {title}
        </h1>
        {showName && (
            <Input
                placeholder="Имя"
                name="name"
                value={values.name}
                onChange={onChange}
            />
        )}
        {showEmail && (
            <EmailInput
                name="email"
                value={values.email}
                onChange={onChange}
            />
        )}
        {showPassword && (
            <PasswordInput
                name="password"
                value={values.password}
                onChange={onChange}
            />
        )}
        {showNewPassword && (
            <Input
                type="password"
                icon="ShowIcon"
                placeholder="Введите новый пароль"
                name="newPassword"
                value={values.newPassword}
                onChange={onChange}
            />
        )}
        {showCode && (
            <Input
                placeholder="Введите код из письма"
                name="code"
                value={values.code}
                onChange={onChange}
            />
        )}
        <Button
            type="primary"
            size="medium"
            onClick={onClick}
        >
            {buttonText}
        </Button>
    </form>
);

UserDataForm.propTypes = propTypes;
export default memo(UserDataForm);