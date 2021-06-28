import React, { memo, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    onClose: PropTypes.func.isRequired,
};

const Modal = ({ open, title, children, onClose }) => {
    const handleKeyDown = useCallback(
        (e) => {
            if (!(e && e.key === 'Escape')) return;

            onClose();
        },
        [onClose],
    );

    useEffect(
        () => {
            if (open) {
                document.addEventListener('keydown', handleKeyDown)
            } else {
                document.removeEventListener('keydown', handleKeyDown);
            }

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            }
        },
        [open, handleKeyDown]
    );

    return (
        !!open && (
            createPortal(
                <>
                    <ModalOverlay onClick={onClose} />
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
};

Modal.propTypes = propTypes;

Modal.defaultProps = {
    title: ''
};

export default memo(Modal);