

import * as types from '../action/types';

const initialState = {
    accessToken: null,
    auth:false,
    info:null
};

let user = (state = initialState, action) => {

    switch (action.type) {

        case types.ACCESS_TOKEN_ACK:

            return Object.assign({}, state, {
                accessToken: action.accessToken,
                validate:action.validate
            })
        default:
            return state;
    }
}

export default user;
