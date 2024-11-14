import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDocDetails} from '../api/HomeApiService';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';
import {alertMessageType} from '../utilities/enum/Enum';

export default function Document({navigation}) {

  const [refreshing, setRefreshing] = useState(false);
  const [pdfData, setPdfData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
    setIsAlertVisible(true);
  };

  const openDocumentDetails = item => {
    navigation.navigate('DocumentDetails', {documentUrl: item.DocLocation});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderDocItem = item => (
    <TouchableOpacity key={item.id} onPress={() => openDocumentDetails(item)}>
      <View style={styles.docView}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.thumbImg}
            source={require('../assets/pdf/pdf.png')}
          />
        </View>
        <View style={styles.docDetail}>
          <Text style={styles.docTitle}>{item.Name}</Text>
          <Text style={styles.docDescription}>{item.Description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getDocData = async () => {
    try {
      setLoader(true);
      const response = await getDocDetails();
      if (response) {
        if (response.data) {
          setPdfData(
            response.data.map(res => ({
              id: res.ID,
              Name: res.Name,
              Description: res.Description,
              DocLocation: res.DocLocation,
            })),
          );
        } else
          alertMessagePopUp(
            'Some thing went wrong',
            alertMessageType.DANGER.code,
          );
      } else {
        alertMessagePopUp(
          'Some thing went wrong Please Try Again Later',
          alertMessageType.DANGER.code,
        );
      }
      setLoader(false);
    } catch (error) {
      alertMessagePopUp(error.message, alertMessageType.DANGER.code);
      console.error(error);
    }
  };

  useEffect(() => {
    getDocData();
  }, []);

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
        <Text style={styles.titling}>Expand Your Knowledge with These Resources.</Text>
      </ImageBackground>

      <ScrollView
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {pdfData.length > 0 ? (
          pdfData.map(item => renderDocItem(item))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No Data Available</Text>
          </View>
        )}
      </ScrollView>

      {/* Alert */}
      {isAlertVisible && (
        <AlertMessage message={alertMessage} messageType={alertType} />
      )}

      {/* Loader */}
      <Modal visible={loader} transparent>
        <Loader />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imgback: {
    padding: 16,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 120,
  },
  header: {
    padding: 15,
    // marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 24,
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  titling: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  listContainer: {
    padding: 10,
  },
  docView: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderBottomWidth: 1, // Add this line for the bottom border
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
  },
  thumbImg: {
    width: 110,
    height: 120,
    borderRadius: 8,
  },
  docDetail: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  docTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  docDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
  },
});
