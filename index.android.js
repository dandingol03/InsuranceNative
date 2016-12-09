/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import App from './App/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import  TabNavigator from 'react-native-tab-navigator';

import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';

export default class InsuranceNative extends  Component{
    constructor(props)
    {
        super(props);
        this.state = {selectedTab: 'home'};
    }

    render(){
        return (

            <View style={{flex:1}}>
                <Text>android scroll</Text>

                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar/>}>
                    <Text tabLabel='Tab1'/>
                    <Text tabLabel='Tab2'/>
                    <Text tabLabel='Tab3'/>
                    <Text tabLabel='Tab4'/>
                    <Text tabLabel='Tab5'/>
                    <Text tabLabel='Tab6'/>
                </ScrollableTabView>

            </View>

        );
    }
}



const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});



AppRegistry.registerComponent('InsuranceNative', () => App);
