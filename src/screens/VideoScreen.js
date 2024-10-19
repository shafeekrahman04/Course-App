import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, TextInput, ScrollView, Modal } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const videoData = [
  {
    id: '1',
    title: 'Voice on Security: USB Drop',
    description: 'This video discusses the risks of using unknown USB devices and how they can pose a security threat.',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
  },
  {
    id: '2',
    title: 'The Threat of Free WiFi',
    description: 'Learn about the dangers of using unsecured public WiFi networks and how to protect your data.',
    uri: 'https://www.w3schools.com/html/movie.mp4',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
  },
  {
    id: '3',
    title: 'Cybersecurity Essentials',
    description: 'An introduction to the basics of cybersecurity and why it’s important for everyone.',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-3.png?alt=media&token=42b8ef40-cdaa-45e2-b8e1-df0454163369',
  },
  // Add more video data as needed
];

export default function VideoScreen() {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(videoData[0]); // Default video
  const [isPlaying, setIsPlaying] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isQuizButton, setIsQuizButton] = useState(false);
  const [isQuizModal, setIsQuizModal] = useState(false);
  const [isQuizSubmit, setIsQuizSubmit] = useState(false);

  const playVideo = (video) => {
    setCurrentVideo(video); // Update the video source
    setIsPlaying(true); // Start playing the video
    setIsQuizButton(false);
    setIsQuizSubmit(false);
  };

  const submitComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  const renderRecommendedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendItem}
      onPress={() => playVideo(item)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.recommendImage} />
      <Text style={styles.recommendText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item}</Text>
    </View>
  );

  // fn handle vdo completion
  const handleVideoEnd = () => {
    if (!isQuizSubmit) {
      setIsQuizButton(true);
    }
  }

  const openQuizModal = () => {
    setIsQuizModal(true);
  }

  const closeQuizModal = () => {
    setIsQuizModal(false);
  }


  const submitQuiz = () => {
    setIsQuizSubmit(true);
    setIsQuizModal(false);
    setIsQuizButton(false);
  }

  return (
    <ScrollView style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: currentVideo.uri }}
          style={styles.video}
          resizeMode="contain"
          controls={true}
          paused={!isPlaying}
          onEnd={handleVideoEnd}
        />
        {!isPlaying && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setIsPlaying(true)}
          >
            <Ionicons name="play-circle-outline" size={64} color="#fff" />
          </TouchableOpacity>
        )}

        {/**Quiz button */}
        {isQuizButton && !isQuizSubmit && (
          <TouchableOpacity style={styles.quizButton} onPress={openQuizModal}>
            <Text style={styles.quizbtnText}>Take the Quiz</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Title and Description */}
      <View style={styles.videoDetails}>
        <Text style={styles.videoTitle}>{currentVideo.title}</Text>
        <Text style={styles.videoDescription}>{currentVideo.description}</Text>
      </View>

      {/* Recommended Videos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Videos</Text>
        <FlatList
          data={videoData}
          renderItem={renderRecommendedItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/**quiz modal */}

      <Modal
        animationType='slide'
        transparent={true}
        visible={isQuizModal}
        onRequestClose={closeQuizModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modaltxt}>This is the quiz!</Text>
          <TouchableOpacity style={styles.submitQuizbtn} onPress={submitQuiz}>
            <Text style={styles.submitQuizTxt}>Submit Quiz</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Comments Section */}
      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>Comments</Text>
        <TextInput
          style={styles.commentInput}
          value={comment}
          onChangeText={(text) => setComment(text)}
          placeholder="Add a comment..."
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitComment}>
          <Text style={styles.submitButtonText}>Post Comment</Text>
        </TouchableOpacity>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
    fontSize: 18,

  },
  modalView: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 5
  },
  modaltxt: {
    fontSize: 18,
    marginBottom: 20
  },
  submitQuizbtn: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitQuizTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  recommendText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    flex: 1,
  },
  quizButton: {
    position: 'absolute',
    bottom: '45%',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  commentSection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
});
