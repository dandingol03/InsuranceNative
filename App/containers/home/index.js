/**
 * Created by danding on 17/1/27.
 */

import React,{Component} from 'react';

import  {
    AppRegistry,
    StyleSheet,
    ListView,
    Image,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';


class Home extends Component{

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }


    toggleAll(){
        if(this.state.relatedGoods!==undefined&&this.state.relatedGoods!==null)
        {
            var relatedGoods=_.cloneDeep(this.state.relatedGoods);
            if(this.state.selectAll!=true)
            {
                relatedGoods.map(function (good, i){
                    good.checked=true;
                });
            }else{
                relatedGoods.map(function (good, i){
                    good.checked=false;
                });
            }
            var dataSource = this.state.dataSource.cloneWithRows(relatedGoods);
            this.setState({
                relatedGoods: relatedGoods,
                selectAll:!this.state.selectAll,
                dataSource:dataSource
            });
        }
    }

    getCommoditiesByPriceId(priceId){

        var merchantId=this.props.merchantId;
        Proxy.post({
            url:Config.server+'supnuevo/supnuevoGetSupnuevoBuyerCommodityPriceFormListOfGroupMobile.do',
            headers: {
                'Authorization': "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "priceId=" + priceId + "&merchantId=" + merchantId
        },(json)=> {
            var errorMsg=json.errorMsg;
            if(errorMsg !== null && errorMsg !== undefined && errorMsg !== ""){
                alert(errorMsg);

            }else{
                var relatedGoods=json.array;
                if(relatedGoods!==undefined&&relatedGoods!==null)
                {
                    relatedGoods.map(function(good,i) {
                        if (good.priceId == priceId) {
                            good.checked = true;
                        }else{
                            good.checked=false;
                        }
                        if(good.sizeValue!=undefined&&good.sizeValue!=null
                            &&good.sizeUnit!=undefined&&good.sizeUnit!=null)
                        {
                            good.goodName=good.nombre+','+
                                good.sizeValue+','+good.sizeUnit;
                        }else{
                            good.goodName=good.nombre;
                        }
                    });

                    this.setState({relatedGoods: relatedGoods,dataSource:this.state.dataSource.cloneWithRows(relatedGoods)});
                }else{

                }
            }
        }, (err) =>{
            alert(err);
        });



    }


    renderRow(rowData,sectionId,rowId){

        var lineStyle=null;
        if(parseInt(rowId)%2==0)
        {
            lineStyle={flex:1,flexDirection:'row',padding:8,borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,
                borderColor:'#ddd',justifyContent:'flex-start',backgroundColor:'#C4D9FF'};
        }else{
            lineStyle={flex:1,flexDirection:'row',padding:8,borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,
                borderColor:'#ddd',justifyContent:'flex-start',backgroundColor:'#fff'}
        }

        var chebx=null;
        if(rowData.checked==true)
        {
            chebx=<CheckBox
                style={{flex: 1, padding: 2}}
                onClick={()=>{
                      var relatedGoods=_.cloneDeep(this.state.relatedGoods);
                      relatedGoods.map(function(good,i) {
                        if(good.priceId==rowData.priceId)
                            good.checked=false;
                      });
                       this.setState({relatedGoods: relatedGoods,dataSource:this.state.dataSource.cloneWithRows(relatedGoods)});
                }}
                isChecked={true}
                leftText={null}
            />;
        }else{
            chebx=<CheckBox
                style={{flex: 1, padding: 2}}
                onClick={()=>{
                      var relatedGoods=_.cloneDeep(this.state.relatedGoods);
                      relatedGoods.map(function(good,i) {
                        if(good.priceId==rowData.priceId)
                            good.checked=true;
                      });
                       this.setState({relatedGoods: relatedGoods,dataSource:this.state.dataSource.cloneWithRows(relatedGoods)});

                }}
                isChecked={false}
                leftText={null}
            />;
        }


        var row=
            <View>
                <TouchableOpacity onPress={
                    function() {
                        //TODO:
                    }.bind(this)}>
                    <View style={lineStyle}>

                        <View style={{flex:3,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:8}}>
                            {chebx}
                        </View>

                        <View style={{flex:10,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:8}}>
                            <Text style={{color:'#000',fontWeight:'bold',fontSize:18}}>{rowData.codigo+'\n'+rowData.goodName}</Text>
                        </View>

                    </View>
                </TouchableOpacity>

            </View>;

        return row;
    }

    constructor(props)
    {
        super(props);
        this.state = {
            goodInfo:{},
            relatedGoods:null,
            selectAll:false,
            dataSource : new ListView.DataSource({
                rowHasChanged: (r1, r2)=> {
                    if (r1 !== r2) {
                    } else {
                    }
                    return r1 !== r2;
                }
            })
        };
    }


    render(){


        var username='danding';
        var {goodInfo}=this.state;


        return (
            <View style={{flex:1}}>

                {/* header bar */}
                <Image style={styles.logo} source={require('../../img/newBanner@2x.png')} />

                {/* body*/}
                <Image style={{width:width,height:height-290}} source={require('../../img/bkg1@2x.png')}>
                    <View style={{padding:20}}>
                        <View  style={[styles.row]}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image style={[styles.module]} source={require('../../img/car@2x.png')}/>
                                <View style={{marginTop:0,padding:12}}>
                                    <Text style={{fontSize:18,color:'#222'}}>车险</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}
                                              onPress={ ()=>{
                                                   console.log('go into life business');
                                                }}>
                                <Image style={[styles.module]} source={require('../../img/life@2x.png')}/>
                                <View style={{marginTop:0,padding:12}}>
                                    <Text style={{fontSize:18,color:'#222'}}>寿险</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View  style={[styles.row]}>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image style={[styles.module]} source={require('../../img/maintain@2x.png')}/>
                                <View style={{marginTop:0,padding:12}}>
                                    <Text style={{fontSize:18,color:'#222'}}>维修</Text>
                                </View>
                            </View>

                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Image style={[styles.module]} source={require('../../img/drivingService@2x.png')}/>
                                <View style={{marginTop:0,padding:12}}>
                                    <Text style={{fontSize:18,color:'#222'}}>增值服务</Text>
                                </View>
                            </View>
                        </View>


                    </View>
                </Image>



            </View>);
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderBottomWidth: 0,
        shadowColor: '#eee',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    logo:{
        width:width,
        height:290
    },
    module:{
        width:90,
        height:90
    },
    separator: {
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    body:{
        padding:10
    },
    row:{
        flexDirection:'row'
    }
});


module.exports = connect(state=>({
        accessToken:state.user.accessToken
    })
)(Home);

