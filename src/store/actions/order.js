import * as actionTypes from './actionTypes';
import axios from './../../axios-order';

export const purchashBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASH_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchashBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASH_BURGER_FAIL,
        error: error
    };
};

export const purchashBurgerStart = () => {
    return {
        type: actionTypes.PURCHASH_BURGER_START
    };
};

export const purchashBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchashBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchashBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchashBurgerFail(error))
            });
    };
};

export const purchashInit = () => {
    return {
        type: actionTypes.PURCHASH_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_OREDRS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_OREDRS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = (orders) => {
    return {
        type: actionTypes.FETCH_OREDRS_START,
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios
            .get('/orders.json' + queryParams)
            .then(res => {
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
}