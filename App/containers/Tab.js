/**
 * Created by danding on 16/11/15.
 */
import React from 'react';


import {
    View,
    StyleSheet,
    Text,
    Navigator,
    TabBarIOS
} from 'react-native';

var Dashboard = require('../containers/Dashboard');

class Tab extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            selectedTab: "dashboard"
        };
    }



    render(){
        return (

            <View style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
                <Text style={styles.heading}>
                    welcome to dashboard panel
                </Text>
            </View>

           );
    }

}

var styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    container:{
        flex: 1 ,
        alignItems:'center',
        justifyContent:'center'
    }
});




module.exports=Tab;