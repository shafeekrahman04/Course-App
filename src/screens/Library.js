import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  RefreshControl,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDashboardData } from '../api/HomeApiService';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';
import { alertMessageType } from '../utilities/enum/Enum';

export default function Library({navigation}) {
 

  const defualtVideoData = {
    VideoId: "",
    VideoTitle: "",
    VideoDescription: "",
    VideoUrl: "",
    WatchedStatus: "",
    ThumbNail: "https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47"
  };

  const [refreshing, setRefreshing] = useState(false);
  const [videoData, setVideoData] = useState([defualtVideoData]);
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

  const openVideo = async (item) => {
    navigation.navigate('VideoScreen', { item });
    
  };

  const goBack = () => {
   
      navigation.goBack();
   
  };

  const renderVideoItem = ({item}) => (
    <TouchableOpacity onPress={() => openVideo(item)}>
      <View style={styles.recommendItem}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.thumbImg}
            source={{uri: item.ThumbNail }}
          />
          <TouchableOpacity
            style={styles.playCircleContainer}
            onPress={() => openVideo(item)}>
            <View style={styles.playCircle}>
              <Icon name="play" size={25} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.videoDetails}>
          <Text style={styles.videoTitle}>{item.VideoTitle}</Text>
          <Text style={styles.videoDescription}>{item.VideoDescription}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true);
    getVideoData().finally(() => setRefreshing(false));
  };
 
  const getVideoData = async () => {
    try {
      setLoader(true);
      const res = await getDashboardData();
      if (res) {
        if (res.data) {
          const defaultThumbnail = 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47';
          setVideoData(
            res.data.map(video => ({
              VideoId: video.VideoId,
              VideoTitle: video.VideoTitle,
              ThumbNail: video.ThumbNail || defaultThumbnail,
              VideoUrl: video.UploadedLocation,
              VideoDescription: video.VideoDescription,
              WatchedStatus: video.WatchedStatus,
            })),
          );
        } else
          alertMessagePopUp('Some thing went wrong',alertMessageType.DANGER.code);
      } else {
        alertMessagePopUp('Some thing went wrong Please Try Again Later',alertMessageType.DANGER.code);
      }
      setLoader(false);
    } catch (error) {
      alertMessagePopUp(error.message, alertMessageType.DANGER.code);
      console.error(error);
    }
  };

  useEffect(() => {
    getVideoData();
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
          <Text style={styles.title}>Library</Text>
        </View>
      </ImageBackground>
      {/*Search bar*/}
      {/* <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#777"
          style={styles.searchicon}
        />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View> */}
      <FlatList
        data={videoData}
        keyExtractor={item => item.VideoId}
        renderItem={renderVideoItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {/* Alert */}
      {isAlertVisible && (
      <AlertMessage message={alertMessage} messageType={alertType} />
    )}

      {/* loader */}
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
    marginTop: 12,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 5,
    marginTop: -30,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  searchicon: {
    marginLeft: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  recommendItem: {
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
  },
  thumbImg: {
    width: 110,
    height: 120,
    borderRadius: 8,
  },
  videoDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  videoDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  playButton: {
    backgroundColor: '#ffc100',
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
  },
  playCircleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
