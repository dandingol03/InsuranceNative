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
        this.state = {accessToken: accessToken,
                        city:null,
                        carNum:null,
                        carNumPrefixModal:false};
    }


    render(){

        return (
            <View style={{flex:1}}>

                <View style={[{backgroundColor:'#444',padding: 10,justifyContent: 'center',alignItems: 'center',flexDirection:'row'},styles.card]}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{
                        this.goBack();
                            }}>
                            <Icon name='chevron-left' size={30} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:17,flex:3,textAlign:'center',color:'#fff'}}>
                        创建新车
                    </Text>
                </View>

                <View style={{flex:2,padding:10}}>
                    <View style={styles.row}>
                        <View style={{marginRight:20}}>
                            <Icon name="map-marker" size={24}/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{'fontSize':16}}>用车城市:</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text>{this.state.city}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={
                                    ()=>{
                                        this.appendCarNumPrefixByCity(true);
                                    }}>
                                <Icon name="chevron-right" size={24}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{marginRight:20}}>
                            <Icon name="address-card-o" size={24}/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{'fontSize':16}}>车牌:</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text>{this.state.carNum}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{marginRight:20}}>
                            <Icon name="address-card-o" size={24}/>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{'fontSize':16}}>姓名:</Text>
                        </View>
                        <View style={{flex:3}}>
                            <TextInput
                                style={{height: 24}}
                                onChangeText={(ownerName) => this.setState({ownerName})}
                                value={this.state.ownerName}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{marginRight:20}}>
                            <Icon name="address-card-o" size={24}/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{'fontSize':16}}>发证日期:</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text>{this.state.carNum}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{marginRight:20}}>
                            <Icon name="address-card-o" size={24}/>
                        </View>
                        <View style={{flex:2}}>
                            <Text style={{'fontSize':16}}>是一年内过户的二手车吗:</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text>{this.state.carNum}</Text>
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
        paddingTop:8,
        paddingBottom:8,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    }



});



module.exports = connect(state=>({
        accessToken:state.user.accessToken
    })
)(UpdateCarInfo);

