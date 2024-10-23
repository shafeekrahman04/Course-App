import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../security/AuthContext';

const videoData = [
  {
    id: '1',
    title: 'Voice on Security: USB Drop',
    description: 'Learn about the risks of USB drops.',
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/video%2FWhatsApp%20Video%202024-09-13%20at%205.25.47%20PM.mp4?alt=media&token=712f3f73-9b61-4c5a-97e9-7081dc161e33',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
  },
  {
    id: '2',
    title: 'The Threat of Free WiFi',
    description: 'Understand the risks of public WiFi.',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
  },
  {
    id: '3',
    title: 'Cybersecurity Essentials',
    description: 'Basic cybersecurity tips everyone should know.',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-3.png?alt=media&token=42b8ef40-cdaa-45e2-b8e1-df0454163369',
  },
  {
    id: '4',
    title: 'Data Privacy Basics',
    description: 'Protecting your personal data.',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-4.webp?alt=media&token=b73d88fa-55e4-47dd-9190-04d6962d76ff',
  },
  {
    id: '5',
    title: 'Encora Unity Basic Course',
    description: 'Essentials of Unity game development',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
  },
  {
    id: '6',
    title: 'Encora Unity Basic Course',
    description: 'Essentials of Unity game development',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
  },
];

export default function Home({navigation}) {

  const authContext = useAuth();
  const openVideo = videoUri => {
    navigation.navigate('VideoScreen', {videoUri});
  };

  function logoutHandler() {
    authContext.logout();
    navigation.navigate('Login');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 20}}>
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
          <View style={styles.recommendations}>
            {videoData.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => openVideo(item.videoUrl)}>
                <View style={styles.recommendItem}>
                  <Image
                    style={styles.recommendImage}
                    source={{uri: item.thumbnailUrl}}
                  />
                  <Text style={styles.recommendText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Watched Video */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Watched Video</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.recommendations}>
            {videoData.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => openVideo(item.videoUrl)}>
                <View style={styles.recommendItem}>
                  <Image
                    style={styles.recommendImage}
                    source={{uri: item.thumbnailUrl}}
                  />
                  <Text style={styles.recommendText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
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
  recommendations: {
    flexDirection: 'row',
  },
  recommendItem: {
    width: 200,
    marginRight: 10,
  },
  recommendImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  recommendText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  orgRecommendations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orgRecommendItem: {
    width: '48%',
  },
  orgRecommendText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
