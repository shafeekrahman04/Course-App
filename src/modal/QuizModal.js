// QuizModal.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const QuizModal = ({
  isVisible,
  questions,
  onClose,
  onSubmit,
  selectedAnswers,
  setSelectedAnswer,
}) => {
  const handleOptionSelect = (questionIndex, option) => {
    const newAnswer = [...selectedAnswers];
    newAnswer[questionIndex] = option;
    setSelectedAnswer(newAnswer);
  };

  const renderQuestionItem = ({item, index}) => (
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

  const calculateModalHeight = () => {
    const baseHeight = 100;
    const questionHeight = 60;
    const maxHeight = '80%';

    const totalHeight = Math.min(
      baseHeight + questions.length * questionHeight,
      parseInt(maxHeight),
    );

    return `${totalHeight}%`;
  };

  const modalHeight = calculateModalHeight();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={[styles.modalView, {height: modalHeight}]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="arrow-back" size={24} color="#ffc100" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#ffc100" />
          </TouchableOpacity>
        </View>
        <Text style={styles.modaltxt}>Quiz Question</Text>
        <FlatList
          data={questions}
          renderItem={renderQuestionItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatList}
        />
        <TouchableOpacity style={styles.submitQuizbtn} onPress={onSubmit}>
          <Text style={styles.submitQuizTxt}>Submit Quiz</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    marginBottom: 10,
  },
  modaltxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  quesContainer: {
    marginBottom: 20,
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
    borderRadius: 8,
  },
  submitQuizTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QuizModal;
