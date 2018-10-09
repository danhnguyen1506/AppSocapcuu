import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { YellowBox } from 'react-native';
import { Icon } from 'react-native-elements'

var {width, height} = Dimensions.get('window')
class Aboutauthor extends Component {

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
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.headerTitle}>
                  {/* <Text style={styles.buttonText}>VẾT CẮN</Text> */}

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

                <View style={styles.button}>
                    <Image style={styles.image} source={require('../Images/hothaibinh.webp')} position='absolute'/>
                    <View style={styles.viewText}>
                        <Text style={styles.buttonText1}>Hồ Thái Bình</Text>
                        <Text style={styles.text}>Điều phối dự án</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#707070'}]}>Giám đốc Công ty THHH Kỹ năng Sinh tồn SSVN</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <Image style={styles.image} source={require('../Images/tonycoffey.webp')} position='absolute'/>
                    <View style={styles.viewText}>
                        <Text style={styles.buttonText1}>Tony Coffey</Text>
                        <Text style={styles.text}>Cố vấn chuyên môn sơ cấp cứu</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#707070'}]}>Giám đốc Survivor Emergency Care (Úc)</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <Image style={styles.image} source={require('../Images/trangjenanguyen.webp')} position='absolute'/>
                    <View style={styles.viewText}>
                        <Text style={styles.buttonText1}>Trang Jena Nguyễn</Text>
                        <Text style={styles.text}>Biên tập và hiệu chỉnh</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#707070'}]}>Phó giám đốc Công ty TNHH Kỹ năng Sinh tồn SSVN</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <Image style={styles.image} source={require('../Images/trantrieungoahuyen.webp')} position='absolute'/>
                    <View style={styles.viewText}>
                        <Text style={styles.buttonText1}>Trần Triêu Ngõa Huyến</Text>
                        <Text style={styles.text}>Biên tập và hiệu chỉnh</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#707070'}]}>Giám đốc Trung tâm Nghiên cứu</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#707070'}]}>và Hỗ trợ sức khỏe cộng đồng (CCHS)</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <Image style={styles.image} source={require('../Images/trung.webp')} position='absolute'/>
                    <View style={styles.viewText}>
                        <Text style={styles.buttonText1}>Nguyễn Văn Trung</Text>
                        <Text style={styles.text}>Cố vấn kĩ thuật</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#707070'}]}>Trưởng dự án Công ty Briswell</Text>
                    </View>
                </View>

                <View style={{ width: '100%', justifyContent: 'center', marginTop: 16, backgroundColor: '#2699FB', height: height/4.5, alignItems: 'center'}}>
                    <View style={{ backgroundColor: 'transparent', width: '90%', marginBottom: 8,}}>
                        <Text style={[styles.buttonText1,{color: '#FFFFFF'}]}>XIN CHÂN THÀNH CẢM ƠN</Text>
                        <Text style={[styles.buttonText1,{color: '#FFFFFF'}]}>SỰ ĐÓNG GÓP TỪ</Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', width: '85%',}}>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#FFFFFF'}]}>• Các tình nguyện viên dự án Sơ Cấp Cứu và Survival Skills Vietnam</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#FFFFFF'}]}>• Công ty TNHH SiGen</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#FFFFFF'}]}>• Ba Ria - Vung Tau University English Speaking Club</Text>
                        <Text style={[styles.text, {fontWeight: 'normal', color: '#FFFFFF'}]}>• RMIT Innovation and Technology Club</Text>
                    </View>
                </View>
              </View>
            </ScrollView>
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
    fontSize: height/45,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: height/60,
    alignSelf: 'flex-start',
    marginTop: 1,
    marginBottom: 2,
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 10,
    alignSelf: 'flex-start',
  },
  

  viewText: {
    flex: 1,
    width: '68.5%',
    // height: '75%',,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  image: {
    flex: 1,
    width: '20%',
    height: '75%',
    // marginTop: 20,
    alignSelf:'flex-end',
    left: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },

  button: {
    flexDirection: 'column',
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    width: '90%',
    height: height/7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5,
  },

  headerTitle: {
    width: '100%', 
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 50,
    top: 20,
  },
})

export default Aboutauthor