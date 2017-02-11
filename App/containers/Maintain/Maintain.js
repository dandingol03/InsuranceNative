/**
 * Created by dingyiming on 2017/2/11.
 */

import React,{Component} from 'react';

import  {
    AppRegistry,
    StyleSheet,
    ListView,
    Image,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ScrollView,
    Alert,
    Modal
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Popup from 'react-native-popup';
import MyPop from 'react-native-popupwindow';


class Maintain extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    onPressHandle() {
        let options = {
        };
        MyPop.showPopupWindow(options,(err,action,button) =>{
            if(err){
                ToastAndroid.show(err,ToastAndroid.SHORT);
            }else{
                if(action === 'buttonClicked'){
                    if(button === 'positive'){
                        ToastAndroid.show('点击确定',ToastAndroid.SHORT);
                    }else if(button === 'negative'){
                        ToastAndroid.show('点击取消',ToastAndroid.SHORT);
                    }
                }
            }
        });
    }
    _handlePress1(index) {

        if(index!==0){
            var insuranceType = this.state.insuranceTypeButtons[index]
            this.setState({insuranceType:insuranceType});
        }

    }
    show(actionSheet) {
        this[actionSheet].show();
    }

    constructor(props)
    {
        super(props);
        const { accessToken } = this.props;
        this.state = {
            accessToken: accessToken,
            dailys : [
            {subServiceId:'1',subServiceTypes:'机油,机滤',serviceType:'11',checked:true},
            {subServiceId:'2',subServiceTypes:'检查制动系统,更换刹车片',serviceType:'11',checked:false},
            {subServiceId:'3',subServiceTypes:'雨刷片更换',serviceType:'11',checked:false},
            {subServiceId:'4',subServiceTypes:'轮胎更换',serviceType:'11',checked:false},
            {subServiceId:'5',subServiceTypes:'燃油添加剂',serviceType:'11',checked:false},
            {subServiceId:'6',subServiceTypes:'空气滤清器',serviceType:'11',checked:false},
            {subServiceId:'7',subServiceTypes:'检查火花塞',serviceType:'11',checked:false},
            {subServiceId:'8',subServiceTypes:'检查驱动皮带',serviceType:'11',checked:false},
            {subServiceId:'9',subServiceTypes:'更换空调滤芯',serviceType:'11',checked:false},
            {subServiceId:'10',subServiceTypes:'更换蓄电池,防冻液',serviceType:'11',checked:false}
        ],

        };
    }


    render(){

        var dailys = [
                {subServiceId:'1',subServiceTypes:'机油,机滤',serviceType:'11',checked:true},
                {subServiceId:'2',subServiceTypes:'检查制动系统,更换刹车片',serviceType:'11',checked:false},
                {subServiceId:'3',subServiceTypes:'雨刷片更换',serviceType:'11',checked:false},
                {subServiceId:'4',subServiceTypes:'轮胎更换',serviceType:'11',checked:false},
                {subServiceId:'5',subServiceTypes:'燃油添加剂',serviceType:'11',checked:false},
                {subServiceId:'6',subServiceTypes:'空气滤清器',serviceType:'11',checked:false},
                {subServiceId:'7',subServiceTypes:'检查火花塞',serviceType:'11',checked:false},
                {subServiceId:'8',subServiceTypes:'检查驱动皮带',serviceType:'11',checked:false},
                {subServiceId:'9',subServiceTypes:'更换空调滤芯',serviceType:'11',checked:false},
                {subServiceId:'10',subServiceTypes:'更换蓄电池,防冻液',serviceType:'11',checked:false}
            ];

        return (
            <View style={{flex:1}}>

                {/*body*/}
                <Image resizeMode="stretch" source={require('../../img/bkg_old@2x.png')} style={{width:width,height:height}}>

                    <View style={[{padding: 10,justifyContent: 'center',alignItems: 'center',flexDirection:'row',height:60,backgroundColor:'rgba(17, 17, 17, 0.6)'},styles.card]}>
                        <TouchableOpacity style={{flex:1,textAlign:'center',color:'#fff',paddingLeft:8}} onPress={()=>{
                        this.goBack();
                    }}>
                            <Icon size={26} name="chevron-left" color="#fff" ></Icon>
                        </TouchableOpacity>
                        <Text style={{fontSize:20,flex:20,textAlign:'center',color:'#fff'}}>
                            维修服务
                        </Text>
                    </View>

                    <View style={{flex:1,width:width,position:'relative',marginTop:10}}>
                        <ScrollableTabView style={{flex:1}}
                                           renderTabBar={() => <DefaultTabBar style={{borderBottomWidth:0,backgroundColor:'#fff'}} activeTextColor="#0A9DC7" inactiveTextColor="#323232" underlineStyle={{backgroundColor:'#0A9DC7'}}/>}
                        >
                            <View tabLabel='日常保养' style={{flex:1,padding:8,fontSize:20}}>
                                <View style={{height:height-96,width:width}}>
                                 <View style={{width:width,height:125,padding:0,flexDirection:'row',alignItems:'center'}}>
                                     <TouchableOpacity style={[styles.row,{flex:1,justifyContent:'center',padding:12}]} onPress={()=>{
                                         dailys[0].checked=!dailys[0].checked;
                                         this.setState({dailys:dailys});
                                     }}>
                                     <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                        <View style={{flex:1,alignItems:'center'}}>
                                            <Image resizeMode="contain" source={require('../../img/maintain1.png')} style={{width:35,height:35}}/>
                                            <Text style={{fontSize:17,color:'#222',marginTop:5}}>机油、机滤</Text>
                                            {
                                                dailys[0].checked==true?<Text style={{fontSize:17,color:'#fff',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#F56C00',borderRadius:2,backgroundColor:'#F56C00'}}>选择</Text>:
                                                    <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            }
                                        </View>
                                    </View>
                                     </TouchableOpacity>

                                    <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                        <View style={{flex:1,alignItems:'center'}}>
                                            <Image resizeMode="contain" source={require('../../img/maintain2.png')} style={{width:35,height:35}}/>
                                            <Text style={{fontSize:17,color:'#222',marginTop:5}}>更换刹车片</Text>
                                            <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                        <View style={{flex:1,alignItems:'center'}}>
                                            <Image resizeMode="contain" source={require('../../img/maintain3.png')} style={{width:35,height:35}}/>
                                            <Text style={{fontSize:17,color:'#222',marginTop:5}}>雨刷片更换</Text>
                                            <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                        </View>
                                    </View>
                                </View>

                                    <View style={{width:width,height:125,padding:0,flexDirection:'row',alignItems:'center'}}>
                                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                            <View style={{flex:1,alignItems:'center'}}>
                                                <Image resizeMode="contain" source={require('../../img/maintain4.png')} style={{width:35,height:35}}/>
                                                <Text style={{fontSize:17,color:'#222',marginTop:5}}>轮胎更换</Text>
                                                <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                            <View style={{flex:1,alignItems:'center'}}>
                                                <Image resizeMode="contain" source={require('../../img/maintain5.png')} style={{width:35,height:35}}/>
                                                <Text style={{fontSize:17,color:'#222',marginTop:5}}>燃油添加剂</Text>
                                                <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                            <View style={{flex:1,alignItems:'center'}}>
                                                <Image resizeMode="contain" source={require('../../img/maintain6.png')} style={{width:35,height:35}}/>
                                                <Text style={{fontSize:17,color:'#222',marginTop:5}}>空气滤清器</Text>
                                                <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{width:width,height:125,padding:0,flexDirection:'row',alignItems:'center'}}>
                                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                            <View style={{flex:1,alignItems:'center'}}>
                                                <Image resizeMode="contain" source={require('../../img/maintain7.png')} style={{width:35,height:35}}/>
                                                <Text style={{fontSize:17,color:'#222',marginTop:5}}>检查火花塞</Text>
                                                <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                            <View style={{flex:1,alignItems:'center'}}>
                                                <Image resizeMode="contain" source={require('../../img/maintain8.png')} style={{width:35,height:35}}/>
                                                <Text style={{fontSize:17,color:'#222',marginTop:5}}>检查驱动片</Text>
                                                <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                                            <View style={{flex:1,alignItems:'center'}}>
                                                <Image resizeMode="contain" source={require('../../img/maintain9.png')} style={{width:35,height:35}}/>
                                                <Text style={{fontSize:17,color:'#222',marginTop:5}}>更换空调滤芯</Text>
                                                <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{width:width,height:125,padding:0,flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                                        <View style={[styles.row,{flex:1,justifyContent:'flex-start',padding:12}]}>
                                            <View style={{flex:1,alignItems:'center'}}>
                                                <Image resizeMode="contain" source={require('../../img/maintain10.png')} style={{width:35,height:35}}/>
                                                <Text style={{fontSize:17,color:'#222',marginTop:5}}>更换蓄电池防冻液</Text>
                                                <Text style={{fontSize:17,color:'#068E78',padding:2,paddingLeft:8,paddingRight:8,marginTop:5,borderWidth:1,borderColor:'#068E78',borderRadius:2}}>选择</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>



                            </View>


                            <View tabLabel='故障维修' style={{flex:1,padding:12,fontSize:20}}>
                                <Text>故障维修</Text>
                            </View>

                            <View tabLabel='事故维修' style={{flex:1,padding:12,fontSize:20}}>
                                <Text>事故维修</Text>
                            </View>

                        </ScrollableTabView>
                    </View>





                </Image>

            </View>);
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderBottomWidth: 0,
        shadowColor: '#eee',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    logo:{
        width:width,
        height:290
    },
    module:{
        width:90,
        height:90
    },
    separator: {
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    body:{
        padding:10
    },
    row:{
        flexDirection:'row',
        height:130,
        borderBottomWidth:0,
        borderBottomColor:'#222'
    },
});


module.exports = connect(state=>({
        accessToken:state.user.accessToken
    })
)(Maintain);

