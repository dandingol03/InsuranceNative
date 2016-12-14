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
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

class InsuranceNative extends Component{

    constructor(props)
    {
        super(props);
    }

    render(){


        return (
            <View style={{flex:1}}>
                <ScrollableTabView
                    style={{marginTop: 20, }}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <Text tabLabel='Tab #1'>My</Text>
                    <Text tabLabel='Tab #2 word word'>favorite</Text>
                    <Text tabLabel='Tab #3 word word word'>project</Text>
                    <Text tabLabel='Tab #4 word word word word'>favorite</Text>
                    <Text tabLabel='Tab #5'>project</Text>
                </ScrollableTabView>
            </View>
        );
    }
}



AppRegistry.registerComponent('InsuranceNative', () => App);
