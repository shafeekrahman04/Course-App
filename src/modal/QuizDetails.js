import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getQuizDetails, quizSave } from '../api/HomeApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizDetails = ({navigation, route}) => {
  const {quizId} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [quizData, setQuizData] = useState({ QuestionAnswerDetails: [] });
  const [isQuizAttended, setIsQuizAttended] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const fetchQuizData = async () => {
    try {
      setLoader(true);
      
      const userId = await AsyncStorage.getItem('userId');
      const res = await getQuizDetails(userId);
      const quiz =res.data.find(quiz => quiz.QuizId === quizId)
      // console.log('API Response:',quiz);
      if(quiz)
      {
        setQuizData(quiz);
      setIsQuizAttended(quiz.QuizAttendStatus === 'Attended');
      // if(quiz.QuizAttendStatus === 'Attended'){
      //   setSelectedAnswers(quiz.QuestionAnswerDetails.map(q => q.Answer));
      // }
      }
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  const handleOptionSelect = (questionIndex, option) => {
    if (!isQuizAttended) {
      const newAnswer = [...selectedAnswers];
      newAnswer[questionIndex] = option;
      setSelectedAnswers(newAnswer);
    }
  };

  const handleQuizSubmit = async () => {
   
    const userId = await AsyncStorage.getItem('userId');
    const correctAnswer = quizData.QuestionAnswerDetails.map(q => q.Answer);
    const isCorrect = selectedAnswers.every((answer, index) => answer === correctAnswer[index]);

    const submissionData={
      quizId,userId
    };
   Alert.alert(
      isCorrect ? 'Quiz completed successfully!' : 'Some answer are incorrect',);
      const res =await quizSave(submissionData);
    console.log('quiz data:',submissionData);
    // try{
      
    //   const res =await quizSave(submissionData);
    //   if(res.success){
    //    Alert.alert('Success', 'Quiz completed successfully!');
    //    setIsQuizAttended(true);
    //   }else {
    //     Alert.alert('Error','Failed to submit quiz')
    //   }
    // }catch{
    //   console.log('Error submitting quiz:',error);
    //   alert('Error', 'something went wrong');
    // }
    // setIsQuizAttended(true);
    setTimeout(() => {
      navigation.navigate('Quiz');
    }, 2000);
  };

  const renderQuestionItem = ({ item, index }) => (
    <View key={index} style={styles.quesContainer}>
      <Text style={styles.quesText}>{`${index + 1}) ${item.Question}`}</Text>
      <View style={styles.optionsContainer}>
        {[item.Option1, item.Option2, item.Option3, item.Option4].map(option => (
          <TouchableOpacity
            key={option}
            style={styles.optionContainer}
            onPress={() => handleOptionSelect(index, option)}
            disabled={isQuizAttended}
          >
            <View
              style={[
                styles.radioCircle,
                selectedAnswers[index] === option && styles.selectedRadioCircle,
                isQuizAttended && styles.disabledOption,
              ]}
            >
              {selectedAnswers[index] === option && (
                <View style={styles.radioInnerCircle} />
              )}
            </View>
            <Text style={[styles.optionText,
              isQuizAttended && styles.disabledOptionText,
            ]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isQuizAttended && (
         <View style={styles.answerContainer}>
         <Text style={styles.answerTitleText}>Answer: </Text>
         <Text style={styles.answerText}>{item.Answer}</Text>
       </View>
      )}
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchQuizData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
            <Icon name="chevron-back-circle-sharp" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.modaltxt}>Quiz Question</Text>
        </View>
      </ImageBackground>

      <FlatList
        data={quizData.QuestionAnswerDetails}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.QAID.toString()} 
        style={styles.flatList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {!isQuizAttended && (
      <TouchableOpacity style={styles.submitQuizbtn} onPress={handleQuizSubmit} disabled={isQuizAttended}>
        <Text style={styles.submitQuizTxt}>Submit Quiz</Text>
      </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imgback: {
    padding: 16,
    resizeMode: 'cover',
    height: 80,
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modaltxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#888',
    flex:1,
    textAlign:'center'
  },
  quesContainer: {
    marginBottom: 10,
    padding: 15
  },
  quesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionContainer: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadioCircle: {
    borderColor: '#ffc100',
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 10,
    backgroundColor: '#ffc100',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    flexShrink: 1,
  },
  submitQuizbtn: {
    backgroundColor: '#ffc100',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  submitQuizTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  answerTitleText:{
    color:'green',
    marginTop:5,
    fontSize:18,
    fontWeight:'bold'
  },
  answerText:{
    color:'#1d1160',
    marginTop:5,
    fontSize:18,
    fontWeight:'bold'
  },
  disabledOption: {
    backgroundColor: '#d3d3d3', 
  },
  disabledOptionText: {
    color: '#808080', 
   
  },
  answerContainer:{
    flexDirection:'row'
  },
});

export default QuizDetails;
