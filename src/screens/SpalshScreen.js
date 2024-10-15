import {Image, Modal, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utilities/styles/GlobalStyles';
import Loader from '../shared/Loader';
import {alertMessageType} from '../utilities/enum/Enum';
import AlertMessage from '../shared/AlertMessage';

export default function SpalshScreen() {
  const [isLoader, setIsloader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');

  const isLogIn = async () => {
    try {
      setIsloader(true);
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticate');
  
      if (isAuthenticated === 'true') {
        navigate('HomeTab');
      } else {
        navigate('Login');
      }
    } catch (e) {
      alertMessagePopUp('Something went wrong', alertMessageType.DANGER.code);
      console.log(e);
    } finally {
      setIsloader(false);
    }
  };
  

  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
  };

  useEffect(() => {
    isLogIn();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.image_container}>
        <Image
          source={require('../../assets/logo/react-logo.png')}
          style={styles.image}
        />
      </View>
      <AlertMessage message={alertMessage} messageType={alertType} />
      {/* loader */}
      <Modal transparent>
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
    backgroundColor: Colors.black,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
});
