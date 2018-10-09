
import React, {Component} from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ViewPagerAndroid, 
  BackHandler, Dimensions, DeviceEventEmitter, AppState } from 'react-native'
import PageControl from 'react-native-page-control';
import { YellowBox } from 'react-native';
import { Icon } from 'react-native-elements'
import { Linking } from 'react-native'

var {width, height} = Dimensions.get('window')

class Aboutapp extends Component {
    
        static navigationOptions = ({ navigation }) => ({
            headerStyle:{
                backgroundColor:'white',
                marginBottom: -15,
                height: 0
            },
        })

        constructor(props) {
            super(props)
              this.state={currentPage: 0}
              YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
              this.handleChange = this.handleChange.bind(this)
        }
    
        handleChange({nativeEvent}) {
            let change = nativeEvent.position
            if (this.state.currentPage !== change) {
              this.setState({currentPage: change})
            }
          }
    
render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', left: 20, width: 50, height: 50, justifyContent: 'center'}}
            onPress = {() => this.props.navigation.goBack()}>
            <Icon name = 'ios-undo' type='ionicon' size={35}/>
          </TouchableOpacity>
        </View>
        <View style={[styles.slide,{marginTop: -0.5, height: 185, backgroundColor :'transparent'}]}>
        <Text style={[styles.text, {color: '#2699FB', marginBottom: 14}]}>PHIÊN BẢN 1.0</Text>
        <Text style={styles.buttonText}>VỀ ỨNG DỤNG</Text>
        <Text style={styles.buttonText}>SƠ CẤP CỨU</Text>
        <Image style={{position: 'absolute', width: 176, height: 185, right: 30, backgroundColor: 'transparent'}} 
        source={require('../Images/socapcuu.webp')}/>
        </View>

        <PageControl
          style={{position:'absolute', alignSelf: 'flex-start', right: 0, left: 0, bottom:10, elevation: 1}}
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
            loadMinimal={true}
            loadMinimalSize={3}
            onPageSelected = {this.handleChange}
            
        >
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Text style={[styles.semiButtonText,{marginBottom: 12}]}>
                  Thực trạng:
                  </Text>

                  <Text style={styles.text}>
                  Tại các nước phát triển, kỹ năng sơ cấp cứu và Thoát hiểm được 
                  đào tạo rộng rãi trong chương trình học, tại các công ty và cộng đồng.
                  </Text>

                  <Text style={styles.text}>
                  Tuy nhiên, nhận thức, kiến thức và kỹ năng Sơ cấp cứu và Thoát hiểm tại 
                  Việt Nam chưa được quan tâm đúng mức. Phần lớn chúng ta chưa được trang 
                  bị kiến thức và nhóm kỹ năng vô cùng quan trọng, mang tính sống còn này.
                  </Text>

                  <Text style={styles.text}>
                  Phần lớn nạn nhân không được sơ cứu hoặc sơ cứu chưa đúng cách trước khi 
                  chuyển đến bệnh viện, gây ra số tử vong cao không đáng có.
                  </Text>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Text style={[styles.semiButtonText,{marginBottom: 12}]}>
                  Về ứng dụng:
                  </Text>

                  <Text style={[styles.text,{marginBottom: 10}]}>
                  Ứng dụng Sơ Cấp Cứu và Thoát Hiểm là ứng dụng di động hướng dẫn xử lí 
                  sơ cấp cứu các tình huống khẩn cấp thường gặp nhằm:
                  </Text>

                  <Text style={styles.text}>
                  1.Bảo tồn hơi thở của nạn nhân. 
                  </Text>
                  <Text style={styles.text}>
                  2. Giúp tình trạng không xấu đi. 
                  </Text>
                  <Text style={[styles.text,{marginBottom: 10}]}>
                  3. Thúc đẩy quá trình hồi phục tốt hơn.
                  </Text>
                  
                  <Text style={styles.text}>
                  Chúng tôi mong muốn góp phần giúp cộng đồng xử lí tốt những trường hợp khẩn cấp, 
                  bảo vệ được tính mạng của bản thân và những người xung quanh. 
                  </Text>

                  <Text style={styles.text}>
                  Ứng dụng Sơ Cấp Cứu và Thoát Hiểm được biên soạn với chuyên gia Tony Coffey 
                  nhằm đưa đến những hướng dẫn hiệu quả nhất và được cập nhật mới nhất của 
                  Resuscitation Council of Asia.
                  </Text>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.slide1}>
                  <Text style={[styles.semiButtonText,{marginBottom: 12}]}>
                  Lưu ý:
                  </Text>

                  <Text style={styles.text}>
                  Ứng dụng này chỉ mang tính chất tham khảo và hỗ trợ 
                  trong tình huống khẩn cấp và không thay thế được việc 
                  đào tạo sơ cấp cứu và thực hành thường xuyên.
                  </Text>

                  <Text style={styles.text}>
                  Ứng dụng Sơ Cấp Cứu và Thoát Hiểm là dự án phi lợi nhuận. 
                  Do đó, chúng tôi hi vọng nhận được sự hỗ trợ của Cộng đồng nhằm duy trì, 
                  phát triển và được phổ biến rộng rãi hơn nữa.
                  </Text>
                  
                <View style={{flex: 1, flexDirection: 'row',
                 width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity style={{right: 20, alignItems: 'center'}}
                   onPress={() => Linking.openURL('https://survivalskills.vn/socapcuuapp')}>
                  <Image style={styles.image} source={require('../Images/Website.webp')}/>
                  <Text style={{color: '#2699FB'}}>
                    Trang chủ
                  </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{left: 20, alignItems: 'center'}}
                  onPress={() => Linking.openURL('https://www.facebook.com/SurvivalSkillsVietnam/')}>
                  <Image style={styles.image} source={require('../Images/Facebook.webp')} onP/>
                  <Text style={{color: '#2699FB'}}>
                    Facebook
                  </Text>
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
        fontSize: 30,
        elevation: 1
    },
    semiButtonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
    },
    text: {
      color: 'black',
      fontSize: 14
    },
    slide: {
        alignItems:'flex-start',
        width: '100%',
        height: '20%',
        padding: '5.5%',
        // paddingBottom: '4%',
        borderColor:'white',
        marginTop: '2.5%',
        // marginBottom: '8%',
        backgroundColor:'#FFFFFF',
        elevation: 0,
    },
    slide1: {
        alignItems:'flex-start',
        flex: 1,
        width: '100%',
        height: '80%',
        padding: '5.5%',
        // marginTop: '2.5%',
        marginBottom: '8%',
        backgroundColor:'#FFFFFF',
        elevation: 0,
    },

    image: {
        width: 50,
        height: 50,
        marginBottom: '5%',
        tintColor: '#2699FB',
    },

    headerTitle: {
      width: '100%', 
      justifyContent:'center',
      alignItems: 'center',
      marginBottom: 30,
      top: 30,
      marginTop: 20,
    },
})

export default Aboutapp