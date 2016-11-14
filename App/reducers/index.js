/**
 * Created by json on 16/5/25.
 * 根reducer
 */
import { combineReducers } from 'redux';
//添加个页面的reducer并进行合并
import DashboardReducer from './dashboard';
import LoginReducer from './login';

export default rootReducer = combineReducers({
    DashboardReducer,
    LoginReducer
})

