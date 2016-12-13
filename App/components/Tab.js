/**
 * Created by dingyiming on 2016/12/12.
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


class Tab extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            data:{'label1':{selected:false},'label2':{selected:false}}
           };
    }


    render(){

        var tabItems =[];

        for(var label in this.state.data) {
            var tabItem =
                    <TouchableOpacity
                        onPress={
                                ()=>{
                                    var data=this.state.data;
                                    data[label].selected=true;
                                    this.setState({data:data});
                                }}>
                        <Text>{label}</Text>
                    </TouchableOpacity>
                ;
        }

        return (
            <View style={{flex:1}}>
                <View style={styles.row}>
                    {tabItems}
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



module.exports = Tab;

