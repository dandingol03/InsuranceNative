/**
 * Created by danding on 16/11/13.
 */

import React from 'react';


var {
    Component
} = React;

import {
    Image,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
    TabBarIOS
} from 'react-native';

import { connect } from 'react-redux';

import {loginAction} from '../action/actionCreator';
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

                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <Image style={styles.logo} source={require('../img/Octocat.png')} />

                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TextInput
                        onChangeText={(text) => this.setState({username: text})}
                        style={styles.input}
                        placeholder="input username" />
                </View>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TextInput
                        onChangeText={(text) => this.setState({password: text})}
                        style={styles.input}
                        placeholder="input password"
                        secureTextEntry={true} />
                </View>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableHighlight
                        onPress={this.onLoginPressed.bind(this)}
                        style={styles.button}>
                        <Text style={styles.buttonText}>
                            登录
                        </Text>
                    </TouchableHighlight>
                </View>

                <ActivityIndicator
                    animating={this.state.showProgress}
                    style={[styles.loader, {height: 80}]}
                    size="large"
                />




            </View>
        );
    }

    onLoginPressed() {

        console.log('attempting to log in with username: ' + this.state.username);
        this.setState({showProgress: true});

        const {dispatch} = this.props;
        dispatch(loginAction(this.state.username,this.state.password));

    }

    componentDidMount() {
    }

}
export default connect(
)(Login);




var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    logo: {
        width: 160,
        height: 200
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        width:240,
        justifyContent:'center',
        height: 36,
        marginTop: 10,
        padding: 4,
        fontSize: 12,
        borderWidth: 1,
        borderColor: '#48bbec',
        color: '#48bbec'
    },
    button: {
        width:240,
        height: 40,
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
