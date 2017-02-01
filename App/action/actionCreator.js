/**
 * BrandAction
 * 因为没有api 只能拿固定数据
 */


import * as types from './types';
import Config from '../../config';
var Proxy = require('../proxy/Proxy');


export let loginAction=function(username,password,cb){

    return dispatch=> {

        dispatch(onOauth());

        Proxy.postes({
            url: Config.server + '/login',
            headers: {
                'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "grant_type=password&password=" + password + "&username=" + username
        }).then(function (json) {
            var accessToken = json.access_token;


            Proxy.postes({
                url: Config.server + '/svr/request',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'getPersonInfoByPersonId'
                }
            }).then(function (json) {

                if(json.re==1) {
                   dispatch(getPersonInfo(json.data));
                }
                dispatch(getAccessToken(accessToken));
                dispatch(clearTimerAction());
                if (cb)
                    cb();
            });
        }).catch(function (err) {
            dispatch(getAccessToken(null));
            dispatch(clearTimerAction());
            if (cb)
                cb();
        });
    }

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

let getPersonInfo=(personInfo)=>{
    return {
        type:types.GET_PERSON_INFO,
        personInfo:personInfo
    }
}

export let selectCarAction=function(car){
    return {
        type:types.SELECT_CUSTOMER_CAR,
        car:car
    }
}

export let fetchCarOrders=function (accessToken) {

    return dispatch=> {

        Proxy.postes({
            url: Config.server + '/svr/request',
            headers: {
                'Authorization': "Bearer " + accessToken,
                'Content-Type': 'application/json'
            },
            body: {
                request: 'getCarOrdersInHistory'
            }
        }).then(function (json) {

        }).catch(function (err) {
            alert(err);
        })
    }
}
