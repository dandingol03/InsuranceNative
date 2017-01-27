/**
 * BrandAction
 * 因为没有api 只能拿固定数据
 */


import * as types from './types';
import Config from '../../config';
var Proxy = require('../proxy/Proxy');


export let loginAction=function(username,password,cb){

    return dispatch=>{

        dispatch(onOauth());

        Proxy.post({
            url:Config.server+'/login',
            headers: {
                'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "grant_type=password&password=" + password + "&username=" + username
        },(res)=> {
            var accessToken=res.access_token;
            dispatch(getAccessToken(accessToken));
            dispatch(clearTimerAction());
            if(cb)
                cb();
        }, (err) =>{
            dispatch(getAccessToken(null));
            dispatch(clearTimerAction());
            if(cb)
                cb();
            });
    };


}


export let setTimerAction=function (timer) {
    return dispatch=>{
        dispatch({
            type: types.TIMER_SET,
            timer:timer
        });
    };
}

export let clearTimerAction=function () {
    return dispatch=>{
        dispatch({
            type: types.TIMER_CLEAR
        });
    };
}



let onOauth= () => {
    return {
        type:types.AUTH_BY_OAUTH
    };
}

let getAccessToken= (accessToken)=>{
    if(accessToken!==null)
        return {
            type: types.ACCESS_TOKEN_ACK,
            accessToken: accessToken,
            auth:true,
            validate:true
        };
    else
        return {
            type:types.ACCESS_TOKEN_ACK,
            accessToken:accessToken,
            auth:'failed'
        }
}

export let selectCarAction=function(car){
    return {
        type:types.SELECT_CUSTOMER_CAR,
        car:car
    }
}
