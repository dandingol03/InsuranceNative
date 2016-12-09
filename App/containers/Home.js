/**
 * Created by danding on 16/11/20.
 */

import React from 'react';

import  {
    AppRegistry,
    Component,
    StyleSheet,
    ListView,
    Image,
    Text,
    View
} from 'react-native';


import { connect } from 'react-redux';

import JobList from '../data/JobList';
import JobCell from '../components/JobCell';
import  JobDetail from '../components/JobDetail';

var Home=React.createClass({


    _genRows:function () {
        return JobList;
    },
    selectJob(job){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'JobDeail',
                component: JobDetail,
                params: {
                    job: job
                }
            })
        }
    },

    _renderRow:function(jobData: Object, sectionID: number, rowID: number) {

        return (
            <JobCell onSelect={() => this.selectJob(jobData)}  jobData={jobData}/>
        );
    },
    getInitialState:function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ({
            dataSource: ds.cloneWithRows(this._genRows({}))
        });
    },
    render:function () {
        var resultList =
            <ListView
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
            />;

        return (
            <View style={styles.container}>
                {resultList}
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#EEE',
        paddingBottom: 0,
    },
});


export default connect(
)(Home);

