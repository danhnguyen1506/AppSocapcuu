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
    name: 'burn11.mp3'
  },
  {
    id: 1,
    name: 'bongbc2.mp3'
  },
  {
    id: 2,
    name: 'burn24.mp3'
  },
  {
    id: 3,
    name: 'burn25.mp3'
  },
]

class Burn1 extends Component {
    
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
            song = new SoundPlayer('burn11.mp3', SoundPlayer.MAIN_BUNDLE, () => {
                    song.setNumberOfLoops(-1).play(()=>song.stop())
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
        // else {
        //     if (state === "idle") {
        //         song.stop().release()
        //         song = new SoundPlayer(this.state.name, SoundPlayer.MAIN_BUNDLE, () => {
        //             song.setNumberOfLoops(-1).play(()=>song.release())
        //         });
        //         song.setVolume(0)
        //     }
        //     else song.stop()
        // }
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
          <Text style={styles.buttonText}>BỎNG/PHỎNG</Text>
          <Text style={styles.text}>Xử lý bỏng</Text>

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
          numberOfPages={4}
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
                  <Image style={styles.image}/>
                  <Text style={[styles.buttonText, {fontSize: 21, marginTop: 20}]}>
                  Tuyệt đối KHÔNG làm những việc sau đây:
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  Không chọc thủng, làm xì các vết rộp bỏng.
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  Không sử dụng các loại dầu và kem bôi.
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  Không sử dụng bơ, nước mắm, kem đánh răng bôi lên vết bỏng.
                  </Text>
                  <Text style={styles.semiButtonText2}>
                  Không phủ vết bỏng trước khi làn da bỏng đó trở lại nhiệt độ bình thường.
                  </Text> 
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}} onLayout={this.onPressButtonPlay}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/burn2_1.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText1}>
                  Làm mát làn da bị bỏng dưới vòi nước, trung bình từ 15-20 phút.
                  </Text>
                  <Text style={styles.semiButtonText1}>
                  Nếu không có nước vòi, có thể ngâm vết bỏng trong thau nước mát.
                  </Text>
                  <Text style={styles.semiButtonText1}>
                  Nếu không có nhiều nước, thấm ướt nước vào 2 khăn sạch và luân phiên áp lên vết bỏng.
                  </Text>
                  <Text style={styles.semiButtonText1}>
                  Nếu không có nước mà chỉ có đá lạnh, dùng khăn cuộn đá lạnh và để cách vết bỏng vài cm.
                  </Text>
                  <Text style={styles.semiButtonText1}>
                  Tuyệt đối không để đá lạnh tiếp xúc trực tiếp lên da bị bỏng sẽ làm da tổn thương 2 lần.
                  </Text>
                  <Text style={styles.semiButtonText1}>
                  Trường hợp nạn nhân bị bỏng mất da, sau khi sơ cứu bằng nước, nhanh chóng đưa nạn nhân vào 
                  bệnh viện.
                  </Text>
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>
                    </TouchableOpacity>
             
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}} onLayout={this.onPressButtonPlay}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/burn3_1.webp')}/>
                  <Text style={styles.semiButtonText}>
                  Cần che chắn vết bỏng bằng ni lông để hạn chế bụi, côn trùng bám vào vết 
                  bỏng gây nhiễm trùng. Tuyệt đối không dùng chất liệu vải để che vết bỏng.
                  </Text>
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
          
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/burn3_2.webp')}/>
                  <Text style={styles.semiButtonText}>
                  Nếu nạn nhân quá đau đớn, có thể dùng đá chườm nhẹ bên ngoài để giảm đau.
                  </Text>
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>
                    </TouchableOpacity>
            
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
      
      borderColor: 'blue',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#2699FB',
        fontSize: 16
    },
    semiButtonText: {
        color: 'black',
        fontSize: 12.99,
        alignSelf: 'flex-start'
    },
    semiButtonText1: {
      color: 'black',
      fontSize: height/60,
      alignSelf: 'flex-start'
  },
    semiButtonText2: {
      color: 'black',
      fontSize: 20,
      alignSelf: 'flex-start'
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

    image: {
      width: '114%',
      height: '65%',
      marginBottom: '5%',
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

export default Burn1