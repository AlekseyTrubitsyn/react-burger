import React, { memo, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsGroup from '../burger-ingredients-group/burger-ingredients-group';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import styles from './burger-ingredients.module.css';

const propTypes = {
    selectedIdsWithCounts: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
        }),
    ).isRequired
};

const tabs = [
    {
        id: 'bun',
        name: 'Булки'
    },
    {
        id: 'sauce',
        name: 'Соусы'
    }, {
        id: 'main',
        name: 'Начинки'
    }
];

const BurgerIngredients = ({ selectedIdsWithCounts, data }) => {
    const [activeTab, setTab] = useState('bun');
    const [modalState, setModalState] = useState({ open: false });

    const tabsWithValues = useMemo(
        () => (
            tabs.map(tab => ({
                ...tab,
                values: data.filter(({ type }) => tab.id === type)
            }))
        ),
        [data]
    );

    const handleChangeTab = useCallback(
        (nextTab) => {
            setTab(nextTab);
        },
        []
    );

    const handleOpenModal = useCallback(
        (id) => {
            const item = data.find(({ _id }) => _id === id);

            if (!item) return;

            setModalState({ open: true, item })
        },
        [data]
    );

    const handleCloseModal = useCallback(
        () => {
            setModalState({ open: false });
        },
        []
    );

    return (
        <section>
            <BurgerIngredientsTabs
                activeTab={activeTab}
                tabs={tabs}
                onClick={handleChangeTab}
            />
            <ul className={styles.list}>
                {tabsWithValues.map(tab => (
                    <BurgerIngredientsGroup
                        key={tab.id}
                        title={tab.name}
                        data={tab.values}
                        selectedIdsWithCounts={selectedIdsWithCounts}
                        onOpenDetails={handleOpenModal}
                    />
                ))}
            </ul>
            {modalState.open && (
                <Modal
                    title="Детали ингредиента"
                    open
                    onClose={handleCloseModal}
                >
                    <IngredientDetails item={modalState.item} />
                </Modal>
            )}
        </section>
    );
};

BurgerIngredients.propTypes = propTypes;
export default memo(BurgerIngredients);