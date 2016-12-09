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



export default class InsuranceNative extends  Component{
  constructor(props)
  {
      super(props);
      this.state = {selectedTab: 'home'};
  }

  render(){
      return (

            <TabNavigator>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'home'}
                  title="Home"
                  renderIcon={() => <Icon name="home" size={25}/>}
                  renderSelectedIcon={() => <Icon name="home" size={25} color='#00f' />}
                  badgeText="1"
                  onPress={() => this.setState({ selectedTab: 'home' })}>
                <View style={{flex:1,justifyContent:'center'}}>
                  <Text>home</Text>
                </View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'profile'}
                  title="Profile"
                  renderIcon={() => <Icon name="user-o" size={25}/>}
                  renderSelectedIcon={() => <Icon name="user-o" size={25} color='#00f'/>}
                  onPress={() => this.setState({ selectedTab: 'profile' })}>
                <View style={{flex:1,justifyContent:'center'}}>
                  <Text>Profile</Text>
                </View>
              </TabNavigator.Item>
            </TabNavigator>

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
