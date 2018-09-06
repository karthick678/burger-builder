import * as actionTypes from './actionTypes';
import axios from './../../axios-order';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingrediantName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingrediantName: name
    };
};

export const setIngrediants = (ingrediants) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingrediants: ingrediants
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngrediants = () => {
    return (dispatch) => {
        axios.get('ingrediants.json')
            .then(response => {
                dispatch(setIngrediants(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
};