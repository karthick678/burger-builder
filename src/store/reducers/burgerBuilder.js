import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';

const initialState = {
    ingrediants: null,
    totalPrice: 0,
    error: false,
    building: false
};

const INGREDIANT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

const addIngredient = (state, action) => {
    const updateIngrediant = { [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1 };
    const updateIngrediants = updateObject(state.ingrediants, updateIngrediant);
    const updatedState = {
        ingrediants: updateIngrediants,
        totalPrice: state.totalPrice + INGREDIANT_PRICE[action.ingrediantName],
        building: true
    };
    return updateObject(state, updatedState)
};

const removeIngredient = (state, action) => {
    const updateIng = { [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1 };
    const updateIngs = updateObject(state.ingrediants, updateIng);
    const updatedSt = {
        ingrediants: updateIngs,
        totalPrice: state.totalPrice + INGREDIANT_PRICE[action.ingrediantName],
        building: true
    };
    return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingrediants: action.ingrediants,
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
        case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
        case (actionTypes.SET_INGREDIENTS): return setIngredients(state, action);
        case (actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action)
        default:
            return state;
    }
}

export default reducer;