/**
 * Created by danding on 17/2/1.
 */


import * as types from '../action/types';

const initialState = {
    historyOrders:[],
    pricedAndPricingOrders:[],
    applyedOrders:[],
    onFresh:true
};

let user = (state = initialState, action) => {

    switch (action.type) {
        case types.SET_CAR_HISTORY_ORDERS:
            return Object.assign({}, state, {
                historyOrders:action.orders
            })
        case types.SET_CAR_PRICED_AND_PRICING_ORDERS:
            return Object.assign({}, state, {
                pricedAndPricingOrders:action.orders
            })
        case types.SET_CAR_APPLYED_ORDERS:
            return Object.assign({}, state, {
                applyedOrders:action.orders
            })
        case types.ENABLE_CARORDERS_ONFRESH:
            return Object.assign({}, state, {
                onFresh:true
            })
        case types.DISABLE_CARORDERS_ONFRESH:
            return Object.assign({}, state, {
                onFresh:false
            })

        default:
            return state;
    }
}

export default user;
