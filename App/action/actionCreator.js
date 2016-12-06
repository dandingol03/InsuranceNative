/**
 * BrandAction
 * 因为没有api 只能拿固定数据
 */


import * as types from './types';
var Proxy = require('../proxy/Proxy');


export let loginAction=function(username,password){

    return dispatch=>{

        dispatch(onOauth());

        Proxy.post({
            url:'http://192.168.1.121:3000/login',
            headers: {
                'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "grant_type=password&password=" + password + "&username=" + username
        },(res)=> {
            var accessToken=res.access_token;
            dispatch(getAccessToken(accessToken));
        }, (err) =>{
                dispatch(getAccessToken(null));
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
