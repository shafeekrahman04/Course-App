// QuizModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const quizQuestion = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: [
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
      'Pacific Ocean',
    ],
    answer: 'Pacific Ocean',
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      'Charles Dickens',
      'Mark Twain',
      'William Shakespeare',
      'Leo Tolstoy',
    ],
    answer: 'William Shakespeare',
  },
];

const QuizModal = ({ navigation }) => {

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quizQuestion.length).fill(null)
  );


  const handleOptionSelect = (questionIndex, option) => {
    const newAnswer = [...selectedAnswers];
    newAnswer[questionIndex] = option;
    setSelectedAnswers(newAnswer);
  };

  const handleQuizSubmit = () => {
    const correctAnswer = quizQuestion.map(q => q.answer);
    const isCorrect = selectedAnswers.every(
      (answer, index) => answer === correctAnswer[index],
    );
    alert(
      isCorrect ? 'Quiz completed successfully!' : 'Some answer are incorrect',
    );
    setTimeout(() => {
      navigation.navigate('Quiz');
    }, 2000);
  }

  const renderQuestionItem = ({ item, index }) => (
    <View key={index} style={styles.quesContainer}>
      <Text style={styles.quesText}>{`${index + 1}) ${item.question}`}</Text>
      <View style={styles.optionsContainer}>
        {item.options.map(option => (
          <TouchableOpacity
            key={option}
            style={styles.optionContainer}
            onPress={() => handleOptionSelect(index, option)}>
            <View
              style={[
                styles.radioCircle,
                selectedAnswers[index] === option && styles.selectedRadioCircle,
              ]}>
              {selectedAnswers[index] === option && (
                <View style={styles.radioInnerCircle} />
              )}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

 

  return (
   
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="chevron-back-circle-sharp" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.modaltxt}>Quiz Question</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>

        </View>

      </ImageBackground>

      <FlatList
        data={quizQuestion}
        renderItem={renderQuestionItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.submitQuizbtn} onPress={handleQuizSubmit}>
        <Text style={styles.submitQuizTxt}>Submit Quiz</Text>
      </TouchableOpacity>
    </View>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:15,
    backgroundColor: '#fff'
  },
  imgback: {
    padding: 16,
    resizeMode: 'cover',
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // overflow: 'hidden',
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
    // width: '100%',
    // marginBottom: 10,
    marginTop: 10,
  },
  modaltxt: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 20,
    color: '#888',
  },
  quesContainer: {
    marginBottom: 20,
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
    // borderRadius: 8,
    alignItems: 'center',
  },
  submitQuizTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QuizModal;
