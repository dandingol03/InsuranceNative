/**
 * Created by danding on 16/12/6.
 */

import React,{Component} from 'react';

import  {
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

class CarManage extends Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>carManage</Text>
            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


module.exports = CarManage;
