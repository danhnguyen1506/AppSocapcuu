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
  {
    id: 0,
    name: 'heart1.mp3'
  },
  // {
  //   id: 0,
  //   name: 'unconscious1.mp3'
  // },
  // {
  //   id: 1,
  //   name: 'unconscious2.mp3'
  // },
]

class Heart1 extends Component {
    
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
        this.handleChange = this.handleChange.bind(this)
        this.onPressButtonStop = this.onPressButtonStop.bind(this)
        this.onPressButtonMute = this.onPressButtonMute.bind(this)
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', function() {
        // if (song != null) {song.stop(()=> song = null)}
        return false;
      });
      AppState.removeEventListener('change', this.handleAppStateChange);
    }
    componentDidMount(){
      AppState.addEventListener('change', this.handleAppStateChange)
    }
    handleAppStateChange(currentAppState) {
      if(currentAppState == "background") {
          song.pause();
      } 
      if(currentAppState == "active") {
          song.play();
      }
    }

    onPressButtonPlay() {
        if(song == null){
            song = new SoundPlayer('heart1.mp3', SoundPlayer.MAIN_BUNDLE, () => {
                song.setNumberOfLoops(-1).play(()=>song.release())
            });
            
        }
    }
    
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

    onPressButtonStop(state) {
        if(this.state.icon === "unmute"){
            if (state === "idle") {
                song.stop().release()
                song = new SoundPlayer(this.state.name, SoundPlayer.MAIN_BUNDLE, () => {
                    song.setNumberOfLoops(-1).play(()=>song.release())
                });
            }
            else song.stop()
        }
    }

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
          <Text style={styles.buttonText}>NHỒI MÁU CƠ TIM</Text>
          <Text style={[styles.text, {color: 'black'}]}>Chứng ngưng tim đột ngột</Text>

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
          numberOfPages={2}
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
            onPageScrollStateChanged = {this.onPressButtonStop}
            // onTouchCancel = {this.onPressButtonStop}
        >
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/heart1_1.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Chứng ngưng tim đột ngột thường xảy ra không báo trước và thường không có dấu hiệu cảnh báo.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Bệnh nhân có thể có triệu chứng như đau tim, hồi hộp, khó thở, mệt, tuột huyết áp, vã mồ hôi, 
                  da xanh tái, thở mệt, mất dần ý thức.
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  Hoặc nạn nhân không có dấu hiệu gì.
                  </Text>
                  
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
            
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image}/>
                  <Text style={[styles.buttonText,{marginTop: 20}]}>
                  Thao tác xử lý.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Gọi xe cấp cứu 115, tiến hành thao tác hồi sinh tim phổi CPR, dùng máy khử rung tim AAD
                   nếu có và làm theo hướng dẫn của máy.
                  </Text>
                  <View style={{justifyContent: 'center', marginTop: '15%'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Heart2')}
                        style={styles.button}>
                            <Image style={styles.image2} source={require('../Images/maysoctimtudong.webp')} position='absolute'/>
                            <View style={styles.overlay1}/>
                            <Text style={styles.text}>Sử dụng máy sốc tim ngoài</Text>
                            <Text style={styles.text}>tự động (AAD)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Unconscious10')}
                        style={styles.button}>
                            <View>
                                <Text style={[styles.text,{color: 'black'}]}>Hồi sinh tim phổi CPR</Text>
                            </View>
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
        fontSize: 17
    },
    semiButtonText: {
        color: 'black',
        fontSize: 14,
    },
    semiButtonText2: {
      color: 'black',
      fontSize: 16,
      alignSelf: 'flex-start'
  },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
      bottom: 3,
      alignSelf: 'center'
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

    image: {
      width: '114%',
      height: '65%',
      marginBottom: '5%',
    },


    image2: {
      flex: 1,
      width: width/1.3,
      height: height/4,
      // marginTop: 20,
      alignSelf: 'center',
      justifyContent:'center',
      
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10,
    },
    overlay1: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      width: width/1.3,
      height: height/4,
      
    },

    button: {
      marginBottom: 24,
      marginRight: 5,
      marginLeft: 5,
      width: width/1.3,
      height: height/4,
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
    overlay: {
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.5,
      backgroundColor: '#707070',
      width: 40,
      height: 40,
      borderRadius: 20,
    },
})

export default Heart1