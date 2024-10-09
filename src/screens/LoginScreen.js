import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles, {Colors} from '../utilities/styles/GlobalStyles';
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';


export default function LoginScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(true);
  const [isLoader, setIsloader] = useState(false);

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = () => {
    navigation.replace('HomeTab');
  };

  return (
    <View style={styles.body}>
        {/* <View style={styles.overlay}/> */}
      <View style={styles.image_container}>
        <Image
          source={require('../../assets/logo/loginimg.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.login_container}>
        <View style={styles.heading}>
          <Text style={styles.heading_font}>Login</Text>
        </View>
        <View style={styles.input_container}>
          <View style={{paddingBottom: 20}}>
            <TextInput
              style={[styles.input_filed]}
              placeholderTextColor={'grey'}
              placeholder="Mobile Number"
              maxLength={10}
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={v => {
                setMobile(v);
              }}
            />
          </View>
          <View style={[ styles.password_field]}>
            <TextInput
              style={{width: '90%', color: 'grey'}}
              placeholderTextColor={'grey'}
              secureTextEntry={showPassword}
              placeholder="Password"
              value={password}
              onChangeText={v => {
                setPassword(v);
              }}
            />
            <TouchableOpacity onPress={() => toggleShowPassword()}>
              {showPassword ? (
                <FontAwesome6
                  name={'eye-slash'}
                  size={17}
                  color={Colors.grey}
                />
              ) : (
                <FontAwesome6 name={'eye'} size={17} color={Colors.grey} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity >
            <Text style={styles.forgot_password_text}>Forgot Password?</Text>
          </TouchableOpacity>
      
        </View>
        <View style={styles.login_button_container}>
          <TouchableOpacity onPress={() => login()} style={styles.login_button}>
            <Text style={styles.button_font}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup_container}>
          <Text style={styles.signup_text}>Don't have an account? </Text>
          <TouchableOpacity >
            <Text style={styles.signup_link}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Login with Google or Facebook */}
        <View style={styles.social_login_container}>
          <Text style={styles.social_login_text}>Also login with</Text>
          <View style={styles.social_buttons}>
            {/* Facebook Login Button */}
            <TouchableOpacity style={styles.facebook_button}>
              <FontAwesome6 name="facebook" size={22} color="blue" />
              
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity style={styles.google_button}>
              <FontAwesome6 name="google" size={22} color="red" />
             
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <AlertMessage message={alertMessage} messageType={alertType} />
      {/* loader */}
      <Modal visible={isLoader} transparent>
        <Loader />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    backgroundColor: '#fff',
  },
 
  image_container: {
    width: '100%',
    height: '40%',
    flex:1,
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  heading: {
    // height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading_font: {
    color:'#ffc100',
    fontSize: 25,
    fontWeight: 'bold',
   
  },
  input_container: {
    height: '46%',
    justifyContent: 'center',
    width:'80%'
  },
  login_button_container: {
    height: 90,
    alignItems: 'center',
  
  },
  forgot_password_text:{
    textAlign:'right',
    paddingRight:10
  },
  login_button: {
    padding: 10,
    backgroundColor:'#eebd01',
    borderRadius: 20,
    width:150,
   
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8, // Shadow effect on Android
   
  },
  button_font: {
    color: Colors.white,
    fontSize: 17,
     textAlign:'center',
     fontWeight:'bold'
  },
  password_field: {
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    marginBottom: 10,
    
    alignItems: 'center',
    paddingLeft:17,
    borderColor:'#ffc100',
    borderWidth:2
  },
  input_filed: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.black,
    width:'100%',
    borderColor:'#ffc100',
    borderWidth:2
  },
  signup_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:2
  },
  signup_text: {
    color: '#333333',
    fontSize: 14,
  },
  signup_link: {
    color: '#feb662',
    fontSize: 14,
    fontWeight: 'bold',
  },
  social_login_container: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection:'row',
    gap:20,
    justifyContent:'center'
  },
  social_login_text: {
    color: '#333333',
    fontSize: 14,
    // marginBottom: 10,
  },
  social_buttons:{
    flexDirection:'row',
    gap:20
  },
});