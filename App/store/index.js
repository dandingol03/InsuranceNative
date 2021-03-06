/**
 * Created by danding on 16/11/13.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

const middlewares = [thunk];
const createLogger = require('redux-logger');

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

let store = createStoreWithMiddleware(reducer);
module.exports= store;


