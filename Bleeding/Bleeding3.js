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
  {
    id: 0,
    name: 'bleeding71.mp3'
  },
  {
    id: 1,
    name: 'bleeding72.mp3'
  },
  {
    id: 2,
    name: 'chaymau.mp3'
  },
]

class Bleeding3 extends Component {
    
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
        if (song != null) {song.stop(()=> song = null)}
        return false;
      });
      // AppState.removeEventListener('change', this.handleAppStateChange);
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

    onPressButtonPlay() {
        if(song == null){
            song = new SoundPlayer('bleeding7.mp3', SoundPlayer.MAIN_BUNDLE, () => {
                song.play(()=> song = new SoundPlayer('bleeding71.mp3', SoundPlayer.MAIN_BUNDLE, () => {
                    song.setNumberOfLoops(-1).play(()=>song.stop())
                }))
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
          <Text style={styles.buttonText}>CHẢY MÁU</Text>
          <Text style={styles.text}>Vết cắt sâu ở chi</Text>

          <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
            onPress = {() => this.props.navigation.goBack() && song.stop(song = null)}>
            <Icon name = 'ios-undo' type='ionicon' size={35}/>
          </TouchableOpacity>

          <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-start', right: 20}}
            onPress = {() => this.props.navigation.navigate('Login') && song.stop(song = null)}>
            <Icon name = 'home' type='entyco' size={35}/>
          </TouchableOpacity>
        </View>
        <PageControl
          style={{position:'absolute', alignSelf: 'flex-start', right: 30, bottom:10, elevation: 1}}
          numberOfPages={3}
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
              <View style={{justifyContent: 'center', alignItems: 'center'}} onLayout={this.onPressButtonPlay}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/bleeding7_1.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.text}>
                  Dùng tay bóp chặt lên vết thương để tạo áp lực ngăn máu chảy.
                  </Text>
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
               
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/bleeding7_2.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Dùng gạc thấm nước, hoặc gạc không dính hoặc vải sạch để che vết thương.
                  </Text>
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>
                    </TouchableOpacity>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/bleeding7_2.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Sau đó dùng băng thun quấn chặt vết thương để tạo áp lực cầm máu. Nếu thấy máu đỏ tươi thấm qua lớp băng bó, 
                  không tháo bỏ lớp băng đó ra mà thêm băng gạc áp tròng lên phía trên và tạo thêm áp lực cầm máu.
                  </Text>
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>
                    </TouchableOpacity>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  {/* <Image style={styles.image}/> */}
                  <Text style={[styles.semiButtonText,{top: 20, marginBottom: 20}]}>
                  Sốc là hiện tượng cơ thể không có đủ máu lưu thông để duy trì mức huyết áp và 
                  cung cấp oxy cần thiết cho các mô cơ thể. Sốc là tình trạng khẩn cấp đe dọa mạng sống.
                  </Text>
                  <Text style={styles.text2}>
                  Dấu hiệu sốc:
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Làn da xanh xao, nhờn lạnh, cảm thấy khát nước;
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Thở nhanh, hơi thở cạn;
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Mạch đập nhanh, yếu;
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Các dấu hiệu của việc mất chất lỏng cơ thể;
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Qụy dần và bất tỉnh;
                  </Text>
                  <Text style={styles.text2}>
                  Xử lí: 
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Gọi 115 kêu xe cấp cứu.
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Nếu nạn nhân còn tỉnh táo, đặt nằm ngửa, 2 chân nâng cao.
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  - Nếu nạn nhân bất tỉnh, đặt nằm nghiêng 1 bên, cho 2 chân nâng cao.
                  </Text>
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
        fontSize: 16,
        alignSelf:'flex-start'
    },
    semiButtonText2: {
      color: 'black',
      fontSize: 16,
      alignSelf: 'flex-start'
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
      bottom: 3
      
    },

    text2: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 17,
      alignSelf: 'flex-start'
    },
    
    slide: {
        flex: 1,
        justifyContent: 'center',
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

    button: {
      marginBottom: 8,
      marginRight: 5,
      marginLeft: 5,
      width: 120,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2196F3',
      height: 50,
      
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

export default Bleeding3