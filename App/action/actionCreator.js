/**
 * BrandAction
 * 因为没有api 只能拿固定数据
 */


import * as types from './types';
var Proxy = require('../proxy/Proxy');


export let loginAction=(username,password)=>{

   return dispatch =>{

       return    Proxy.get({
           headers: {
               'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
               'Content-Type': 'application/x-www-form-urlencoded'
           },
           data: "grant_type=password&password=" + this.state.password + "&username=" + this.state.username
       }).then(function(res) {
           var accessToken=res.access_token;
           dispath(getAccessToken(accessToken));
       }).catch(function(err) {
           dispath(getAccessToken(null));
       });
   };

}

let getAccessToken= (accessToken)=>{
    if(accessToken!==null)
        return {
            type: types.ACCESS_TOKEN_ACK,
            accessToken: accessToken,
            auth:true
        };
    else
        return {
            type:types.ACCESS_TOKEN_ACK,
            accessToken:accessToken,
            auth:'failed'
        }
}
