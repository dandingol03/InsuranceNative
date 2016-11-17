/**
 * Created by danding on 16/11/13.
 */

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';


var  Dashboard = React.createClass({

    render:function () {
        return (
            <View style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.heading}>
                    welcome aboard
                </Text>
            </View>);
    }
});


var styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        marginTop: 10
    }
});


module.exports= Dashboard;