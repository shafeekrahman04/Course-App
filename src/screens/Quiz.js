import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  RefreshControl,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getQuizDetails } from '../api/HomeApiService';
import Loader from '../shared/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Sample quiz data



export default function QuizScreen({ navigation }) {
  

const [refreshing, setRefreshing] = useState(false);
const [quizData, setQuizData] = useState([]);
const [loading, setLoading] = useState(false);

const fetchQuizList = async () => {
  setLoading(true);
  try {
    const userId = await AsyncStorage.getItem("userId");
    const res = await getQuizDetails(userId);
    setQuizData(res.data); 
  } catch (error) {
    console.error('Failed to fetch quiz list:', error);
  } finally {
    setLoading(false);
  }
};
 useEffect(()=>{
  fetchQuizList();
 },[]);

  const openQuizForm = async (quizId) => {
    setLoading(true);
    try{
      const res = await getQuizDetails(quizId);
      const quizDetails = res.data;
      setLoading(false);
      navigation.navigate('QuizDetails',{quizId});
    }
   catch(error){
    setLoading(false);
    console.error('Failed to fetch quiz details:', error);
   }
  };
  

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity onPress={() => openQuizForm(item.QuizId)}>
      <View style={styles.quizItem}>
        <View style={styles.imageContainer}>
        </View>
        <View style={styles.quizDetails}>
        <View style={styles.titleContainer}>
          <Text style={styles.quizText}>{item.QuizTitle}</Text>
          {item.QuizAttendStatus === 1 && (
            <>
            <Ionicons name="checkmark-circle" size={20} color="green" style={styles.attendedIcon} />
            <Text>Complete</Text>
            </>
          )}
        </View>
          <Text style={styles.quizDescription}>{item.QuizDescription}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} color="black" style={styles.iconStyle} />
      </View>
    </TouchableOpacity>
  );

  const onRefresh = () =>{
    setRefreshing(true);
    fetchQuizList().finally(()=> setRefreshing(false));
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
        keyExtractor={(item) => item.QuizId}
        renderItem={renderQuizItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      />
 {/* loader */}
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
  titleContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  }
});

