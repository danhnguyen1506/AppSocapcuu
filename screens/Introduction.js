import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, Dimensions, DeviceEventEmitter, AppState } from 'react-native'
import { YellowBox } from 'react-native';
import { Icon } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation'
import { Linking } from 'react-native'

var {width, height} = Dimensions.get('window')
class Introduction extends Component {

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
                  <Text style={styles.buttonText}>GIỚI THIỆU</Text>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
                    onPress = {() => this.props.navigation.goBack()}>
                    <Icon name = 'ios-undo' type='ionicon' size={35}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-start', right: 20}}
                    onPress = {() => this.props.navigation.navigate('Login')}>
                    <Icon name = 'home' type='entyco' size={35}/>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Aboutapp')}
                 style={styles.button}>
                    <Text style={styles.buttonText}>VỀ ỨNG DỤNG SƠ CẤP CỨU</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Aboutauthor')}
                 style={styles.button}>
                    <Text style={styles.buttonText}>VỀ NHÓM TÁC GIẢ</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL('https://survivalskills.vn/')}
                 style={styles.button}>
                    <Text style={styles.buttonText}>VỀ SURVIVAL SKILLS VIETNAM</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', width: '100%',height: height/3, 
                marginTop: -65, backgroundColor: '#F1F9FF',
                alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{ width: '90%', flexDirection:'row', height:'42%', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Image style={styles.image} source={require('../Images/Australian_aid.webp')} position='relative'/>
                    <Text style={styles.text}>
                    Ứng dụng di động được tài trợ bởi Chương trình Viện trợ Trực tiếp (DAP) của Chính phủ Úc.
                    </Text>
                  </View>  
                </View>

              </View>
            )
          }
      }
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#2699FB',
    fontSize: 18,
    alignSelf: 'center',
  },
  
  text: {
    color: '#2699FB',
    fontSize: 14,
    width: 190,
    height: 60,
    // left: width/14,
    backgroundColor:'#F1F9FF',
    justifyContent: 'flex-start',
  },


  image: {
    width: 120,
    height: 60,
    // right: width/17,
    backgroundColor: '#F1F9FF',
    // justifyContent: 'flex-start'

  },

  button: {
    marginBottom: 16,
    marginRight: 5,
    marginLeft: 5,
    width: '90%',
    height: height/6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
  headerTitle: {
    width: '100%', 
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 50,
    top: 17,
  },
})

export default Introduction