/**
 * Created by danding on 16/11/21.
 */
import React,{Component} from 'react';

import  {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Image,
    Text,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import FacebookTabBar from '../components/FacebookTabBar';
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';
import CarManage from '../components/CarManage';
import CarInsuranceMeal from '../components/CarInsuranceMeal';
var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');



class dym extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    carSelect(){

        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name: 'carManage',
                component: CarManage,
                params: {
                    title: 'carManage'
                }
            })
        }
    }

    mealSelect(){
        const {navigator} =this.props;
        if(navigator) {
            navigator.push({
                name: 'carManage',
                component: CarInsuranceMeal,
                params: {
                    title: 'CarInsuranceMeal'
                }
            })
        }
    }


    render() {

        var carInfo=null;
        const {carSelect}=this.props;
        if(carSelect!==undefined&&carSelect!==null)
            carInfo=
                <Text>
                    {carSelect.carNum}
                </Text>;

        var scrollTab=
            <ScrollableTabView
                style={{marginTop: 20, }}
                initialPage={1}
                renderTabBar={() => <FacebookTabBar />}
                >
            <ScrollView tabLabel="ios-paper" style={styles.tabView}>
                <View style={styles.title}>
                    <Text style={{'fontWeight':'bold',color:'#222'}}>选择车辆</Text>
                </View>

                <View style={{flex:2,padding:10,justifyContent:'center'}}>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#222',flexDirection:'row',alignItems:'center'}}>
                        <View style={{flex:2,paddingTop:8,
                                    flexDirection:'row',paddingBottom:4}}>
                            <Text>车牌:</Text>
                        </View>
                        <View style={{flex:3}}>
                            {carInfo}
                        </View>

                        <View style={{flex:4,justifyContent:'center'}}>

                            <Icon.Button name="automobile" backgroundColor="#3b5998" padding={4} onPress={()=>{
                                        this.carSelect();
                                                }}>
                                选择车辆
                            </Icon.Button>

                        </View>

                    </View>
                </View>
                <View style={{padding:10,flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{
                        this.mealSelect();
                        }}>
                        <View style={{flex:1,marginRight:10,flexDirection:'row',justifyContent:'center',backgroundColor:'#11c1f3',
                                    borderRadius:8,paddingTop:8,paddingBottom:8,paddingLeft:8,paddingRight:8,alignItems:'center'
                                    ,width:width/3}}>
                            <Text style={{color:'#fff',fontSize:12}}>选择套餐</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ScrollView tabLabel="ios-people" style={styles.tabView}>
                <View style={styles.card}>
                    <Text>Friends</Text>
                </View>
            </ScrollView>
            <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
                <View style={styles.card}>
                    <Text>Messenger</Text>
                </View>
            </ScrollView>
            <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
                <View style={styles.card}>
                    <Text>Notifications</Text>
                </View>
            </ScrollView>
        </ScrollableTabView>;

        return (
            <View style={styles.container}>
                    <Image style={styles.thumb} source={ require('../images/banner.png')}/>
                {scrollTab}
            </View>
        )

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabContainer:{
        marginTop: 30
    },
    icon: {
        width: 280,
        height: 280,
        alignSelf: 'center'
    },
    thumb:{
        width:width,
        height:height/3
    },
    tabView: {
        flex: 1,
        padding: 10
    },
    title:{
        padding:10,
        flexDirection:'row',
        justifyContent:'center'
    },
    padding:{
        padding:16
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    }





});


module.exports = connect(state=>({
        carSelect:state.carInfo.carSelect
    })
)(dym);

