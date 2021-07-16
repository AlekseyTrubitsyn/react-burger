import React, { memo, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd';

import {
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

export const burgerConstructorItemPropTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

const propTypes = {
    index: PropTypes.number,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    data: PropTypes.shape(burgerConstructorItemPropTypes).isRequired,
    onMove: PropTypes.func,
    onDelete: PropTypes.func,
};

const BurgerConstructorItem = ({ index, type, isLocked, data, onMove, onDelete }) => {
    const ref = useRef(null);

    const handleClose = useCallback(
        () => {
            onDelete(index);
        },
        [onDelete, index]
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'filler',
            item: { id: data._id, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            })
        }),
        [data, index, onMove]
    );

    const [, drop] = useDrop(
        () => ({
            accept: 'filler',
            canDrop: () => false,
            hover: (item, monitor) => {
                if (isLocked) return;

                const el = ref.current;

                if (!el) return;

                const draggableIndex = item.index;
                const hoverIndex = index;

                if (draggableIndex === hoverIndex) return;

                const hoverBoundingRect = el.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const hoverClientY = monitor.getClientOffset().y - hoverBoundingRect.top;

                if (draggableIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
                if (draggableIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

                onMove(draggableIndex, hoverIndex);

                item.index = hoverIndex;
            },
        }),
        [index, onMove]
    );

    drag(drop(ref));

    return (
        <li
            className={styles.item}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            ref={ref}
        >
            {!isLocked && (
                <DragIcon type="primary" />
            )}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={data.name}
                price={data.price}
                thumbnail={data.image}
                handleClose={handleClose}
            />
        </li>
    );
};

BurgerConstructorItem.propTypes = propTypes;

BurgerConstructorItem.defaultProps = {
    index: -1,
    type: undefined,
    isLocked: false,
    onMove: () => {},
    onDelete: () => {}
};

export default memo(BurgerConstructorItem);