import React from 'react'
import PropTypes from 'prop-types'

import './app-header.css';

const propTypes = {
    icon: PropTypes.oneOfType([ PropTypes.node, PropTypes.string ]).isRequired,
    text: PropTypes.string,
    active: PropTypes.bool,
    withoutPaddings: PropTypes.bool,
    className: PropTypes.string,
};

const HeaderButton = ({ icon, text, active, withoutPaddings, className }) => (
    <button
        type="button"
        className={`header-button ${withoutPaddings ? '' : 'pt-4 pr-5 pb-4 pl-5'} ${active ? 'active' : ''} ${className}`}
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