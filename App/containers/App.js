import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TabBarIOS
} from 'react-native';


import { connect } from 'react-redux';

import StatusBarIOS from '../components/StatusBarIOS';
import Tab from '../containers/Tab';
import Login from '../containers/Login';


import FontAwesome from "react-native-vector-icons/FontAwesome";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Swiper from 'react-native-swiper';
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
                <View style={styles.container}>


                        <ScrollableTabView
                            style={{marginTop:20}}
                            renderTabBar={() => <DefaultTabBar />}
                        >
                            <View tabLabel="tab1" style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                <Swiper style={styles.wrapper} showButtons={true}>
                                    <View style={styles.slide1}>
                                        <Text style={styles.text}>slide 1</Text>
                                    </View>
                                    <View style={styles.slide2}>
                                        <Text style={styles.text}>slide 2</Text>
                                    </View>
                                    <View style={styles.slide3}>
                                        <Text style={styles.text}>slide 3</Text>
                                    </View>
                                </Swiper>


                            </View>
                            <View tabLabel="tab2" style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text tabLabel="tab 2" >tab 2</Text>
                            </View>
                            <View tabLabel="tab3" style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Text tabLabel="tab 3" >tab 3</Text>
                            </View>
                        </ScrollableTabView>

                </View>
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
        flex: 1 ,
        alignItems:'center',
        justifyContent:'center'
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
    },
    text:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold'
    }
});



export default connect(
    (state) => ({
        auth: state.user.auth
    })
)(App);

