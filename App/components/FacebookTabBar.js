import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FacebookTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {


        if(i!=0&&i!=1&&i!=2&&i!=3)
        {
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <Icon
                name={tab}
                size={30}
                color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                ref={(icon) => { this.tabIcons[i] = icon; }}
            />
          </TouchableOpacity>;
        }
        else if(i==1)
        {
          return (
              <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                <Image
                    style={styles.icon}
                    source={require('../img/life_insurance@2x.png')}
                />
                <Text>寿险</Text>
              </TouchableOpacity>
          );
        }else if(i==2) {
          return (
              <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                <Image
                    style={styles.icon}
                    source={require('../img/maintain.png')}
                />
                <Text>维修</Text>
              </TouchableOpacity>
          );
        }else if(i==3) {
          return (
              <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                <Image
                    style={styles.icon}
                    source={require('../img/drivingService.png')}
                />
                <Text>车驾管</Text>
              </TouchableOpacity>
          );
        }else{
          return (
              <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                <Image
                    style={styles.icon}
                    source={require('../img/car_insurance@2x.png')}
                />
                <Text>车险</Text>
              </TouchableOpacity>
                );
        }

      })}
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 65,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth:0
  },
  icon: {
    width: 50,
    height:50,

  }
});

export default FacebookTabBar;
