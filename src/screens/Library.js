import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import videoData from '../utilities/constant/VideoData';

export default function Library({navigation}) {
  const openVideo = videoUri => {
    navigation.navigate('VideoScreen', {videoUri});
  };

  const renderVideoItem = ({item}) => (
    <TouchableOpacity onPress={() => openVideo(item.videoUrl)}>
      <View style={styles.recommendItem}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.recommendImage}
            source={{uri: item.thumbnailUrl}}
          />
          <TouchableOpacity
            style={styles.playCircleContainer}
            onPress={() => openVideo(item.videoUrl)}>
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
        source={require('../assets/logo/bg1.jpg')}>
        <View style={styles.header}>
          <Text style={styles.title}>Library</Text>
        </View>
      </ImageBackground>
      {/*Search bar*/}
      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#777"
          style={styles.searchicon}
        />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>
      <FlatList
        data={videoData}
        keyExtractor={item => item.id}
        renderItem={renderVideoItem}
      />
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
    borderBottomWidth: 1, // Add this line for the bottom border
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
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
