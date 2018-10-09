import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ViewPagerAndroid, BackHandler, Dimensions, DeviceEventEmitter, AppState } from 'react-native'
import { YellowBox } from 'react-native';
import { Icon } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation'

var {width, height} = Dimensions.get('window')
class Bleeding1 extends Component {

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
                  <Text style={styles.buttonText1}>CHẢY MÁU</Text>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
                    onPress = {() => this.props.navigation.goBack()}>
                    <Icon name = 'ios-undo' type='ionicon' size={35}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-start', right: 20}}
                    onPress = {() => this.props.navigation.navigate('Login')}>
                    <Icon name = 'home' type='entyco' size={35}/>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bleeding2')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/vetcatsau.webp')} position='absolute'/>
                    <View style={styles.overlay}/>
                    <Text style={styles.buttonText}>Vết cắt sâu</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bleeding6')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/vetdamxuyen.webp')} position='absolute'/>
                    <View style={styles.overlay}/>
                    <Text style={styles.buttonText}>Vết đâm xuyên</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bleeding11')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/dutliangon.webp')} position='absolute'/>
                    <View style={styles.overlay}/>
                    <Text style={styles.buttonText}>Đứt lìa ngón</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bleeding12')}
                 style={styles.button}>
                    <Image style={styles.image} source={require('../Images/chaymaumui.webp')} position='absolute'/>
                    <View style={styles.overlay}/>
                    <Text style={styles.buttonText}>Chảy máu mũi</Text>
                </TouchableOpacity>
              </View>
            )
          }
      }
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
  },
  buttonText1: {
    fontWeight: 'bold',
    color: '#2699FB',
    fontSize: 26
  },
  
  semiButtonText: {
    color: 'black',
    fontSize: 16,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    bottom: 3
  },

  image: {
    flex: 1,
    width: width/1.3,
    height: height/5.65,
    // marginTop: 20,
    alignSelf: 'center',
    justifyContent:'center',
    
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
    width: width/1.3,
    height: height/5.65,
    
  },

  button: {
    marginBottom: 14,
    marginRight: 5,
    marginLeft: 5,
    width: width/1.3,
    height: height/5.65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    width: '100%', 
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 50,
    top: 20,
  },
})

export default Bleeding1