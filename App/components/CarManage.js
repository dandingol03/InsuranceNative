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
import Config from '../../config';
var {height, width} = Dimensions.get('window');

class CarManage extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
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
                info:{carNum:this.state.carNum}
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


    renderRow(rowData){

        var row=
            <View style={{flex:1,padding:10,borderBottomWidth:1,borderBottomColor:'#00f'}}>
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{flex:2}}>
                        <Icon name="times" size={30}></Icon>
                    </View>
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
            accessToken: accessToken,modalVisible:false,carNum:null};
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
                        renderRow={this.renderRow}
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
                    <View style={{flex:1,marginRight:10,flexDirection:'row',justifyContent:'center'}}>
                        <Icon name="plus-square" size={30} color="#00f" />
                    </View>
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
                    />

                </Modal>

                <View style={{flex:1,paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10}}>
                    <View style={styles.row}>
                        <View style={{flex:2,flexDirection:'row',alignItems:'flex-end'}}>
                            <Text style={{'fontSize':16}}> 车牌:</Text>
                        </View>
                        <View style={{flex:6}}>
                            <TextInput
                                style={{height: 40}}
                                onChangeText={(carNum) => this.setState({carNum})}
                                value={this.state.carNum}
                            />
                        </View>

                        <View style={{flex:2,marginTop:15,textAlign:'center'}}>
                            <TouchableOpacity onPress={()=>{
                        this.goBack();
                            }}>
                                <Icon name="search" size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{flex:4,padding:15}}>
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
