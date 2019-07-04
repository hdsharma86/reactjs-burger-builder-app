import * as actionTypes from './actions';
import { stat } from 'fs';

const intialState = {
    ingredients : {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    price: 1.5
};

const INGREDIENT_PRICE = {
    salad: 0.4,
    cheese: 0.8,
    bacon: 1,
    meat: 1.9
};

const reducer = (state = intialState, action) => {
    console.log(action);
    switch( action.type ){

        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICE[action.ingredientName]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                price: state.price - INGREDIENT_PRICE[action.ingredientName]
            };

    }
    return state;
}

export default reducer;