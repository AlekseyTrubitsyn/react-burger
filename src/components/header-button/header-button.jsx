import React from 'react'
import PropTypes from 'prop-types'

import styles from './header-button.module.css';

const propTypes = {
    icon: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ]).isRequired,
    text: PropTypes.string,
    active: PropTypes.bool,
    withoutPaddings: PropTypes.bool,
    className: PropTypes.string,
};

const HeaderButton = ({ icon, text, active }) => (
    <button
        type="button"
        className={`${styles.button} ${active ? 'active' : ''}`}
    >
        {icon}
        {!!text && (
            <span className="text text_type_main-default ml-2">
                {text}
            </span>
        )}
    </button>
);

HeaderButton.defaultProps = {
    text: '',
    active: false,
    withoutPaddings: false,
    className: '',
};

HeaderButton.propTypes = propTypes;
export default HeaderButton;