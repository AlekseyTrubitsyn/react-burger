import React, { Children, FC, memo, ReactPortal, useCallback, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { closeModal } from '../../services/actions/modal';
import { AppDispatch, RootState } from '../../services/store';

import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './modal.module.css';

const Modal: FC<{}> = () => {
    const modalContainer = useMemo(() => document.getElementById("react-modals"), []);

    const dispatch = useDispatch<AppDispatch>();

    const {
        open,
        elementName,
        title
    } = useSelector((store: RootState) => ({
        open: !!store.modal.open,
        elementName: store.modal.elementName,
        title: store.modal.title,
    }));

    const handleClose = useCallback<() => void>(
        () => {
            dispatch(closeModal());
        },
        [dispatch]
    );

    const handleKeyDown = useCallback<(e: KeyboardEvent) => void>(
        (e) => {
            if (!(e && e.key === 'Escape')) return;

            handleClose();
        },
        [handleClose],
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
        open && modalContainer
            ? (createPortal(
                <>
                    <ModalOverlay onClick={handleClose} />
                    <div className={`${styles.modal} p-10`}>
                        <h2 className={`${styles.header} text text_type_main-large`}>
                            {title && (
                                <span>{title}</span>
                            )}
                            <CloseIcon type="primary" onClick={handleClose} />
                        </h2>
                        <div className={styles.content}>
                            {elementName === 'OrderDetails' && (
                                <OrderDetails />
                            )}
                            {elementName === 'IngredientDetails' && (
                                <IngredientDetails />
                            )}
                        </div>
                    </div>
                </>,
                modalContainer
            ))
            : null
    );
};

export default memo(Modal);
