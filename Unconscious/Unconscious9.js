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
    name: 'unconscious91.mp3'
  },
  {
    id: 1,
    name: 'unconscious92.mp3'
  },
  {
    id: 2,
    name: 'unconscious93.mp3'
  },
  {
    id: 3,
    name: 'unconscious94.mp3'
  },
  {
    id: 4,
    name: 'unconscious95.mp3'
  },
]

class Unconscious9 extends Component {
    
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
        song = new SoundPlayer('unconscious9.mp3', SoundPlayer.MAIN_BUNDLE, () => {
            song.play(()=> song = new SoundPlayer('unconscious91.mp3', SoundPlayer.MAIN_BUNDLE, () => {
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
          <Text style={styles.buttonText}>BẤT TỈNH</Text>
          <Text style={styles.text}>Nạn nhân nằm ngửa</Text>

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
          numberOfPages={6}
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
                  <Image style={styles.image} source={require('../GIF/unconscious9_1.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.text}>
                  Nạn nhân bất tỉnh, còn thở ở tư thế nằm ngửa
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Qùy xuống bên cạnh nạn nhân. Đặt tay nạn nhân phía bạn lên vị trí cao qua đầu cơ thể nạn nhân.
                  </Text>

                  
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
              
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/unconscious9_2.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Đặt cánh tay còn lại của nạn nhân ở vị trí chéo với bàn tay đặt lên ngực.
                  </Text>

                  

                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>

                    </TouchableOpacity>
           
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/unconscious9_3.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Nâng khủy gối chân bên kia của nạn nhân lên. 
                  </Text>

                  

                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>

                    </TouchableOpacity>
          
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/unconscious9_4.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  1 tay giữ vai, 1 tay giữ mông, lăn nạn nhân về phía bạn.
                  </Text>

                  

                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>

                    </TouchableOpacity>
           
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/unconscious9_5.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Sau đó nâng đầu nạn nhân lên 1 chút để làm thoáng đường thở. 
                  Miệng của nạn nhân hướng về mặt sàn để họ có thể nôn, ợ ra sàn.
                  </Text>

                  

                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>

                    </TouchableOpacity>
               
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <View style={{ justifyContent: 'center',alignItems: 'center', marginBottom: 20}}>
                    <Text style={styles.buttonText}>
                    LƯU Ý
                    </Text>
                    <Text style={styles.semiButtonText}>
                    Xử lý các thương tích và vấn đề khác (nếu có) theo thứ tự ưu tiên bắt buộc như sau:
                    </Text>
                  </View>
                  <View style={{flexDirection:'column', marginBottom: 20}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Bleeding1')}
                    style={styles.button}>
                      <Image style={styles.image1} source={require('../Images/chaymau.webp')} position='absolute'/>
                      <Text style={styles.buttonText1}>Chảy máu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Burn1')}
                    style={styles.button}>
                      <Image style={styles.image1} source={require('../Images/vetbong.webp')} position='absolute'/>
                      <Text style={styles.buttonText1}>Bỏng/Phỏng</Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Bone1')}
                    style={styles.button}>
                      <Image style={styles.image1} source={require('../Images/xuongkhop.webp')} position='absolute'/>
                      <Text style={styles.buttonText1}>Gãy xương</Text>
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
        fontSize: 16
    },

    buttonText1: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 30,
      alignSelf: 'center',
    },
    
    semiButtonText: {
        color: 'black',
        fontSize: 14.5,
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 15,
      bottom: 3
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

  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: width/1.3,
    height: height/5.3,
    
  },

  image: {
    width: '114%',
    height: '65%',
    marginBottom: '5%',
  },

    button: {
      marginBottom: 16,
      marginRight: 5,
      marginLeft: 5,
      width: width/1.3,
      height: height/5.3,
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

    image1: {
      flex: 1,
      width: width/1.3,
      height: height/5.3,
      // marginTop: 20,
      alignSelf: 'center',
      justifyContent:'center',
      
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 10,
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

export default Unconscious9