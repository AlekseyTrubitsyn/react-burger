import React, { FC, memo, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

export interface IBurgerConstructorItem {
    _id: string;
    image: string;
    name: string;
    price: number;
};

export interface IBurgerConstructorItemProps {
    index?: number;
    type?: 'top' | 'bottom' | undefined;
    isLocked?: boolean;
    data: IBurgerConstructorItem;
    draggable?: boolean;
    onMove?: (draggableIndex: number, hoverIndex: number) => void;
    onDelete?: (index: number) => void;
};

export interface TDraggableItem {
    id: IBurgerConstructorItem['_id'],
    index: number
};

const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = ({
    data,
    index = -1,
    type = undefined,
    draggable = false,
    onMove = () => { },
    onDelete = () => { }
}) => {
    const ref = useRef<HTMLLIElement | null>(null);

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
            hover: (item: TDraggableItem, monitor) => {
                const el = ref.current;

                if (!(el && draggable && monitor)) return;

                const draggableIndex = item.index;
                const hoverIndex = index;

                if (draggableIndex === hoverIndex) return;

                const hoverBoundingRect = el.getBoundingClientRect();
                const monitorClientOffset = monitor.getClientOffset();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const hoverClientY = monitorClientOffset ? monitorClientOffset.y - hoverBoundingRect.top : 0;

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
            {draggable && (
                <DragIcon type="primary" />
            )}
            <ConstructorElement
                type={type}
                isLocked={!draggable}
                text={data.name}
                price={data.price}
                thumbnail={data.image}
                handleClose={handleClose}
            />
        </li>
    );
};

export default memo(BurgerConstructorItem);
