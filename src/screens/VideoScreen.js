import React, {useState, useRef, useEffect} from 'react';
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
  ImageBackground,
} from 'react-native';
import Video from 'react-native-video';
import QuizModal from '../modal/QuizModal';
import Orientation from 'react-native-orientation-locker';
import PlayerControls from './video-player/playerControls';
import ProgressBar from './video-player/progressBar';
import FullscreenOpen from '../utilities/svg/FullscreenOpen';
import FullscreenClose from '../utilities/svg/FullscreenClose';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoBack from '../utilities/svg/VideoBack';
import videoData from '../utilities/constant/VideoData';
import quizQuestion from '../utilities/constant/QuizData';

const windowHeight = Dimensions.get('window').width * (9 / 16);
const windowWidth = Dimensions.get('window').width;

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;

export default function VideoScreen({navigation}) {
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControl, setShowControl] = useState(true);

  useEffect(() => {
    const handleOrientation = orientation => {
      setFullscreen(orientation.includes('LANDSCAPE'));
      StatusBar.setHidden(orientation.includes('LANDSCAPE'));
    };

    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  const playVideo = (video, isEnd) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    setIsQuizButton(false);
    setIsQuizSubmit(false);
    setSelectedAnswer(Array(quizQuestion.length).fill(null));
    setIsVideoEnded(false);
    if (isEnd) {
      setCurrentTime(0);
      videoRef.current.seek(0);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (!isQuizSubmit) {
      setIsQuizButton(true);
      setIsVideoEnded(true);
    }
  };

  const handlePlayPause = () => {
    if (isVideoEnded) {
      playVideo(currentVideo, true);
    } else {
      setIsPlaying(prev => !prev);
      setShowControl(true);
    }
  };

  const onLoadEnd = data => {
    setDuration(data.duration);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onSeek = seekTime => {
    videoRef.current.seek(seekTime);
  };

  const handleControls = () => {
    setShowControl(prev => !prev);
  };

  const handleFullscreen = () => {
    if (fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscapeLeft();
      setFullscreen(true);
    }
  };

  const submitQuiz = () => {
    const correctAnswer = quizQuestion.map(q => q.answer);
    const isCorrect = selectedAnswer.every(
      (answer, index) => answer === correctAnswer[index],
    );
    alert(
      isCorrect ? 'Quiz completed successfully!' : 'Some answers are incorrect',
    );
    setIsQuizSubmit(true);
    setIsQuizModal(false);
    setIsQuizButton(false);
  };

  const goBack = () => {
    if (fullscreen) {
      handleFullscreen();
    } else {
      navigation.goBack();
    }
  };

  const handleVideoError = () => {
    alert('Failed to load the video. Please try again later.');
    setIsPlaying(false);
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>{currentVideo.title}</Text>
        </View>
      </ImageBackground>

      <View
        style={fullscreen ? styles.fullscreenContainer : styles.videoContainer}>
        <TouchableOpacity onPress={handleControls}>
          <Video
            ref={videoRef}
            source={{uri: currentVideo.uri}}
            style={fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            paused={!isPlaying}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={handleVideoEnd}
            onError={handleVideoError}
          />

          {showControl && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                style={styles.fullscreenButton}>
                {fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
              </TouchableOpacity>

              <TouchableOpacity onPress={goBack} style={styles.videoBackButton}>
                <VideoBack />
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
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => setIsQuizModal(true)}>
            <Text style={styles.quizbtnText}>Take the Quiz</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.videoDetails}>
        {isVideoEnded && !isQuizSubmit && (
          <View style={styles.quizIncomplete}>
            <Text style={styles.incompleteTxt}>Quiz not Complete</Text>
          </View>
        )}
        <Text style={styles.videoTitle}>{currentVideo.title}</Text>
        <Text style={styles.videoDescription}>{currentVideo.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Videos</Text>
        {videoData.map(item => (
          <TouchableOpacity key={item.id} onPress={() => playVideo(item)}>
            <View style={styles.recommendItem}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.recommendImage}
                  source={{uri: item.thumbnailUrl}}
                />
                <TouchableOpacity
                  style={styles.playCircleContainer}
                  onPress={() => playVideo(item)}>
                  <View style={styles.playCircle}>
                    <Ionicons name="play" size={25} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.recommendDetails}>
                <Text style={styles.recommendText}>{item.title}</Text>
                <Text style={styles.recommendDescription}>
                  {item.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

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
  // Header Styles
  imgback: {
    padding: 15,
    height: 70,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  // video
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
  videoBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10, // Ensure the button is above other elements
    padding: 10,
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
    bottom: '23%',
    left: '80%',
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

  //Recommended
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
