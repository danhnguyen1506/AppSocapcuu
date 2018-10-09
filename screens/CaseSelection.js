import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import { YellowBox } from 'react-native';

var {width, height} = Dimensions.get('window')

class CaseSelection extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle:{
          backgroundColor:'white',
          marginBottom: -15,
          height: 0
        },
      })

    constructor(props) {
      super(props)
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    }

        render() {
            return (
              <View style={styles.container}>
                <View style={styles.headerTitle}>
                  <Text style={[styles.buttonText,{bottom: 55}]}>HƯỚNG DẪN CẤP TỐC</Text>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
                  onPress = {() => this.props.navigation.goBack()}>
                    <Icon name = 'ios-undo' type='ionicon' size={35}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-start', right: 20}}
                  onPress = {() => this.props.navigation.navigate('Login')}>
                    <Icon name = 'home' type='entyco' size={35}/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Unconscious1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/battinh.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Bất tỉnh</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bleeding1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/chaymau.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Chảy máu</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Burn1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/vetbong.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Bỏng/Phỏng</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bone1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/xuongkhop.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Gãy xương</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Stroke1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/dotquy.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Đột quỵ</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Heart1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/nhoimaucotim.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Nhồi máu cơ tim</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Electricshock1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/diengiat.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Điện giật</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Drown1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/duoinuoc.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Đuối nước</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Chocking1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/hoc.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Hóc</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bite')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/rancan.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Vết cắn, chích</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Poison')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/nhiemdoctrenda.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Nhiễm độc</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Softtisue1')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/gancobam.webp')} position='absolute'/>
                    {/* <View style={styles.overlay}/> */}
                    <Text style={styles.buttonText1}>Gân, cơ, bầm</Text>
                </TouchableOpacity>
              </View>
            )
          }
      }
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingTop: 8,
    backgroundColor: '#FFFFFF',
    elevation: 20,
    paddingTop: 45
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#2699FB',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    alignContent: 'center',
  },
  
  buttonText1: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 13.5,
    alignSelf: 'center',
    top: height/12.99
    // justifyContent: 'flex-end'
  },

  image: {
    flex: 1,
    width: width/3.5,
    height: height/5.15,
    // marginTop: 20,
    alignSelf: 'center',
    justifyContent:'center',
    // 
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },

  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: width/3.5,
    height: height/5.15,
    // 
  },

  button: {
    marginBottom: 8,
    marginRight: 5,
    marginLeft: 5,
    width: width/3.5,
    height: height/5.15,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#2196F3',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    // top: 20
  },

  headerTitle: {
    width: '100%', 
    justifyContent:'flex-start',
    alignItems: 'center',
    marginBottom: -height/10,
    paddingTop: 60
  },
})

export default CaseSelection