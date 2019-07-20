import * as actionTypes from './actionTypes';
import axios from '../../axios-connector';

export const initPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

export const processOrder = ( orderData, token ) => {
    return dispatch => {
        axios.post('orders.json?auth='+token, orderData)
        .then((response) => {
            dispatch(orderSuccess(response.data.name, orderData));
        })
        .catch((e) => {
            dispatch(orderFailed(e));
        });
    }
}

export const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const orderFailed = ( error ) => {
    return {
        type: actionTypes.ORDER_FAILED,
        error: error
    };
}

export const fetchOrders = (token, userId) => {
    return async dispatch => {
        dispatch(fetchOrdersInit());    
        try {
            const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
            const orders = await axios.get('/orders.json'+queryParams);
            const orderArray = [];
            for (let key in orders.data){
                orderArray.push({
                    ...orders.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(orderArray));            
        } catch (error) {
            dispatch(fetchOrdersFailed(error));  
        }
    }
}

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}