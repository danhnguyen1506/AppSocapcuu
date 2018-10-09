import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { YellowBox } from 'react-native';
import { Icon } from 'react-native-elements'
import { Linking } from 'react-native'

var {width, height} = Dimensions.get('window')
class Importantnotificant extends Component {

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

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
                    onPress = {() => this.props.navigation.goBack()}>
                    <Icon name = 'ios-undo' type='ionicon' size={35}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-start', right: 20}}
                    onPress = {() => this.props.navigation.navigate('Login')}>
                    <Icon name = 'home' type='entyco' size={35}/>
                  </TouchableOpacity>
                </View>

                {/* ************************************************************************** */}

                <View style={styles.logo}>
                    <Image style={styles.image} source={require('../Images/Official_logo.webp')} position='absolute'/>
                </View>

                <View style={{ width: '100%', justifyContent: 'center', backgroundColor: '#F1F9FF', height: '70%', alignItems: 'center'}}>
                    <View style={{ backgroundColor: 'transparent', width: '85%', marginBottom: '5%',}}>
                        <Text style={styles.buttonText1}>LƯU Ý</Text>
                        <Text style={styles.buttonText1}>QUAN TRỌNG</Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', width: '90%', marginBottom: '7.5%'}}>
                        <Text style={[styles.text, {fontWeight:'normal'}]}>Ứng dụng chỉ mang tính chất tham khảo và hỗ trợ,</Text>
                        <Text style={[styles.text, {fontWeight:'normal'}]}>không thay thế được việc đào tạo sơ cấp cứu</Text>
                        <Text style={[styles.text, {fontWeight:'normal'}]}>và thực hành thường xuyên.</Text>
                    </View>

                    <TouchableOpacity onPress={() => Linking.openURL('https://survivalskills.vn/chuong_trinh_dao_tao')}
                    style={styles.button}>
                        <Text style={styles.text}>ĐĂNG KÍ HỌC SƠ CẤP CỨU</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('')}
                    style={styles.button}>
                        <Text style={styles.text}>BẮT BUỘC THAM KHẢO</Text>
                        <Text style={styles.text}>TRƯỚC KHI SỬ DỤNG</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )
          }
      }
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  
  buttonText1: {
    fontWeight: 'bold',
    color: '#2699FB',
    fontSize: height/20,
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#2699FB',
    fontSize: height/50,
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 2,
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 10,
    alignSelf: 'flex-start',
  },
  

  image: {
    // flex: 1,
    width: width/4.6,
    height: '50%'
  },

  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    marginBottom: '4%',
    width: '90%',
    height: height/9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 1,
  },

  headerTitle: {
    width: '100%', 
    justifyContent:'center',
    alignItems: 'center',
    top: 20,
  },
})

export default Importantnotificant