import {Image, Modal, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utilities/styles/GlobalStyles';
import Loader from '../shared/Loader';
import {alterMessageType} from '../utilities/enum/Enum';
import AlertMessage from '../shared/AlertMessage';

export default function SpalshScreen({navigation}) {
  const [isLoader, setIsloader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');

  const isLogIn = async () => {
    try {
      setIsloader(true);
      navigation.replace('Login');
      setIsloader(false);
    } catch (e) {
      setIsloader(false);
      alterMessagePopUp('Something is wrong', alterMessageType.DANGER.code);
      console.log(e);
    }
  };

  const alterMessagePopUp = (message, messageType) => {
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
