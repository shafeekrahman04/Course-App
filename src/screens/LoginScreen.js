import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../utilities/styles/GlobalStyles';
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';
import { useAuth } from '../security/AuthContext';
import { alertMessageType } from '../utilities/enum/Enum';


export default function LoginScreen({navigation}) {
  const authContext = useAuth();

  const [showPassword, setShowPassword] = useState(true);
  const [loader, setLoader] = useState(false);

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const [alertMessage, setAlertMessage] = useState({ message: '', timestamp: Date.now() });
  const [alertType, setAlertType] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  
  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({ message: message, timestamp: new Date() });
    setAlertType(messageType);
}

  const loginValidation = () => {
    let isValid = true
    if (loginId.length == 0) {
        alertMessagePopUp('Please enter login Id', alertMessageType.WARNING.code)
        return false
    }
    if (password.length == 0) {
        alertMessagePopUp('Please enter password', alertMessageType.WARNING.code);
        return false;
    }
    return isValid;
}

async function login() {
  if (loginValidation()) {
    setLoader(true);
    const loginSuccess = await authContext.login(loginId, password);
    setLoader(false);
    
    if (loginSuccess) {
      alertMessagePopUp('Login successful', alertMessageType.SUCCESS.code);
      
      setTimeout(() => {
        navigation.replace('HomeTab');
      }, 500);
    } else if (authContext.error) {
      alertMessagePopUp('Invalid credentials', alertMessageType.DANGER.code);
    }
  }
}


  return (
    <View style={styles.body}>
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
              placeholder="Login Id"
              maxLength={10}
              value={loginId}
              onChangeText={v => {
                setLoginId(v);
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
      
        </View>
        <View style={styles.login_button_container}>
          <TouchableOpacity onPress={() => login()} style={styles.login_button}>
            <Text style={styles.button_font}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AlertMessage message={alertMessage} messageType={alertType} />
      {/* loader */}
      <Modal visible={loader} transparent>
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