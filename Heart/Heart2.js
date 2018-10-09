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
    name: 'heart2.mp3'
  },
  {
    id: 1,
    name: 'heart3.mp3'
  },
  {
    id: 2,
    name: 'heart4.mp3'
  },
  {
    id: 3,
    name: 'heart5.mp3'
  },
]

class Heart2 extends Component {
    
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
        // this.onPressButtonStop = this.onPressButtonStop.bind(this)
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
            song = new SoundPlayer('heart2.mp3', SoundPlayer.MAIN_BUNDLE, () => {
                song.setNumberOfLoops(-1).play(()=>song.release())
                song.setVolume(1)
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
          <Text style={styles.text}>Sử dụng máy sốc tim ngoài tự động AAD</Text>

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
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/heart2_1.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Thực hiện thao tác hồi sinh tim phổi CPR trong lúc đợi người lấy máy sốc tim ngoài tự động đến.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Một người tiếp tục thao tác hồi sinh tim phổi CPR trong lúc người kia khởi động máy 
                  và làm theo hướng dẫn của máy.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Khi sử dụng máy sốc tim ngoài AAD, nạn nhân cần phải được đặt trên mặt phẳng cứng, khô ráo và ngực trần.
                  </Text>
                  
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
         
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/heart2_2.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Mở máy AAD lên. Tháo 2 miếng pad cực điện, gỡ bỏ miếng dính phía mặt sau của miếng pad.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Dán 2 miếng pad lên ngực trần của nạn nhân theo hướng dẫn vẽ sẵn, đảm bảo tim nằm giữa 
                  2 cực điện và có dòng điện truyền qua.
                  </Text>
                  
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
          
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/heart2_3.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Máy sẽ đo hoạt động điện từ của tim để quyết định đưa ra cú giật sốc điện hợp lí.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Khi máy AAD sẵn sàng để sốc điện sau khi phân tích, máy sẽ yêu cầu nhân nút giật điện.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Lúc này, những người sơ cứu cần tránh tiếp xúc với nạn nhân để không bị truyền điện.
                  </Text>
                  
                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
           
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/heart2_4.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Sau khi máy sốc điện gây giật tim cho nạn nhân, nạn nhân có thể được an toàn để tiếp xúc.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Những người sơ cứu tiếp tục thao tác hồi sinh tim phổi CPR và làm theo hướng dẫn của máy.
                  </Text>

                  

                    <TouchableOpacity style={{ flex: 1,position: 'absolute', marginTop: height/2.6,margin: 15, height: 40,  right: 0.1, width: 40, justifyContent: 'center'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>

                    </TouchableOpacity>
        

                  <View style={{ marginTop: height/2.3 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Unconscious12')}
                        style={styles.button}>
                            <View>
                                <Text style={styles.text}>Tiếp tục</Text>
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
    text: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 12.5,
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

    image: {
      width: '114%',
      height: '65%',
      marginBottom: '5%',
    },


    button: {
      marginBottom: 8,
      marginRight: 5,
      marginLeft: 5,
      width: 140,
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#2196F3',
      height: 60,
      
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

export default Heart2