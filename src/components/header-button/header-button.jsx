import React from 'react'
import PropTypes from 'prop-types'

import styles from './header-button.module.css';

const propTypes = {
    icon: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ]).isRequired,
    text: PropTypes.string,
    active: PropTypes.bool
};

const HeaderButton = ({ icon, text, active, href }) => (
    <li>
        <a className={`${styles.button} ${active ? 'active' : ''}`} href={href}>
            {icon}
            <span className="text text_type_main-default ml-2">
                {text}
            </span>
        </a>
    </li>
);

HeaderButton.defaultProps = {
    text: '',
    active: false
};

HeaderButton.propTypes = propTypes;
export default HeaderButton;