import React from 'react'
import PropTypes from 'prop-types'

import styles from './modal-overlay.module.css';

const propTypes = {
    onClick: PropTypes.func.isRequired,
};

const ModalOverlay = ({ onClick }) => (
    <div className={styles.overlay} onClick={onClick} />
);

ModalOverlay.propTypes = propTypes;
export default ModalOverlay;