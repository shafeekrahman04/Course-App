import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import QuizModal from '../modal/QuizModal';
import Orientation from 'react-native-orientation-locker';
import PlayerControls from './video-player/playerControls';
import ProgressBar from './video-player/progressBar';
import FullscreenOpen from '../utilities/svg/FullscreenOpen';
import FullscreenClose from '../utilities/svg/FullscreenClose';

const windowHeight = Dimensions.get('window').width * (9 / 16);
const windowWidth = Dimensions.get('window').width;

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;

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
    Array(quizQuestion.length).fill(null)
  );
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControl, setShowControl] = useState(true);

  useEffect(() => {
    const handleOrientation = (orientation) => {
      setFullscreen(orientation.includes('LANDSCAPE'));
      StatusBar.setHidden(orientation.includes('LANDSCAPE'));
    };

    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  const playVideo = (video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    setIsQuizButton(false);
    setIsQuizSubmit(false);
    setSelectedAnswer(Array(quizQuestion.length).fill(null));
    setIsVideoEnded(false);
  };

  const handleVideoEnd = () => {
    if (!isQuizSubmit) {
      setIsQuizButton(true);
      setIsVideoEnded(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    setShowControl(true);
  };
  
  const onLoadEnd = (data) => {
    setDuration(data.duration);
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onSeek = (seekTime) => {
    videoRef.current.seek(seekTime);
  };

  const handleControls = () => {
    setShowControl((prev) => !prev);
  };

  const handleFullscreen = () => {
    if (fullscreen) {
      Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToLandscapeLeft();
    }
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
      <View style={fullscreen ? styles.fullscreenContainer : styles.videoContainer}>
        <TouchableOpacity onPress={handleControls}>
          <Video
            ref={videoRef}
            source={{ uri: currentVideo.uri}}
            style={fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            paused={!isPlaying}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={handleVideoEnd}
          />

          {showControl && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                style={styles.fullscreenButton}>
                {fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
              </TouchableOpacity>

              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={isPlaying}
                skipBackwards={() => onSeek(currentTime - 15)}
                skipForwards={() => onSeek(currentTime + 15)}
              />

              <ProgressBar
                currentTime={currentTime}
                duration={duration > 0 ? duration : 0}
                onSlideCapture={onSeek}
              />
            </View>
          )}
        </TouchableOpacity>

        {isQuizButton && !isQuizSubmit && (
          <TouchableOpacity style={styles.quizButton} onPress={() => setIsQuizModal(true)}>
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
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.recommendItem} onPress={() => playVideo(item)}>
              <Image source={{ uri: item.thumbnail }} style={styles.recommendImage} />
              <Text style={styles.recommendText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Quiz Modal */}
      <QuizModal
        isVisible={isQuizModal}
        questions={quizQuestion}
        onClose={() => setIsQuizModal(false)}
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
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  video: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
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
  //recommended
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
  recommendText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    flex: 1,
  },
  //quiz
  quizbtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
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
    transform: [{ translateX: -50 }],
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
