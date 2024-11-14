import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import Loader from '../shared/Loader';

export default function DocumentDetails({route, navigation}) {
  const [loading, setLoading] = useState(false);
  const {documentUrl} = route.params;

  const goBack = () => {
    navigation.goBack();
  };

  const pdfHtmlContent = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: white;  
          }
          iframe {
            width: 100%;
            height: 100vh;
            border: none;
            background-color:white;
          }
        </style>
      </head>
      <body>
        <iframe src="https://docs.google.com/viewer?url=${documentUrl}&embedded=true"></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back-circle-outline" size={34} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Document</Text>
        </View>
        <Text style={styles.titling}>
          Expand Your Knowledge with These Resources.
        </Text>
      </ImageBackground>

      {/* WebView displaying the PDF */}
      <WebView
        originWhitelist={['*']}
        source={{html: pdfHtmlContent}}
        style={{flex: 1}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />

      {/* Loader */}
      <Modal visible={loading} transparent>
        <Loader />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  imgback: {
    padding: 16,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 120,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 12,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  titling: {
    fontSize: 13,
    color: '#000',
    paddingTop: 8,
  },
});
