import * as actionTypes from './actionTypes';
import axios from '../../axios-connector';

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('ingredients.json').then((response) => {
            dispatch(setIngredient(response.data));
        }).catch((e) => {
            dispatch(fetchIngredientFailed());
        });
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    };
}