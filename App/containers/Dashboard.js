/**
 * Created by danding on 16/11/13.
 */

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

class Dashboard extends React.Component
{

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.heading}>
                    welcome aboard
                </Text>
            </View>);
    }
}

var styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        marginTop: 10
    }
});


export default Dashboard;