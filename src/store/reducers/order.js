import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
}

const purchaseOrderSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {loading: false, orders: state.orders.concat(newOrder), purchased: true});
}

const purchaseOrderFailed = (state, action) => {
    return state;
}
const fetchOrderInit = (state, action) => {
    return updateObject(state, {loading: true});
}
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false});
}
const fetchOrderFailed = (state, action) => {
    return updateObject(state, {loading: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case (actionTypes.PURCHASE_INIT): return purchaseInit(state, action);
        case (actionTypes.ORDER_SUCCESS): return purchaseOrderSuccess(state, action);
        case (actionTypes.ORDER_FAILED): return purchaseOrderFailed(state, action);
        case (actionTypes.FETCH_ORDERS_INIT): return fetchOrderInit(state, action);
        case (actionTypes.FETCH_ORDERS_SUCCESS): return fetchOrderSuccess(state, action);
        case (actionTypes.FETCH_ORDERS_FAILED): return fetchOrderFailed(state, action);
        default: return state;
    }
}

export default reducer;