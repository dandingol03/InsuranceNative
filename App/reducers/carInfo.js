

import * as types from '../action/types';

const initialState = {
    bindList: [],
    orders:[]
};

let user = (state = initialState, action) => {

    switch (action.type) {

        case types.FETCH_CUSTOMER_CARINFO:

            return Object.assign({}, state, {
                bindList: action.bindList
            })
        case types.FETCH_CAR_ORDERS:
            return Object.assign({}, state, {
                orders:action.orders
            })

        default:
            return state;
    }
}

export default user;
