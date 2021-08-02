import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import styles from './user-page-links.module.css';

const propTypes = {
    showRegister: PropTypes.bool,
    showForgotPassword: PropTypes.bool,
    showAlreadyRegistered: PropTypes.bool,
    showRememberPassword: PropTypes.bool,
};

const UserPageLinks = ({
    showRegister,
    showForgotPassword,
    showAlreadyRegistered,
    showRememberPassword,
}) => (
    <div className={styles.links}>
        {showRegister && (
            <p className="text text_type_main-default mb-4">
                <span>Вы — новый пользователь?</span>
                <Link className={styles.link} to="/register">
                    Зарегистрироваться
                </Link>
            </p>
        )}

        {showForgotPassword && (
            <p className="text text_type_main-default mb-4">
                <span>Забыли пароль?</span>
                <Link className={styles.link} to="/forgot-password">
                    Восстановить пароль
                </Link>
            </p>
        )}

        {showAlreadyRegistered && (
            <p className="text text_type_main-default mb-4">
                <span>Уже зарегистрированы?</span>
                <Link className={styles.link} to="/login">
                    Войти
                </Link>
            </p>
        )}

        {showRememberPassword && (
            <p className="text text_type_main-default mb-4">
                <span>Вспомнили пароль?</span>
                <Link className={styles.link} to="/login">
                    Войти
                </Link>
            </p>
        )}
    </div>
);

UserPageLinks.propTypes = propTypes;
export default UserPageLinks;