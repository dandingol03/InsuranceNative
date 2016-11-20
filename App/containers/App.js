import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TabBarIOS,
    Navigator
} from 'react-native';


import { connect } from 'react-redux';

import StatusBarIOS from '../components/StatusBarIOS';
import Tab from '../containers/Tab';
import Login from '../containers/Login';


import FontAwesome from "react-native-vector-icons/FontAwesome";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Home from './Home';
import Me from './Me';
import GaHome from './GaHome';
import GaOrder from './GaOrder';


const tabBarTintColor = '#f8f8f8';// 标签栏的背景颜色
const tabTintColor = '#3393F2'; // 被选中图标颜色



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            tab:'product'
        }
    }

    _createTabbarItem(route,icon){

        var component=Home;
        switch (route) {
            case 'me':
             component=Me;
                break;
            case 'product':
                break;
            case 'ga':
                component=GaHome;
                break;
            case 'gaOrder':
                component=GaOrder;
                break;
            default:
                break;
        }


        return (

            <FontAwesome.TabBarItem
                title=""
                iconName={icon}
                selectedIconName={icon}
                selected={this.state.tab === route}
                onPress={() => {
                        this.setState({
                            tab: route,
                        });
                    }}>
                <Navigator
                    initialRoute={{ name: 'home', component:component }}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                      }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                      }} />
            </FontAwesome.TabBarItem>
        );

    }



    render() {
        let auth=this.props.auth;
        if(auth==true)
        {
            return (
                <TabBarIOS
                    ref='tabbar'
                    tintColor={tabTintColor}
                    barTintColor={tabBarTintColor}>
                    {this._createTabbarItem('product','dribbble')}
                    {this._createTabbarItem('me','trophy')}
                    {this._createTabbarItem('ga','meetup')}
                    {this._createTabbarItem('gaOrder','list-alt')}
                </TabBarIOS>
            );
        }else{
            return (<Login/>);
        }
    }
}

var styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    container:{
        flex: 1,
        alignItems:'center',
        marginTop:60
    },
    text: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:16,
        textAlign:'center'
    },
    wrapper:{

    },
    slide1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#9DD6EB'
    },
    slide2:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#97CAE5'
    },
    slide3:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#92BBD9'
    }
});



export default connect(
    (state) => ({
        auth: state.user.auth
    })
)(App);

