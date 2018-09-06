import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchashed: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASH_INIT:
            return updateObject(state, {
                purchashed: false
            });
        case actionTypes.PURCHASH_BURGER_START:
            return updateObject(state, {
                loading: true
            });
        case actionTypes.PURCHASH_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.orderId });
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchashed: true
            });
        case actionTypes.PURCHASH_BURGER_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.FETCH_OREDRS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_OREDRS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_OREDRS_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
}

export default reducer;