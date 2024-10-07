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
    <ImageBackground
      source={require('../../assets/logo/bgg.png')}
      resizeMode='cover'
      blurRadius={1}
      style={styles.body}>
        <View style={styles.overlay}/>
      <View style={styles.image_container}>
        <Image
          source={require('../../assets/logo/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.login_container}>
        <View style={styles.heading}>
          <Text style={styles.heading_font}>Login</Text>
        </View>
        <View style={styles.input_container}>
          <View style={{paddingBottom: 20, paddingTop: 10}}>
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
        </View>
        <View style={styles.login_button_container}>
          <TouchableOpacity onPress={() => login()} style={styles.login_button}>
            <Text style={styles.button_font}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AlertMessage message={alertMessage} messageType={alertType} />
      {/* loader */}
      <Modal visible={isLoader} transparent>
        <Loader />
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    // backgroundColor: Colors.primaryColor,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay cover the entire background
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity with the alpha value (0.4 here)
    
  },
  login_container: {
    height: 380,
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Glass effect: white + transparency
    borderColor: 'rgba(255, 255, 255, 0.3)', // Slight border to enhance effect
    borderWidth: 1,
    shadowColor: '#000', // Shadow to lift the glass card off the background
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  image_container: {
    height: 90,
    marginBottom: 10,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
  heading: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading_font: {
    color:'white',
    fontSize: 25,
    fontWeight: 'bold',
   
  },
  input_container: {
    height: 200,
    justifyContent: 'center',
  },
  login_button_container: {
    height: 90,
    alignItems: 'center',
    
  },
  login_button: {
    padding: 10,
    backgroundColor:'#f68084',
    borderRadius: 20,
    width:230,
    marginTop:30,
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
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    paddingLeft:17
  },
  input_filed: {
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.black,
  }
});