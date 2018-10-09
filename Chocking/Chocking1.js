import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, BackHandler, Dimensions, AppState} from 'react-native';
import { YellowBox } from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import { Icon } from 'react-native-elements'

var {width, height} = Dimensions.get('window')
var SoundPlayer = require('react-native-sound');
// SoundPlayer.setCategory('Playback', true)
var song = null;
var list = [
  {
    // id: 0,
    // name: 'chocking1.mp3'
  },
]
class Chocking1 extends Component {

    static navigationOptions = ({ navigation }) => ({
            headerStyle:{
                backgroundColor:'white',
                marginBottom: -15,
                height: 0
            },
        })

    constructor(props) {
      super(props)
        this.state={currentPage: 0,
          mute: false, name: '', icon: 'unmute', stop: true
        }
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', function() {
        if (song != null) {song.stop(()=> song = null)}
        return false;
      });
    }

    componentDidMount(){
      AppState.addEventListener('change', this.handleAppStateChange)
    }
    
    handleAppStateChange(currentAppState) {
      if(currentAppState == "background") {
        song.pause()
      }
      if(currentAppState == "active") {
        song.play()
      }
    }
    
        render() {
            return (
              <View style={styles.container}>
                <View style={styles.headerTitle}>
                  <Text style={styles.buttonText}>HÓC</Text>
                  <Text style={styles.text}>Xử lý hóc dị vật vào đường thở</Text>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
                    onPress = {() => this.props.navigation.goBack()}>
                    <Icon name = 'ios-undo' type='ionicon' size={35}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-start', right: 20}}
                    onPress = {() => this.props.navigation.navigate('Login')}>
                    <Icon name = 'home' type='entyco' size={35}/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Chocking2')}
                 style={styles.button}>
                  <View>
                    {/* <Image style={styles.image} source={require('../menu-icon.png')}/> */}
                    <Text style={styles.buttonText}>Tự ho được</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Chocking3')}
                 style={styles.button}>
                  <View>
                    {/* <Image style={styles.image} source={require('../menu-icon.png')}/> */}
                    <Text style={styles.buttonText}>Không tự ho được</Text>
                  </View>
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
    color: '#2699FB',
    fontSize: 16
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
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 24
  },

  button: {
    marginBottom: 12,
    marginRight: 5,
    marginLeft: 5,
    width: '90%',
    height: height/2.65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    borderColor: 'blue',
  },

  headerTitle: {
    width: '100%', 
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 30,
    top: 8,
  },
})

export default Chocking1