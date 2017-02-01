/**
 * Created by dingyiming on 2017/1/30.
 */
/**
 * Created by danding on 17/1/27.
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



class Life extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
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

    saveLifeInsuranceIntend(){



    }



    constructor(props)
    {
        super(props);
        const { accessToken } = this.props;
        this.state = {
            accessToken: accessToken,
            insure:{perName:''},
            insuranceder:{perName:''},
            benefiter:{perName:''},
            insuranceType:null,
            hasSocietyInsurance:false,
            hasCommerceInsurance:false,
            planInsuranceFee:null,
            insuranceTypeButtons:['取消','重疾险','意外险','养老险','理财险','医疗险']
        };
    }


    render(){
        var insuranceType = this.state.insuranceType;
        var hasSocietyInsurance= this.state.hasSocietyInsurance;
        var hasCommerceInsurance= this.state.hasCommerceInsurance;

        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        const insuranceTypeButtons=['取消','重疾险','意外险','养老险','理财险','医疗险'];

        return (

            <View style={{flex:1}}>
                <View style={[{padding: 10,justifyContent: 'center',alignItems: 'center',flexDirection:'row',height:60,backgroundColor:'rgba(17, 17, 17, 0.6)'},styles.card]}>
                    <TouchableOpacity onPress={()=>{
                        this.goBack();
                    }}>
                        <Image source={require('../images/icon_back.png')} style={{width:20,height:30,color:'#fff'}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:20,flex:3,textAlign:'center',color:'#fff'}}>
                        填写寿险意向
                    </Text>
                </View>

                {/*body*/}
                <Image resizeMode="stretch" source={require('../img/login_background@2x.png')} style={{width:width,height:height-23}}>
                    <View style={{padding:10,padding:20}}>

                        {/*投保人*/}
                        <View style={[styles.row,{borderBottomWidth:1,borderColor:'#aaa',borderBottomColor:'#aaa',padding:12}]}>

                            <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,flex:3,textAlign:'left',}}>投保人:</Text>
                            </View>

                            <View style={{flex:5,padding:5,justifyContent:'center'}}>
                                <TextInput
                                    style={{height: 50,fontSize:16}}
                                    onChangeText={(insurename) =>
                                    {
                                       this.state.insure.perName=insurename;
                                       var insure =  this.state.insure;
                                       this.setState({insure:insure});
                                }}
                                    value={this.state.insure.perName}
                                    placeholder='谁交保费'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>

                            <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{
                                         console.log('选择投保人')
                                      }}>
                                <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:40,width:60,textAlign:'left',backgroundColor:'rgba(17, 17, 17, 0.6)',margin:10,borderRadius:5}}>
                                        <Text style={{fontSize:16,flex:3,textAlign:'center',color:'#fff',paddingTop:10}}>选择</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>

                        {/*被保险人*/}
                        <View style={[styles.row,{borderBottomWidth:1,borderColor:'#aaa',borderBottomColor:'#aaa',padding:12}]}>

                            <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,flex:3,textAlign:'left',}}>被保险人:</Text>
                            </View>
                            <View style={{flex:5,padding:5,justifyContent:'center'}}>
                                <TextInput
                                    style={{height: 50,fontSize:16}}
                                    onChangeText={(insurancedername) =>
                                    {
                                       this.state.insuranceder.perName=insurancedername;
                                       var insuranceder =  this.state.insuranceder;
                                       this.setState({insuranceder:insuranceder});
                                }}
                                    value={this.state.insuranceder.perName}
                                    placeholder='谁享受保障'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>

                            <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{
                                         console.log('选择被保险人')
                                      }}>
                                <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:40,width:60,textAlign:'left',backgroundColor:'rgba(17, 17, 17, 0.6)',margin:10,borderRadius:5}}>
                                        <Text style={{fontSize:16,flex:3,textAlign:'center',color:'#fff',paddingTop:10}}>选择</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/*受益人*/}
                        <View style={[styles.row,{borderBottomWidth:1,borderColor:'#aaa',borderBottomColor:'#aaa',padding:12}]}>

                            <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,flex:3,textAlign:'left',}}>受益人:</Text>
                            </View>
                            <View style={{flex:5,padding:5,justifyContent:'center'}}>
                                <TextInput
                                    style={{height: 50,fontSize:16}}
                                    onChangeText={(benefitername) =>
                                    {
                                       this.state.benefiter.perName=benefitername;
                                       var benefiter =  this.state.benefiter;
                                       this.setState({benefiter:benefiter});
                                }}
                                    value={this.state.benefiter.perName}
                                    placeholder='谁领取保险金'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{
                                         console.log('选择受益人')
                                      }}>
                                <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <View style={{height:40,width:60,textAlign:'left',backgroundColor:'rgba(17, 17, 17, 0.6)',margin:10,borderRadius:5}}>
                                        <Text style={{fontSize:16,flex:3,textAlign:'center',color:'#fff',paddingTop:10}}>选择</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>


                        {/*需要的保障*/}
                        <View style={[styles.row,{borderBottomWidth:1,borderColor:'#aaa',borderBottomColor:'#aaa',padding:12}]}>

                            <View style={{flex:4,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,flex:3,textAlign:'left',}}>需要的保障:</Text>
                            </View>
                            <View style={{flex:5,padding:5,justifyContent:'center'}}>
                                {
                                    insuranceType==undefined||insuranceType==null?
                                        <Text style={{fontSize:16,color:"#aaa"}}>请选择需要的保障</Text>:
                                        <Text style={{fontSize:16}}>{insuranceType}</Text>

                                }
                            </View>
                            <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity style={{justifyContent:'center'}}
                                                  onPress={()=>{ this.show('actionSheet1'); }}>
                                    <Icon name="chevron-circle-down" color="#aaa" size={30}></Icon>
                                    <ActionSheet
                                        ref={(o) => {
                                        this.actionSheet1 = o;
                                    }}
                                        title="请选择需要的保障类型"
                                        options={insuranceTypeButtons}
                                        cancelButtonIndex={CANCEL_INDEX}
                                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                        onPress={
                                        (data)=>{ this._handlePress1(data); }
                                    }
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*有无社保*/}
                        <View style={[styles.row,{borderBottomWidth:1,borderColor:'#aaa',borderBottomColor:'#aaa',padding:12}]}>

                            <View style={{flex:4,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,flex:3,textAlign:'left',}}>有无社保:</Text>
                            </View>
                            {
                                hasSocietyInsurance==false?
                                    <View style={{flex:5,padding:5,justifyContent:'center'}}>
                                        <Text style={{fontSize:16}}>无</Text>
                                    </View>:
                                    <View style={{flex:5,padding:5,justifyContent:'center'}}>
                                        <Text style={{fontSize:16}}>有</Text>
                                    </View>

                            }
                            {
                                hasSocietyInsurance==false?

                                <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                                  onPress={()=>{
                                         this.setState({hasSocietyInsurance:true});
                                      }}>

                                    <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="circle-o" color="#aaa" size={30}></Icon>
                                    </View>
                                </TouchableOpacity>:
                                <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                                  onPress={()=>{
                                         this.setState({hasSocietyInsurance:false});
                                      }}>

                                    <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="circle" color="#aaa" size={30}></Icon>
                                    </View>
                                </TouchableOpacity>
                            }

                        </View>

                        {/*有无商业保险*/}
                        <View style={[styles.row,{borderBottomWidth:1,borderColor:'#aaa',borderBottomColor:'#aaa',padding:12}]}>

                            <View style={{flex:6,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,flex:3,textAlign:'left',}}>有无商业保险:</Text>
                            </View>

                            {
                                hasCommerceInsurance==false?
                                    <View style={{flex:3,padding:5,justifyContent:'center'}}>
                                        <Text style={{fontSize:16,}}>无</Text>
                                    </View>:
                                    <View style={{flex:3,padding:5,justifyContent:'center'}}>
                                        <Text style={{fontSize:16,}}>有</Text>
                                    </View>

                            }
                            {
                                hasCommerceInsurance==false?

                                    <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                                      onPress={()=>{
                                         this.setState({hasCommerceInsurance:true});
                                      }}>

                                        <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <Icon name="circle-o" color="#aaa" size={30}></Icon>
                                        </View>
                                    </TouchableOpacity>:
                                    <TouchableOpacity style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                                      onPress={()=>{
                                         this.setState({hasCommerceInsurance:false});
                                      }}>

                                        <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                            <Icon name="circle" color="#aaa" size={30}></Icon>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View>

                        {/*计划保费*/}
                        <View style={[styles.row,{borderBottomWidth:1,borderColor:'#aaa',borderBottomColor:'#aaa',padding:12}]}>

                            <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,flex:3,textAlign:'left',}}>计划保费:</Text>
                            </View>
                            <View style={{flex:5,padding:5,justifyContent:'center'}}>
                                <TextInput
                                    style={{height: 50,fontSize:16}}
                                    onChangeText={(planFee) =>
                                    {
                                       this.state.planInsuranceFee=planFee;
                                       var planInsuranceFee =  this.planInsuranceFee;
                                       this.setState({planInsuranceFee:planInsuranceFee});
                                }}
                                    value={this.state.planInsuranceFee}
                                    placeholder='请输入...'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>

                    </View>


                    <TouchableOpacity style={{height:50,width:180,flexDirection:'row',justifyContent:'center',alignItems:'center',
                                  backgroundColor:'rgba(17, 17, 17, 0.6)',borderRadius:8,marginLeft:120}}
                                      onPress={()=>{
                                         this.saveLifeInsuranceIntend();
                                      }}>
                        <View style={{height:50,width:180,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:19,color:'#fff'}}>提交寿险意向</Text>
                        </View>

                    </TouchableOpacity>
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
        height: 50,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
});


module.exports = connect(state=>({
        accessToken:state.user.accessToken
    })
)(Life);

