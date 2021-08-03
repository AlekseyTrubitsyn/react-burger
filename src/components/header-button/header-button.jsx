import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './header-button.module.css';

const propTypes = {
    icon: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ]).isRequired,
    text: PropTypes.string,
    active: PropTypes.bool,
    to: PropTypes.string
};

const HeaderButton = ({ icon, text, active, to }) => (
    <li>
        <Link
            className={`${styles.button} ${active ? 'active' : ''}`}
            to={to}
        >
            {icon}
            <span className="text text_type_main-default ml-2">
                {text}
            </span>
        </Link>
    </li>
);

HeaderButton.defaultProps = {
    text: '',
    active: false,
    to: ''
};

HeaderButton.propTypes = propTypes;
export default HeaderButton;