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
    name: 'unconscious81.mp3'
  },
  {
    id: 1,
    name: 'unconscious82.mp3'
  },
  {
    id: 2,
    name: 'unconscious83.mp3'
  },
  {
    id: 3,
    name: 'unconscious84.mp3'
  },
]

class Unconscious8 extends Component {
    
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
        song = new SoundPlayer('unconscious8.mp3', SoundPlayer.MAIN_BUNDLE, () => {
            song.play(()=> song = new SoundPlayer('unconscious81.mp3', SoundPlayer.MAIN_BUNDLE, () => {
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
          <Text style={styles.text}>Nạn nhân nằm ngửa CÓ chấn thương cột sống cổ</Text>

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
          numberOfPages={5}
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
                  <Image style={styles.image} source={require('../GIF/unconscious8_1.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.text2}>
                  Trường hợp nạn nhân bất tỉnh, còn thở và có nghi ngờ chấn thương cột sống cổ thường do va 
                  chạm mạnh hoặc có rơi té từ trên cao.
                  </Text>
                  <Text style={styles.semiButtonText}>
                  Cần phải có từ 2 đến 3 người trợ giúp để xử lý trường hợp này.
                  </Text>

                  
                    <TouchableOpacity style={{ position: 'absolute', margin: 15, marginTop: '83.5%',height: 40,  right: 0.1, width: 40, justifyContent: 'center', alignSelf: 'flex-start'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name = {this.state.icon} type='octicon' size={25}/>
                    </TouchableOpacity>
                  
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/unconscious8_2.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Bạn sẽ làm nhóm trưởng để xác định lăn nạn nhân về phía nào là tốt nhất cho họ. 
                  Sau đó, đưa cánh tay sẽ lăn qua của nạn nhân lên cao hoặc ngang vai, để khi lăn nghiêng thì nạn 
                  nhân sẽ nằm lên vai/ cánh tay đó. Nhóm trưởng gọi thêm 2, 3 người trợ giúp, quỳ về phía mà nạn nhân 
                  sẽ được lăn nghiêng về phía đó. Nhóm trưởng quỳ gối thấp trước đầu của nạn nhân, 2 tay giữ chắt 
                  vùng cơ cổ, vai, hạ thấp 2 cánh tay, ôm kẹp chắt phần cổ, tai và đầu của nạn nhân.
                  </Text>

                  

                    <TouchableOpacity style={{ position: 'absolute', margin: 15, marginTop: '83.5%',height: 40,  right: 0.1, width: 40, justifyContent: 'center', alignSelf: 'flex-start'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>

                    </TouchableOpacity>
              
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/unconscious8_3.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Những người trợ giúp sẽ kéo sát cánh tay còn lại của nạn nhân ép vào thân mình của nạn nhân. 
                  Tay của người trợ giúp bám chắc vào phần thân, bao gồm cả cánh tay của nạn nhân ở vị trí vai, hông, 
                  đùi và chân. Các cánh tay của người trợ giúp cần để chéo nhau để tạo lực chắc chắn.
                  </Text>

                  

                    <TouchableOpacity style={{ position: 'absolute', margin: 15, marginTop: '83.5%',height: 40,  right: 0.1, width: 40, justifyContent: 'center', alignSelf: 'flex-start'}} onPress={this.onPressButtonMute.bind(this)}>
                      <View style={styles.overlay}/>
                      <Icon name={this.state.icon} type='octicon' size={25} color='#000000'/>

                    </TouchableOpacity>
                  
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Image style={styles.image} source={require('../GIF/unconscious8_4.webp')}/>
                  <Text style={{width: 50, height: 6, marginTop: 2, marginBottom: 10, backgroundColor: '#2699FB', alignSelf:'flex-start'}}></Text>
                  <Text style={styles.semiButtonText}>
                  Nhóm trưởng đảm bảo những người trợ giúp ở đúng tư thế và đếm "1, 2, 3" để ra hiệu 
                  lệnh. Khi tất cả sẵn sàng, nhóm trưởng ra hiệu lệnh để đồng bộ lăn phần đầu, cổ, cột sống và 
                  toàn thân c ủa nạn nhân sao cho đầu, cổ , cột sống và toàn thân của nạn nhân khi lăn trên 1 đường 
                  thẳng và cùng 1 thời điểm, nhằm tránh mọi va chạm vào tủy sống, vì va chạm tủy sống có thể dẫn 
                  đến liệt người nạn nhân.
                  </Text>

                  

                    <TouchableOpacity style={{ position: 'absolute', margin: 15, marginTop: '83.5%',height: 40,  right: 0.1, width: 40, justifyContent: 'center', alignSelf: 'flex-start'}} onPress={this.onPressButtonMute.bind(this)}>
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
      fontSize: 11,
      bottom: 3,
      alignSelf: 'center'
    },
    text2: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 17,
      bottom: 5,
      alignSelf: 'center'
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

export default Unconscious8