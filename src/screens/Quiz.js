import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  RefreshControl,
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
const [refreshing, setRefreshing] = useState(false);

  const openQuizForm = (quiz) => {
    navigation.navigate('QuizDetails', { quiz });
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
        <Ionicons name="chevron-forward-outline" size={25} color="black" style={styles.iconStyle} />
      </View>
    </TouchableOpacity>
  );

  const onRefresh = () =>{
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false);
    }, 2000);
  }

  const goBack = () => {
    
      navigation.goBack();
    
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back-circle-outline" size={34} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Ready to Quiz? Let’s Go</Text>
          
        </View>
        <Text style={styles.titling}>Improve your skills with these quizzes.</Text>
      </ImageBackground>

      {/* List of quizzes */}
      <FlatList
        data={quizData}
        keyExtractor={(item) => item.id}
        renderItem={renderQuizItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      />

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
    alignItems:'center',
    justifyContent:'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 15,
    // marginTop: 8,
    justifyContent:'center'
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top:12,
    zIndex:10
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
    paddingTop:8
    
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
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fde07c',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  
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
    color: '#eebd01',
  },
  quizDescription: {
    fontSize: 15,
    color: '#757575',
    marginTop: 6,
    lineHeight:21
  },
  iconStyle: {
    marginLeft: 10,
  },
});

