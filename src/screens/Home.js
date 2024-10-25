import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../security/AuthContext';
import {getDashboardData} from '../api/HomeApiService';
import {alertMessageType} from '../utilities/enum/Enum';
import AlertMessage from '../shared/AlertMessage';
import Loader from '../shared/Loader';

export default function Home({navigation}) {
  const defualtVideoData = {
    id: '',
    title: '',
    thumbnailUrl: '',
    videoUrl: '',
    description: '',
    watchedStatus: '',
  };
  const [refreshing, setRefreshing] = useState(false);

  const authContext = useAuth();
  const [watchedVideoData, setWatchedVideoData] = useState(defualtVideoData);
  const [unWatchedVideoData, setUnWatchedVideoData] = useState(defualtVideoData);
  const [loader, setLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    timestamp: Date.now(),
  });
  const [alertType, setAlertType] = useState('');

  const alertMessagePopUp = (message, messageType) => {
    setAlertMessage({message: message, timestamp: new Date()});
    setAlertType(messageType);
  };

  const openVideo = videoUri => {
    navigation.navigate('VideoScreen', {videoUri});
  };

  function logoutHandler() {
    authContext.logout();
    navigation.navigate('Login');
  }

  const getVideoData = async () => {
    try {
      setLoader(true);
      const res = await getDashboardData();
      if (res) {
        if (res.data) {
          const watchedVideos = res.data.filter(
            video => video.WatchedStatus === 1,
          );
          const unwatchedVideos = res.data.filter(
            video => video.WatchedStatus === 0,
          );
          const defaultThumbnail = 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47';

          setWatchedVideoData(
            watchedVideos.map(video => ({
              id: video.VideoId,
              title: video.VideoTitle,
              thumbnailUrl: video.ThumbNail || defaultThumbnail,
              videoUrl: video.UploadedLocation,
              description: video.VideoDescription,
              watchedStatus: video.WatchedStatus,
            })),
          );

          setUnWatchedVideoData(
            unwatchedVideos.map(video => ({
              id: video.VideoId,
              title: video.VideoTitle,
              thumbnailUrl: video.ThumbNail || defaultThumbnail,
              videoUrl: video.UploadedLocation,
              description: video.VideoDescription,
              watchedStatus: video.WatchedStatus,
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Header */}
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hi, ALEX</Text>
          <Text style={styles.subText}>Let's start learning!</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications-outline" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon
              name="log-out-outline"
              size={25}
              color="#000"
              onPress={logoutHandler}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Search Bar */}

      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#777"
          style={styles.searchicon}
        />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      {/*Latest Learned*/}
      <View style={styles.section}>
        <View>
          <Text style={styles.sectionTitle}>Latest Learned</Text>
          <View>
            <TouchableOpacity
              onPress={() =>
                openVideo(
                  'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/video%2FWhatsApp%20Video%202024-09-13%20at%205.25.47%20PM.mp4?alt=media&token=712f3f73-9b61-4c5a-97e9-7081dc161e33',
                )
              }>
              <View style={styles.latestlearned}>
                <Image
                  style={styles.learnImg}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
                  }}
                  blurRadius={5}
                />
                <View style={styles.learnedOverlay}>
                  <Text style={styles.learnedTitle}>
                    Road to Javascript Expert
                  </Text>
                  <Text style={styles.learnedSubtitle}>
                    Part 1 • 20 Minutes
                  </Text>
                </View>
                <View style={styles.playButton}>
                  <Ionicons name="play" size={25} color="grey" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Latest Video */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Video</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.videoSection}>
            {unWatchedVideoData.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.videoSection}>
                  {unWatchedVideoData.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => openVideo(item.videoUrl)}>
                      <View style={styles.videoItem}>
                        <Image
                          style={styles.thumbNailImg}
                          source={{uri: item.thumbnailUrl}}
                        />
                        <Text style={styles.videoTitle}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <Text style={styles.noDataText}>
                No videos available in this section.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Watched Video */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Watched Video</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.videoSection}>
            {watchedVideoData.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.videoSection}>
                  {watchedVideoData.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => openVideo(item.videoUrl)}>
                      <View style={styles.videoItem}>
                        <Image
                          style={styles.thumbNailImg}
                          source={{uri: item.thumbnailUrl}}
                        />
                        <Text style={styles.videoTitle}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <Text style={styles.noDataText}>No videos watched yet.</Text>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Alert */}
      <AlertMessage message={alertMessage} messageType={alertType} />

      {/* loader */}
      <Modal visible={loader} transparent>
        <Loader />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    margin: 0,
    padding: 0,
  },
  imgback: {
    padding: 16,
    flex: 1,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 120,
  },
  title: {
    fontSize: 30,
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    color: '#888',
  },
  notificationIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fde07c',
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
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  searchicon: {
    marginLeft: 10,
  },

  //learn
  learnImg: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  learnedOverlay: {
    position: 'absolute',
    left: 20,
    bottom: 10,
  },
  learnedTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  learnedSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
  playButton: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    marginLeft: 15,
    borderColor: '#ffc100',
    borderWidth: 2,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
  },

  //
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 30,
  },

  //latest
  videoSection: {
    flexDirection: 'row',
  },
  videoItem: {
    width: 200,
    marginRight: 10,
  },
  thumbNailImg: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
});
