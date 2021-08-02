export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const deleteFromConstructor = index => dispatch => (
    dispatch({ type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, payload: index })
);

export const addToConstructor = item => dispatch => (
    dispatch({ type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload: item })
);

export const moveFillerInConstructor = ({ fromIndex, toIndex }) => dispatch => (
    dispatch({ type: MOVE_INGREDIENT, payload: { fromIndex, toIndex }})
);