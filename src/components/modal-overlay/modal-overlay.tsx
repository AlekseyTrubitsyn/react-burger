import React, { FC } from 'react'

import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClick: () => void;
};

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => (
    <div className={styles.overlay} onClick={onClick} />
);

export default ModalOverlay;