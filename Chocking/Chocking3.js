import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ViewPagerAndroid, BackHandler, Dimensions, DeviceEventEmitter, AppState } from 'react-native'
import PageControl from 'react-native-page-control';
import { YellowBox } from 'react-native';
import { Icon } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation'

var {width, height} = Dimensions.get('window')
var SoundPlayer = require('react-native-sound');
// SoundPlayer.setCategory('Playback', true)
var song = null;
var list = [
//   {
//     id: 0,
//     name: 'unconsious6.mp3'
//   },
  // {
  //   id: 0,
  //   name: 'unconscious1.mp3'
  // },
  // {
  //   id: 1,
  //   name: 'unconscious2.mp3'
  // },
]

class Chocking3 extends Component {
    
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
        // this.handleChange = this.handleChange.bind(this)
        // this.onPressButtonStop = this.onPressButtonStop.bind(this)
        this.onPressButtonMute = this.onPressButtonMute.bind(this)
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', function() {
        // if (song != null) {song.stop(()=> song = null)}
        return false;
      });
      // AppState.removeEventListener('change', this.handleAppStateChange);
    }
    // componentDidMount(){
    //   AppState.addEventListener('change', this.handleAppStateChange)
    // }
    // handleAppStateChange(currentAppState) {
    //   if(currentAppState == "background") {
    //       song.pause();
    //   } 
    //   if(currentAppState == "active") {
    //       song.play();
    //   }
    // }

    

    // onPressButtonPlay() {
    //     if(song == null){
    //         song = new SoundPlayer('unconscious1.mp3', SoundPlayer.MAIN_BUNDLE, () => {
    //             song.setNumberOfLoops(-1).play(()=>song.stop())
    //         });
            
    //     }
    // }
    
    onPressButtonMute() {
      if(song != null) {
        if(this.state.mute) {// play resume
          song.setVolume(1)
          this.setState({icon: 'unmute'})}
        else {song.setVolume(0);
          this.setState({icon: 'mute'})
        }
        this.setState({mute: !this.state.mute});
      }
    }

    // onPressButtonStop(state) {
    //     if(this.state.icon === "unmute"){
    //         if (state === "idle") {
    //             song.stop().release()
    //             song = new SoundPlayer(this.state.name, SoundPlayer.MAIN_BUNDLE, () => {
    //                 song.setNumberOfLoops(-1).play(()=>song.release())
    //             });
    //         }
    //         else song.stop()
    //     }
    // }

    handleChange({nativeEvent}) {
      let change = nativeEvent.position
      if (this.state.currentPage !== change) {
        this.setState({currentPage: change, 
          name: list.filter(s=>s.id === change).map(s=>s.name).toString(),
          icon: 'unmute', mute: false
        })
      }
    }
    
render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          <Text style={styles.buttonText}>HÓC</Text>
          <Text style={styles.text}>Không tự ho được</Text>

          <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
            onPress = {() => this.props.navigation.goBack()}>
            <Icon name = 'ios-undo' type='ionicon' size={35}/>
          </TouchableOpacity>

          <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-start', right: 20}}
            onPress = {() => this.props.navigation.navigate('Login')}>
            <Icon name = 'home' type='entyco' size={35}/>
          </TouchableOpacity>
        </View>
        <PageControl
          style={{position:'absolute', alignSelf: 'flex-start', right: 30, bottom:10, elevation: 1}}
          numberOfPages={1}
          currentPage={this.state.currentPage}
          pageIndicatorTintColor='white'
          currentPageIndicatorTintColor='#2699FB'
          indicatorStyle={{borderRadius: 5, borderColor:'#C2C2C2', borderWidth: 1}}
          currentIndicatorStyle={{borderRadius: 5}}
          indicatorSize={{width:9, height:9}}
          />
        <ViewPagerAndroid
            style={styles.container}
            initialPage={0}
            peekEnable={true}
            pageMargin={-width + width/1.09}
            loadMinimal={true}
            loadMinimalSize={3}
            onPageSelected = {this.handleChange}
            // onPageScrollStateChanged = {this.onPressButtonStop}
            // onTouchCancel = {this.onPressButtonStop}
        >
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <View style={{ justifyContent: 'center',alignItems: 'center', marginBottom: 10, marginTop: 10}}>
                    <Text style={styles.buttonText}>
                    Nếu nạn nhân không ho được, thì đây là trường hợp cấp cứu, họ có thể tử vong nhanh.
                    </Text>
                  </View>
                  <View style={{flexDirection:'column', marginBottom: 20}}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chocking5')}
                      style={styles.button}>
                        <Image style={styles.image} source={require('../Images/hocnguoilon.webp')} position='absolute'/>
                        <View style={styles.overlay}/>
                    <Text style={styles.buttonText1}>Nạn nhân là người lớn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chocking4')}
                      style={styles.button}>
                        <Image style={styles.image} source={require('../Images/hoctresosinh.webp')} position='absolute'/>
                        <View style={styles.overlay}/>
                    <Text style={styles.buttonText1}>Nạn nhân là trẻ sơ sinh</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </ViewPagerAndroid>
      </View>
    )
  }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    buttonText: {
      fontWeight: 'bold',
      color: '#2699FB',
      fontSize: 18,
      justifyContent: 'center',
      alignItems: 'center',
      // alignSelf: 'center',
      alignContent: 'center',
    },
    
    buttonText1: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 15,
      alignSelf: 'center',
    },
  
    image: {
      flex: 1,
      width: width/1.3,
      height: height/3.5,
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
      height: height/3.5,
      
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
    
    slide1: {
        alignItems:'center',
        flex: 1,
        width: '90%',
        padding: '5.5%',
        paddingTop: 0,
        // shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 2,
        shadowRadius: 20,
        elevation: 1,
        borderColor:'white',
        marginTop: '2.5%',
        marginBottom: '8%',
        backgroundColor:'#FFFFFF'
    },

    button: {
      marginBottom: 22,
      marginRight: 5,
      marginLeft: 5,
      width: width/1.3,
      height: height/3.5,
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
      marginBottom: 30,
      top: 20,
    },
})

export default Chocking3