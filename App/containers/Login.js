/**
 * Created by danding on 16/11/13.
 */

import React from 'react';


var {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Component,
    ActivityIndicatorIOS
} = React;

import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

var Proxy = require('../proxy/Proxy');

class Login extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false
        };
    }

    render(){

        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('image!Octocat')} />
                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({username: text})}
                    style={styles.input}
                    placeholder="input username" />
                <TextInput
                    onChangeText={(text) => this.setState({password: text})}
                    style={styles.input}
                    placeholder="input password"
                    secureTextEntry="true" />
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        登录
                    </Text>
                </TouchableHighlight>



                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader} />
            </View>
        );
    }

    onLoginPressed() {

        console.log('attempting to log in with username: ' + this.state.username);
        this.setState({showProgress: true});

        Proxy.get({
            headers: {
                'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: "grant_type=password&password=" + this.state.password + "&username=" + this.state.username
        }).then(function(results){
            this.setState({
                showProgress: false,
             accessToken:results});

            // if(results.success && this.props.AckHandle) {
            //     this.props.AckHandle();
            // }
        });
    }

}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        color: '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 10
    },
    error: {
        color: 'red',
        paddingTop: 10,
        fontWeight: 'bold'
    }
});


module.exports=Login;