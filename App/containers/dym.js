/**
 * Created by danding on 16/11/21.
 */
import React,{Component} from 'react';

import  {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Image,
    Text,
    View
} from 'react-native';

import { connect } from 'react-redux';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');



class dym extends Component{
    constructor(props) {
        super(props);
        this.state = {};}


    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <Image style={styles.thumb} source={ require('../images/banner.png')}/>
                </View>
                <View style={{flex:2}}>
                    <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar/>}
                        tabBarUnderlineColor='#FF0000'
                        tabBarBackgroundColor='#FFFFFF'
                        tabBarActiveTextColor='#9B30FF'
                        tabBarInactiveTextColor='#7A67EE'
                        tabBarTextStyle={{fontSize: 18}}
                    >
                        <View tabLabel='Tab1'>
                            <carInsurance>
                                tab1
                            </carInsurance>
                        </View>
                        <View tabLabel="Tab2">
                            <Text>
                                tab2
                            </Text>
                        </View>
                        <View tabLabel="Tab3">
                            <Text>
                                tab3
                            </Text>
                        </View>
                        <View tabLabel="Tab4">
                            <Text>
                                tab4
                            </Text>
                        </View>

                    </ScrollableTabView>
                </View>

            </View>
        )

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumb:{
        width:width,
        height:height/3
    }





});


module.exports = connect(
)(dym);

