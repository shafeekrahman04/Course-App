import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../shared/Header';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';


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
    id:'5',
    title:'Encora Unity Basic Course',
    description:'Essentials of Unity game development',
    thumbnailUrl:
    'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
  },
  {
    id:'6',
    title:'Encora Unity Basic Course',
    description:'Essentials of Unity game development',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
  },
]


export default function Library({ navigation }) {

  const openVideo = (videoUri) => {
    navigation.navigate('VideoScreen', { videoUri });
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity onPress={() => openVideo(item.videoUrl)}>
      <View style={styles.recommendItem}>
        <View style={styles.imageContainer}>
        <Image style={styles.recommendImage} source={{ uri: item.thumbnailUrl }} />
          <TouchableOpacity style={styles.playCircleContainer} onPress={() => openVideo(item.videoUrl)}>
            <View style={styles.playCircle}>
              <Icon name="play" size={25} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.recommendDetails}>
          <Text style={styles.recommendText}>{item.title}</Text>
          <Text style={styles.recommendDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Library</Text>

        </View>
      </ImageBackground>
      {/*Search bar*/}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#777" style={styles.searchicon} />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoItem}
      />
      {/*progress bar*/}
      {/* <View style={styles.searchBar}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressLeftText}>Training completed</Text>
          <Text style={styles.progressRightText}>50%</Text>
        </View>
        <Progress.Bar progress={0.5} width={320} height={15} borderRadius={25} animated={true} color='#ffc100' style={styles.progressbar} />

      </View> */}

      {/*Latest Learned*/}
      {/* <View style={styles.section}>
        <View>
          <Text style={styles.sectionTitle}>Latest Learned</Text>
          <View>
            <TouchableOpacity
              onPress={() =>
                openVideo('https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/video%2FWhatsApp%20Video%202024-09-13%20at%205.25.47%20PM.mp4?alt=media&token=712f3f73-9b61-4c5a-97e9-7081dc161e33')
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
                  <Text style={styles.learnedTitle}>Road to Javascript Expert</Text>
                  <Text style={styles.learnedSubtitle}>Part 1 • 20 Minutes</Text>
                </View>
                <View style={styles.playButton}>
                  <Ionicons name="play" size={25} color="grey" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
      {/* Recommended for You */}
      {/* <View style={styles.section}> */}
      {/* <Text style={styles.sectionTitle}>Recommended for You</Text> */}
      {/* <FlatList>
          <View style={styles.recommendations}>
            <TouchableOpacity
              onPress={() =>
                openVideo('https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/video%2FWhatsApp%20Video%202024-09-13%20at%205.25.47%20PM.mp4?alt=media&token=712f3f73-9b61-4c5a-97e9-7081dc161e33')
              }>
              <View style={styles.recommendItem}>
                <Image
                  style={styles.recommendImage}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
                  }}
                />
                <Text style={styles.recommendText}>
                  Voice on Security: USB Drop
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.recommendItem}>
              <Image
                style={styles.recommendImage}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
                }}
              />
              <Text style={styles.recommendText}>The Threat of Free WiFi</Text>
            </View>
            <View style={styles.recommendItem}>
              <Image
                style={styles.recommendImage}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-3.png?alt=media&token=42b8ef40-cdaa-45e2-b8e1-df0454163369',
                }}
              />
              <Text style={styles.recommendText}>Cybersecurity Essentials</Text>
            </View>
            <View style={styles.recommendItem}>
              <Image
                style={styles.recommendImage}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-4.webp?alt=media&token=b73d88fa-55e4-47dd-9190-04d6962d76ff',
                }}
              />
              <Text style={styles.recommendText}>Data Privacy Basics</Text>
            </View>
          </View>
        </FlatList>
      </View> */}

      {/* Recommended by Your Organization */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Recommended by Your Organization
        </Text>
        <View style={styles.orgRecommendations}>
          <View style={styles.orgRecommendItem}>
            <Image
              style={styles.recommendImage}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
              }}
            />
            <Text style={styles.orgRecommendText}>
              Encora Unity Basic Course
            </Text>
          </View>
          <View style={styles.orgRecommendItem}>
            <Image
              style={styles.recommendImage}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-4.webp?alt=media&token=b73d88fa-55e4-47dd-9190-04d6962d76ff',
              }}
            />
            <Text style={styles.orgRecommendText}>Kubernetes Assessment</Text>
          </View>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // marginBottom: 10,
  //   // backgroundColor: '#fff',
  // },
  // imgback: {
  //   padding: 16,
  //   // flex: 1,
  //   resizeMode: 'cover',
  //   borderBottomLeftRadius: 30,
  //   borderBottomRightRadius: 30,
  //   overflow: 'hidden',
  //   height: 120,
  // },
  // header: {
  //   // backgroundColor: '#281e6e',
  //   padding: 15,
  //   marginTop: 20,

  // },
  // title: {
  //   fontSize: 24,
  //   color: '#888',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // searchBar: {

  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  //   borderRadius: 30,
  //   marginTop: -30,
  //   paddingHorizontal: 15,
  //   paddingVertical: 8,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
  //   elevation: 5,
  //   width: '90%',
  //   marginLeft: 20,
  //   marginRight: 20,

  //   flexDirection: 'column',
  //   alignItems: 'flex-start'
  // },
  // progressContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '100%',
  //   paddingBottom: 10,
  // },
  // progressLeftText: {
  //   fontSize: 14,
  //   color: '#000',
  // },
  // progressRightText: {
  //   fontSize: 14,
  //   color: '#000',
  // },
  // // progressbar: {
  // //   width: '100%',  
  // // },
  // learnImg: {
  //   width: '100%',
  //   height: 200,
  //   borderRadius: 8,
  // },
  // learnedOverlay: {
  //   position: 'absolute',
  //   left: 20,
  //   bottom: 10,
  // },
  // learnedTitle: {
  //   color: '#fff',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   paddingBottom: 5
  // },
  // learnedSubtitle: {
  //   color: '#fff',
  //   fontSize: 12,
  // },
  // playButton: {
  //   position: 'absolute',
  //   right: 20,
  //   bottom: 10,
  //   backgroundColor: 'white',
  //   borderRadius: 25,
  //   padding: 10,
  //   marginLeft: 15,
  //   borderColor: '#ffc100',
  //   borderWidth: 2,
  // },
  // searchContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#ffffff',
  //   borderRadius: 30,
  //   padding: 5,
  //   marginTop: -30,
  //   width: '90%',
  //   marginLeft: 20,
  //   marginRight: 20,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // searchInput: {
  //   marginLeft: 10,
  //   flex: 1,
  //   fontSize: 16,
  // },
  // searchicon: {
  //   marginLeft: 10
  // },
  // section: {
  //   padding: 15,
  // },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#888',
  //   marginBottom: 30,
  // },
  // recommendations: {
  //   flexDirection: 'row',
  // },
  // recommendItem: {
  //   width: 200,
  //   marginRight: 10,
  // },
  // recommendImage: {
  //   width: '100%',
  //   height: 120,
  //   borderRadius: 8,
  // },
  // recommendText: {
  //   marginTop: 5,
  //   fontSize: 14,
  //   color: '#000',
  //   fontWeight: 'bold',
  // },
  // orgRecommendations: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // orgRecommendItem: {
  //   width: '48%',
  // },
  // orgRecommendText: {
  //   color: '#000',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
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
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#888',
    fontWeight: 'bold',
    textAlign: 'center',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:10
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
borderBottomWidth: 1,  // Add this line for the bottom border
    borderBottomColor: '#ccc', 
  marginHorizontal:10,

  },
  recommendImage: {
    width: 110,
    height: 120,
    borderRadius: 8,
  },
  recommendDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  recommendText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendDescription: {
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
  recommendImage: {
    width: 110,
    height: 120,
    borderRadius: 8,
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
