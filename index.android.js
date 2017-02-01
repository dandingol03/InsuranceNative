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
    View,
    Dimensions,
    Alert
} from 'react-native';

import App from './App/index';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Camera from 'react-native-camera';



class InsuranceNative extends Component{

    takePicture() {
        this.camera.capture()
            .then((json) => {
                var data=json.data;
                var path=json.path;
                Alert.alert(
                    'info',
                    'path='+path
                );
            })
            .catch(err => console.error(err));
    }

    constructor(props)
    {
        super(props);
    }

    render(){


        return (
            <View style={{flex:1}}>

                <Camera
                    ref={(cam) => {
                            this.camera = cam;
                          }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});



AppRegistry.registerComponent('InsuranceNative', () => App);
