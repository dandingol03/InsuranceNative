/**
 * Created by danding on 16/12/6.
 */

import React,{Component} from 'react';

import  {
    StyleSheet,
    ScrollView,
    Image,
    Text,
    View,
    ListView,
    Alert,
    TouchableOpacity,
    Dimensions,
    Modal,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
var Proxy = require('../proxy/Proxy');
import { connect } from 'react-redux';
import Config from '../../config';
var {height, width} = Dimensions.get('window');
import { AppRegistry, TextInput } from 'react-native';


class UpdateCarInfo extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    close(){

        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }

    }


    fetchData(){
        Proxy.post({
            url:Config.server+'/svr/request',
            headers: {
                'Authorization': "Bearer " + this.state.accessToken,
                'Content-Type': 'application/json'
            },
            body: {
                request:'fetchInsuranceCarInfoByCustomerId'
            }
        },(res)=> {
            if(res.error)
            {
                Alert.alert(
                    'error',
                    res.error_description
                );
            }else{
                var data=res.data;
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({dataSource: ds.cloneWithRows(data)});
            }
        }, (err) =>{
        });
    }


    constructor(props)
    {
        super(props);
        const { accessToken } = this.props;
        this.state = {
            accessToken: accessToken,
            city:null,
            carNum:null
        };
    }


    render(){

        return (
            <View style={{flex:1}}>

                <View style={[{backgroundColor:'#444',padding: 4,justifyContent: 'center',alignItems: 'center',flexDirection:'row'},styles.card]}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{
                        this.goBack();
                            }}>
                            <Icon name='chevron-left' size={30} color="#444"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:17,flex:3,textAlign:'center',color:'#444'}}>
                        创建新车
                    </Text>
                    <View style={{flex:1,marginRight:10,flexDirection:'row',justifyContent:'center'}}>
                    </View>
                </View>

                <View style={{padding:10}}>
                    <View style={[styles.row,{alignItems:'center'}]}>
                        <View style={{flex:1,marginRight:20}}>
                            <Icon name="map-marker" size={20}/>
                        </View>
                        <View style={{flex:4}}>
                            <Text style={{'fontSize':13}}>用车城市:</Text>
                        </View>
                        <View style={{flex:3,flexDirection:'row',alignItems:'center'}}>
                            <Text>{this.state.city}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={
                                    ()=>{
                                        this.appendCarNumPrefixByCity(true);
                                    }}>
                                <Icon name="chevron-right" size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{flex:1,marginRight:20,justifyContent:'center'}}>
                            <Icon name="car" size={18}/>
                        </View>
                        <View style={{flex:2,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{'fontSize':13}}>车牌:</Text>
                        </View>
                        <View style={{flex:6}}>
                            <TextInput
                                style={{height: 40}}
                                onChangeText={(carNum) => this.setState({carNum})}
                                value={this.state.carNum}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{flex:1,marginRight:20,justifyContent:'center'}}>
                            <Icon name="id-card" size={20}/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{'fontSize':13}}>姓名:</Text>
                        </View>
                        <View style={{flex:6}}>
                            <TextInput
                                style={{height: 24}}
                                onChangeText={(ownerName) => this.setState({ownerName})}
                                value={this.state.ownerName}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{flex:1,marginRight:20,justifyContent:'center'}}>
                            <Icon name="calendar" size={20}/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{'fontSize':13}}>发证日期:</Text>
                        </View>
                        <View style={{flex:6}}>
                            <Text>{this.state.carNum}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{flex:1,marginRight:20,justifyContent:'center'}}>
                            <Icon name="info" size={20}/>
                        </View>
                        <View style={{flex:8}}>
                            <Text style={{'fontSize':13}}>是一年内过户的二手车吗:</Text>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={
                                    ()=>{
                                        this.setState({carTransferred:!this.state.carTransferred});
                                    }}>
                                {
                                    this.state.carTransferred==true?
                                        <Icon name="check-circle" size={20}/>:<Icon name="circle-o" size={20}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>





                </View>

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
        borderTopWidth:0,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
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
        borderBottomWidth:1,
        borderBottomColor:'#222'
    }



});



module.exports = connect(state=>({
        accessToken:state.user.accessToken
    })
)(UpdateCarInfo);

