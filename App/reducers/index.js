/**
 * Created by json on 16/5/25.
 * 根reducer
 */
import { combineReducers } from 'redux';

import carInfo from './carInfo';
import user from './user';
import timer from './timer';
import carOrders from './carOrders';

export default rootReducer = combineReducers({
    carInfo,
    user,
    timer,
    carOrders
})

