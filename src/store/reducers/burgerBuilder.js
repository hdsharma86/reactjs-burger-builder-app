import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util';

const intialState = {
    ingredients : null,
    price: 1.5,
    error: false,
    isBuilding: false
};

const INGREDIENT_PRICE = {
    salad: 0.4,
    cheese: 0.8,
    bacon: 1,
    meat: 1.9
};

const setIngredients = (state, action) => {
    return updateObject(state, { ingredients: action.ingredients, error: false });
}

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {[action.ingredientName] : state.ingredients[action.ingredientName] + 1});
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICE[action.ingredientName],
        isBuilding: true
    };
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const rUpdatedIngredients = updateObject(state.ingredients, {[action.ingredientName] : state.ingredients[action.ingredientName] - 1});
    const rUpdatedState = {
        ingredients: rUpdatedIngredients,
        price: state.price - INGREDIENT_PRICE[action.ingredientName],
        isBuilding: true
    };
    return updateObject(state, rUpdatedState);
}

const fetchIngredientFailed = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state = intialState, action) => {
    switch( action.type ){
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action);
        default: return state;
    }
}

export default reducer;