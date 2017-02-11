

import * as types from '../action/types';

const initialState = {
    carSelect: null
};

let user = (state = initialState, action) => {

    switch (action.type) {

        case types.SELECT_CUSTOMER_CAR:

            return Object.assign({}, state, {
                carSelect: action.car
            })

            return state;
        default:
            return state;
    }
}

export default user;
