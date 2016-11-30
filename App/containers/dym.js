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
    View
} from 'react-native';

import { connect } from 'react-redux';

var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');



class dym extends Component{
    constructor(props) {
        super(props);
        this.state = {};}


    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <Image style={styles.thumb} source={ require('../images/banner.png')}/>
                </View>
                <View style={{flex:2}}>
                    <Text>
                        试一试
                    </Text>
                </View>

            </View>
        )

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumb:{
        width:width,
        height:height/3
    }
});


module.exports = connect(
)(dym);

