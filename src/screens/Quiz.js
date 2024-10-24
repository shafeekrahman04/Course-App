import React from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sample quiz data



const quizData = [
  {
    id: '1',
    title: 'Cybersecurity Basics',
    description: 'Test your knowledge about cybersecurity fundamentals.',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
  },
  {
    id: '2',
    title: 'Data Privacy Essentials',
    description: 'How well do you understand data privacy?',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',

  },
  {
    id: '3',
    title: 'Phishing Awareness',
    description: 'Recognize phishing attacks and stay safe online.',
    thumbnailUrl:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',

  },
  // Add more quizzes as needed
];

export default function QuizScreen({ navigation }) {

  const openQuizForm = (quiz) => {
    navigation.navigate('QuizModal', { quiz });
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity onPress={() => openQuizForm(item)}>
      <View style={styles.quizItem}>
        <View style={styles.imageContainer}>
          {/* <Image style={styles.quizImage} source={{ uri: item.thumbnailUrl }} /> */}
        </View>
        <View style={styles.quizDetails}>
          <Text style={styles.quizText}>{item.title}</Text>
          <Text style={styles.quizDescription}>{item.description}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} color="#ffc100" style={styles.iconStyle} />
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
        
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
            <Ionicons name="arrow-back-circle-outline" size={34} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Quiz </Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="share-social-outline" size={30} color="#fff"/>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Search bar */}
      {/* <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#777" style={styles.searchicon} />
        <TextInput style={styles.searchInput} placeholder="Search quizzes" />
      </View> */}

      {/* List of quizzes */}
      <FlatList
        data={quizData}
        keyExtractor={(item) => item.id}
        renderItem={renderQuizItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgback: {
    padding: 16,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 120,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    justifyContent:'space-between'
  },
  backButton: {
    position: 'absolute',
    left: 0,
    // backgroundColor:'black',
    // borderRadius:25,
    // padding:2
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
    shadowOffset: { width: 0, height: 2 },
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
  quizItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#888',
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    marginHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',

  },
  quizImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },

  quizDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  quizText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  quizDescription: {
    fontSize: 15,
    color: '#fff',
    marginTop: 5,
  },
  iconStyle: {
    marginLeft: 10,
  },
});
