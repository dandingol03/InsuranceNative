/**
 * Created by dingyiming on 2016/12/14.
 */

import React,{Component} from 'react';

import  {
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    ScrollView,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import GridView from 'react-native-grid-view'
import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');


class UploadLicenseCardModal extends Component{

    close(){
        if(this.props.onClose!==undefined&&this.props.onClose!==null)
        {
            this.props.onClose();
        }
    }

    constructor(props)
    {
        super(props);

        this.state={
            city:null,
            hasPhoto:false,

        }
    }


    render(){

        return (
            <View style={{flex:1,backgroundColor:'#f0f0f0'}}>

                {/*header bar*/}
                <View style={[{backgroundColor:'#11c1f3',padding:4,justifyContent: 'center',alignItems: 'center',flexDirection:'row'},styles.card]}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={
                            ()=>{
                                this.close();
                            }
                        }>
                            <Icon name="times-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:17,flex:3,textAlign:'center',color:'#fff'}}>
                        上传行驶证照片
                    </Text>
                    <View style={{flex:1,marginRight:10,flexDirection:'row',justifyContent:'center'}}>
                    </View>
                </View>

                {/*body*/}
                <View style={{padding:10}}>

                    <View style={[{padding:20,paddingBottom:10,justifyContent: 'center',alignItems: 'center',
                        flexDirection:'row',borderRadius:8,borderWidth:1}]}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../images/licenseCard1.jpg')} style={{width:width-90,height:220,borderRadius:8}}/>
                            <Text style={{fontSize:18,color:'#33c6cd',marginTop:20}}>上传行驶证1面</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
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
        borderBottomColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderTopColor:'#fff'
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
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start'
    },
    item: {
        backgroundColor: '#fff',
        borderRadius:4,
        margin: 3,
        width: 100,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        marginRight:10
    },
    selectedItem:{
        backgroundColor: '#63c2e3',
        borderRadius:4,
        margin: 3,
        width: 100,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        marginRight:10
    },
    listView: {
        paddingTop: 20,
        backgroundColor: 'transparent',
    }
});


module.exports = UploadLicenseCardModal;
