import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QuizModal from '../modal/QuizModal';

const videoData = [
  {
    id: '1',
    title: 'Voice on Security: USB Drop',
    description:
      'This video discusses the risks of using unknown USB devices and how they can pose a security threat.',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
  },
  {
    id: '2',
    title: 'The Threat of Free WiFi',
    description:
      'Learn about the dangers of using unsecured public WiFi networks and how to protect your data.',
    uri: 'https://www.w3schools.com/html/movie.mp4',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
  },
  {
    id: '3',
    title: 'Cybersecurity Essentials',
    description:
      'An introduction to the basics of cybersecurity and why it’s important for everyone.',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-3.png?alt=media&token=42b8ef40-cdaa-45e2-b8e1-df0454163369',
  },
];

const quizQuestion = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris,',
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

export default function VideoScreen() {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(videoData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQuizButton, setIsQuizButton] = useState(false);
  const [isQuizModal, setIsQuizModal] = useState(false);
  const [isQuizSubmit, setIsQuizSubmit] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(
    Array(quizQuestion.length).fill(null),
  );
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const playVideo = video => {
    setCurrentVideo(video); // Update the video source
    setIsPlaying(true); // Start playing the video
    setIsQuizButton(false);
    setIsQuizSubmit(false);
    setSelectedAnswer(Array(quizQuestion.length).fill(null));
    setIsVideoEnded(false);
  };

  const renderRecommendedItem = ({item}) => (
    <TouchableOpacity
      style={styles.recommendItem}
      onPress={() => playVideo(item)}>
      <Image source={{uri: item.thumbnail}} style={styles.recommendImage} />
      <Text style={styles.recommendText}>{item.title}</Text>
    </TouchableOpacity>
  );
  const handleVideoEnd = () => {
    if (!isQuizSubmit) {
      setIsQuizButton(true);
      setIsVideoEnded(true);
    }
  };

  const openQuizModal = () => {
    setIsQuizModal(true);
  };

  const closeQuizModal = () => {
    setIsQuizModal(false);
  };

  const submitQuiz = () => {
    const correctAnswer = quizQuestion.map(q => q.answer);
    const isCorrect = selectedAnswer.every(
      (answer, index) => answer === correctAnswer[index],
    );
    alert(
      isCorrect ? 'Quiz completed successfully!' : 'Some answer are incorrect',
    );
    setIsQuizSubmit(true);
    setIsQuizModal(false);
    setIsQuizButton(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
          style={styles.video}
          resizeMode="contain"
          controls={true}
          paused={!isPlaying}
          onEnd={handleVideoEnd}
          onError={error => console.log('Video Error: ', error)}
        />
        {/* Play button */}
        {!isPlaying && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsPlaying(true)}>
            <Ionicons name="play-circle-outline" size={64} color="#fff" />
          </TouchableOpacity>
        )}

        {/* Quiz button */}
        {isQuizButton && !isQuizSubmit && (
          <TouchableOpacity style={styles.quizButton} onPress={openQuizModal}>
            <Text style={styles.quizbtnText}>Take the Quiz</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Video Details */}
      <View style={styles.videoDetails}>
        {isVideoEnded && !isQuizSubmit && (
          <View style={styles.quizIncomplete}>
            <Text style={styles.incompleteTxt}>Quiz not Complete</Text>
          </View>
        )}
        <Text style={styles.videoTitle}>{currentVideo.title}</Text>
        <Text style={styles.videoDescription}>{currentVideo.description}</Text>
      </View>

      {/* Recommended Videos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Videos</Text>
        <FlatList
          data={videoData}
          renderItem={renderRecommendedItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Quiz Modal */}
      <QuizModal
        isVisible={isQuizModal}
        questions={quizQuestion}
        onClose={closeQuizModal}
        onSubmit={submitQuiz}
        selectedAnswers={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    height: 250,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDetails: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  videoDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  recommendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  recommendImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    alignSelf: 'center',
  },
  quizbtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  //modal
  quizIncomplete: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffcccc',
    borderRadius: 8,
  },
  incompleteTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d9534f',
    textAlign: 'center',
  },
  recommendText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    flex: 1,
  },
  quizButton: {
    position: 'absolute',
    bottom: '15%',
    left: '78%',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    paddingVertical: 10,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 25,
    transform: [{translateX: -50}],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
