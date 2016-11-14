import React from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Text,
} from 'react-native';


import StatusBarIOS from '../Components/StatusBarIOS';


import Dashboard from '../containers/Dashboard';
import Login from '../containers/Login';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
                auth: false
        };
    }


    render() {

        if(this.state.auth)
        {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBarIOS barStyle="default"/>

                    <Navigator
                        initialRoute={{ name: 'dashboard', component: Dashboard }}

                        configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                        renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                    />
                </View>
            );
        }else{
            return (<Login/>);
        }
    }
}

export default App;