import axios from 'axios';

import * as actionTypes from './actionTypes';

export const addIngredient = igtype => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype,
    }
}

export const removeIngredient = igtype => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype,
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}

export const orderLoadFailded = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token, userId) => dispatch => {
   const header = {
    'headers': {
        'Authorization':`Bearer ${token}`
    }
   }
   axios.get(`http://127.0.0.1:8000/api/orders/`, header)
   .then(response => {
    dispatch(loadOrders(response.data));
   })
   .catch(err => {
       dispatch(orderLoadFailded());
   })
}