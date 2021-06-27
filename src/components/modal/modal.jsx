import React, { memo } from 'react'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

const propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    onClose: PropTypes.func.isRequired,
};

const Modal = ({ open, title, children, onClose }) => (
    !!open && (
        createPortal(
            <>
                <div className={styles.overlay} onClick={onClose} />
                <div className={`${styles.modal} p-10`}>
                    <h2 className={`${styles.header} text text_type_main-large`}>
                        {title && (
                            <span>{title}</span>
                        )}
                        <CloseIcon onClick={onClose} />
                    </h2>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </>,
            document.getElementById("react-modals")
        )
    )
);

Modal.propTypes = propTypes;

Modal.defaultProps = {
    title: ''
};

export default memo(Modal);