import {
  Image,
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
              style={[GlobalStyles.input_filed]}
              placeholderTextColor={Colors.grey}
              placeholder="Mobile Number"
              maxLength={10}
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={v => {
                setMobile(v);
              }}
            />
          </View>
          <View style={[GlobalStyles.input_filed, styles.password_field]}>
            <TextInput
              style={{width: '90%', color: Colors.black}}
              placeholderTextColor={Colors.grey}
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
                  color={Colors.black}
                />
              ) : (
                <FontAwesome6 name={'eye'} size={17} color={Colors.black} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    backgroundColor: Colors.primaryColor,
  },
  login_container: {
    height: 330,
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
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
    color: Colors.black,
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
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  button_font: {
    color: Colors.white,
    fontSize: 17,
  },
  password_field: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});
