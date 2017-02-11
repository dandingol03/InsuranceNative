/**
 * Created by danding on 17/1/31.
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
    Modal,
    BackAndroid
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
var Popover = require('react-native-popover');
import _ from 'lodash';
import Config from '../../../config';
import Proxy from '../../proxy/Proxy';
import CarOrders from '../car/CarOrders';




class My extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    quit()
    {
        Alert.alert(
            'Alert Title',
            '是否现在退出app',
            [
                {text: '确认', onPress: () =>  BackAndroid.exitApp()},
                {text: '取消', onPress: () => console.log('app quit cancel')},
            ]
        )

    }


    showPopover(ref){
        this.refs[ref].measure((ox, oy, width, height, px, py) => {
            this.setState({
                menuVisible: true,
                buttonRect: {x: px+20, y: py+65, width: 450, height: height}
            });
        });
    }

    closePopover(){
        this.setState({menuVisible: false});
    }


    navigate2CarOrders()
    {
        const {navigator} =this.props;

        if(navigator) {
            navigator.push({
                name: 'car_orders',
                component: CarOrders,
                params: {
                }
            })
        }
    }


    fetchData(personId){
        Proxy.post({
            url:Config.server+'/svr/request',
            headers: {
                'Authorization': "Bearer " + this.state.accessToken,
                'Content-Type': 'application/json'
            },
            body: {
                request:'getRelativePersonsWithinPerName',
                info: {
                    perName: ''
                }
            }
        },(json)=> {

            if(json.re==1) {
                if(json.data!==undefined&&json.data!==null)
                {

                    var insuranceder= null;
                    json.data.map(function (person,i) {

                        //当新增完被保险人后,自动刷新被保险人列表并选中
                        if(personId!==undefined&&personId!==null&&person.personId==personId)
                        {
                            person.checked=true;
                            insuranceder = person;
                        }
                    });
                    var  relativePersons=json.data;
                    this.setState({insuranceder: insuranceder, relativePersons: relativePersons});
                }
            }

        }, (err) =>{
        });
    }


    constructor(props)
    {
        super(props);
        const { accessToken } = this.props;
        this.state = {
            companys:props.companys,
            products:props.products,
            relativePersons:null,
            insuranceder:null,
            selectedTab:0,
            menuVisible:false,
            accessToken: accessToken
        };
    }


    render(){


        var displayArea = {x: 5, y: 20, width:width, height: height - 25};


        const {personInfo}=this.props;


        return (
            <View style={{flex:1}}>
                <View style={[{padding: 10,paddingTop:2,paddingBottom:2,marginTop:0,justifyContent: 'center',alignItems: 'center',flexDirection:'row',
                        height:52,backgroundColor:'#404247'}]}>
                    <TouchableOpacity style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}
                                      onPress={()=>{
                        this.quit();
                    }}>
                        <View style={{flex:1,alignItems:'center'}}>
                            <Icon name="power-off" size={26} color="#fff"/>
                            <Text style={{fontSize:14,color:'#fff'}}>退出</Text>
                        </View>

                    </TouchableOpacity>

                    <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:23,color:'#fff',marginLeft:0}}>
                            个人中心
                        </Text>
                    </View>

                    <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:4,paddingTop:2,paddingBottom:2}}>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Icon name="question-circle-o" size={26} color="#fff"/>
                                <Text style={{fontSize:14,color:'#fff'}}>帮助</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity ref="setting" style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}
                                          onPress={this.showPopover.bind(this, 'setting')}>
                            <View style={{flex:1,alignItems:'center'}} >
                                <Icon name="gear" size={26} color="#fff"/>
                                <Text style={{fontSize:14,color:'#fff'}}>设置</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {/*body*/}

                <View style={{height:height*0.3,width:width,position:'relative'}}>
                    <View style={{position:'absolute',top:10,width:width}}>
                        <View style={{flex:1,width:width}}>

                            <View style={{width:width,justifyContent:'center',alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_face@2x.png')} style={{width:100,height:100}}/>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'center',width:width}}>
                                {/*<Text style={{fontSize:18,color:'#222'}}>{personInfo.perName}</Text>*/}
                                <Text style={{fontSize:18,color:'#222'}}>{'dingyiming'}</Text>
                            </View>

                        </View>
                        <View style={{flex:1,padding:12,flexDirection:'row',width:width,alignItems:'center',marginTop:0,
                                borderBottomWidth:1,borderColor:'#888'}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:10}}>
                                <Text style={{fontSize:18,color:'#222'}}>积分:</Text>
                                <Text style={{fontSize:24,color:'#961b1b'}}>
                                    ${personInfo.scoreBalance}
                                </Text>
                            </View>
                            <View style={{flex:2}}></View>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:18,color:'#222'}}>通知:</Text>
                                <Icon name="commenting" size={25} color="#888" style={{marginTop:-40}}/>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{height:height*0.7-96,width:width}}>
                    <View style={{width:width,height:100,padding:12,flexDirection:'row',alignItems:'center'}}>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_info.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>个人资料</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_redBag.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>我的红包</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_credit.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>我的积分</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{width:width,height:100,padding:12,flexDirection:'row',alignItems:'center',marginTop:20}}>
                        <TouchableOpacity style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}
                                          onPress={()=>{

                                              this.navigate2CarOrders();
                                          }}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_carInsurance.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>车险订单</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_life.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>寿险订单</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_serviceOrder.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>服务订单</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{width:width,height:100,padding:12,flexDirection:'row',alignItems:'center',marginTop:20}}>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_gift.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>推荐有礼</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_aboutUs.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>关于我们</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{flex:1,justifyContent:'center',padding:12}]}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Image resizeMode="stretch" source={require('../../img/my_carManage.png')} style={{width:35,height:35}}/>
                                <Text style={{fontSize:17,color:'#222',marginTop:10}}>车辆管理</Text>
                            </View>
                        </View>
                    </View>



                </View>





                <Popover
                    style={{backgroundColor:'#404247'}}
                    isVisible={this.state.menuVisible}
                    fromRect={this.state.buttonRect}
                    displayArea={displayArea}
                    onClose={()=>{this.closePopover()
                        }}>


                    <TouchableOpacity style={[styles.popoverContent,{borderBottomWidth:1,borderBottomColor:'#ddd'}]}
                                      onPress={()=>{
                                              this.closePopover();
                                              this.navigateGroupQuery();
                                          }}>
                        <Text style={[styles.popoverText,{color:'#fff'}]}>查看权限</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.popoverContent]}
                                      onPress={()=>{
                                              this.closePopover();
                                              this.navigateGroupMaintain();
                                          }}>
                        <Text style={[styles.popoverText,{color:'#fff'}]}>密码修改</Text>
                    </TouchableOpacity>

                </Popover>
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
        alignItems:'center'
    },
    popoverContent: {
        width: 140,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popoverText: {
        color: '#ccc',
        fontSize:18
    }
});


module.exports = connect(state=>({
    accessToken:state.user.accessToken,
    personInfo:state.user.personInfo
    })
)(My);

