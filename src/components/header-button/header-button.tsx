import React, { FC, ReactNode } from 'react';

import styles from './header-button.module.css';

interface IHeaderButton {
    icon: ReactNode;
    text?: ReactNode;
    isActive?: boolean;
    href?: string;
};

const HeaderButton: FC<IHeaderButton> = ({ icon, text = '', isActive = false, href = "#" }) => (
    <li>
        <a className={`${styles.button} ${isActive ? 'active' : ''}`} href={href}>
            {icon}
            <span className="text text_type_main-default ml-2">
                {text}
            </span>
        </a>
    </li>
);

export default HeaderButton;