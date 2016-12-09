/**
 * Created by danding on 16/12/6.
 */

import React,{Component} from 'react';

import  {
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');


class AppendCarNumPrefixModal extends Component{

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
        }
    }

    render(){


        return (
            <View style={{flex:1}}>
                <View style={[{backgroundColor:'#444',padding: 10,justifyContent: 'center',alignItems: 'center',flexDirection:'row'},styles.card]}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{
                        this.close();
                            }}>
                            <Icon name='chevron-left' size={30} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:17,flex:3,textAlign:'center',color:'#fff'}}>
                        绑定新车
                    </Text>
                    <View style={{flex:1,marginRight:10,flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity onPress={
                            ()=>{
                                this.close();
                            }
                        }>
                            <Icon name="times-circle" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.row}>
                        <View style={{marginRight:10}}>
                            <Icon name="map-marker" size={24}/>
                        </View>
                        <View style={{flex:2,flexDirection:'row',alignItems:'flex-end'}}>
                            <Text style={{'fontSize':16}}>用车城市:</Text>
                        </View>
                        <View style={{flex:2}}>
                            <Text>{this.state.city}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity onPress={
                            ()=>{
                                this.close();
                            }}>
                                <Icon name="chevron-right" size={24}></Icon>
                            </TouchableOpacity>
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
    }
});


module.exports = AppendCarNumPrefixModal;
