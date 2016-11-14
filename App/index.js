/**
 * Created by danding on 16/11/13.
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './Store/index';

import App from './Containers/App';

export default class Root extends Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}