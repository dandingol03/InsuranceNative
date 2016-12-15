/**
 * Created by danding on 16/12/6.
 */

import React,{Component} from 'react';

import  {
    StyleSheet,
    ScrollView,
    Image,
    Text,
    TextInput,
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
import NewCarBind from './modal/NewCarBind';
import {selectCarAction} from '../action/actionCreator';
import Config from '../../config';
var {height, width} = Dimensions.get('window');

class CarManage extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    refresh(){
        this.fetchData();
    }

    search(){
        if(this.state.filter!==undefined&&this.state.filter!==null&&this.state.filter!='')
        {
            Proxy.post({
                url:Config.server+'/svr/request',
                headers: {
                    'Authorization': "Bearer " + this.state.accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request:'fetchInsuranceCarInfoByCustomerId',
                    info:{
                        carNum:this.state.filter
                    }
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
                    this.setState({dataSource: ds.cloneWithRows(data),data:data});
                }
            }, (err) =>{
            });
        }else{
            Alert.alert(
                'info',
                '请输入搜索条件后再点击搜索'
            );
        }
    }

    carSelect(){
        var car=null;
        this.state.data.map(function (item,i) {
            if(item.checked==true)
                car=item;
        });
        if(car!==undefined&&car!==null)
        {
            const {dispatch} = this.props;
            dispatch(selectCarAction(car));
            this.goBack();
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    fetchData(){
        Proxy.post({
            url:Config.server+'/svr/request',
            headers: {
                'Authorization': "Bearer " + this.state.accessToken,
                'Content-Type': 'application/json'
            },
            body: {
                request:'fetchInsuranceCarInfoByCustomerId',

                info:{carNum:''}
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
                this.setState({dataSource: ds.cloneWithRows(data),data:data});
            }
        }, (err) =>{
        });
    }


    renderRow(rowData){

        var tickOff=null;
        if(rowData.idle==true)
        {
            tickOff=
                    <View style={{flex:2}}>
                        <TouchableOpacity onPress={
                            function() {
                          this.state.data.map(function(item,i) {
                              if(item.carId==rowData.carId)
                                  item.checked=!item.checked;
                            });
                              var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                            this.setState({dataSource: ds.cloneWithRows(this.state.data),data:this.state.data});
                        }.bind(this)}>
                        {
                            rowData.checked==true?<Icon name="check-square-o" size={30}></Icon>:<Icon name="square-o" size={30}></Icon>
                        }
                        </TouchableOpacity>
                    </View>;

        }else{
            tickOff=
                <View style={{flex:2}}>
                    <Icon name="times" size={30}></Icon>
                </View>
        }

        var row=
            <View style={{flex:1,padding:10,borderBottomWidth:1,borderBottomColor:'#00f'}}>
                <View style={{flexDirection:'row',flex:1}}>
                    {tickOff}
                    <View style={{flex:6,flexDirection:'row',alignItems:'flex-end'}}>
                        <View>
                            <Text>{rowData.carNum}</Text>
                            <Text>{rowData.firstRegisterDate}</Text>
                        </View>
                    </View>
                    <View style={{flex:2,flexDirection:'row'}}>
                        <Text>详细</Text>
                        <Icon name="chevron-right" size={30}></Icon>
                    </View>
                </View>
            </View>;

        return row;
    }

    constructor(props)
    {
        super(props);
        const { accessToken } = this.props;
        this.state = {
            accessToken: accessToken,modalVisible:false,carNum:null,
            filter:null
        };
    }

    render(){

        var listView=null;

        if(this.state.dataSource!==undefined&&this.state.dataSource!==null)
        {

            listView=
                <ScrollView>
                    <ListView
                        automaticallyAdjustContentInsets={false}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </ScrollView>;
        }else{
            this.fetchData();
        }

        return (
            <View style={{flex:1}}>
                <View style={[{padding: 10,marginTop:20,justifyContent: 'center',alignItems: 'center',flexDirection:'row'},styles.card]}>
                    <TouchableOpacity onPress={()=>{
                        this.goBack();
                    }}>
                        <Image source={require('../images/icon_back.png')} style={{width:30,height:30}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:17,flex:3,textAlign:'center'}}>
                        车辆管理
                    </Text>
                    <TouchableOpacity onPress={()=>{
                        this.carSelect();
                        }}>
                        <View style={{flex:1,marginRight:10,flexDirection:'row',justifyContent:'center',backgroundColor:'#11c1f3',
                                    borderRadius:8,paddingTop:4,paddingBottom:4,paddingLeft:10,paddingRight:10,alignItems:'center'}}>
                            <Text style={{color:'#fff',fontSize:12}}>确定选择</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >

                    <NewCarBind
                        onClose={()=>{
                            this.setModalVisible(!this.state.modalVisible)
                        }}
                        navigator={this.props.navigator}
                        onRefresh={()=>{
                            this.refresh();
                        }}
                        accessToken={this.props.accessToken}
                    />

                </Modal>

                <View style={{flex:2,paddingLeft:20,paddingRight:20,paddingTop:4,paddingBottom:4,alignItems:'center',flexDirection:'row'}}>
                    <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1}}>
                        <View style={{flex:2,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{'fontSize':16}}> 车牌:</Text>
                        </View>
                        <View style={{flex:5}}>
                            <TextInput
                                style={{height: 42}}
                                onChangeText={(filter) => this.setState({filter})}
                                value={this.state.filter}
                                placeholder='请输入您要搜索的车牌号'
                                placeholderTextColor="#aaa"
                                underlineColorAndroid="transparent"
                            />
                        </View>

                        <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>{
                                    this.search();
                            }}>
                                <Icon name="search" size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{flex:14,padding:15}}>
                    {listView}
                </View>

                <View style={{flex:1,padding:16,height:60,flexDirection:'row',justifyContent:'center'}}>
                    <View style={{width:width/3}}>
                        <Icon.Button name="hand-o-up" backgroundColor="#3b5998" onPress={
                            ()=>{
                                this.setModalVisible(true);
                            }
                        }>
                            <Text style={{fontFamily: 'Arial', fontSize: 15,textAlign:'center'}}>
                                创建新车
                            </Text>
                        </Icon.Button>
                    </View>
                </View>
            </View>)
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
    row:{
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:8,
        paddingBottom:8,
        height:50,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    }
});


module.exports = connect(state=>({
        accessToken:state.user.accessToken
})
)(CarManage);
