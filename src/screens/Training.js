import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Header from '../shared/Header';
import * as Progress from 'react-native-progress'; // Import progress bar library
import {Colors} from '../utilities/styles/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';

export default function Training() {
  const { width: W } = Dimensions.get('window')

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>Training</Text>
      </View>

      {/* Progress Header with Progress Bar */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Training Progress</Text>
        <Text style={styles.percentageText}>60%</Text>
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            progress={0.6}
            width={null}
            color={Colors.primaryColor}
            unfilledColor={'rgba(255, 255, 255, 0.3)'}
            borderWidth={0}
            style={styles.progressBar}
          />
        </View>
      </View>

      {/* Recommended for You */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.recommendations}>
            <TouchableOpacity
              onPress={() =>
                openVideo(
                  'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/video%2FWhatsApp%20Video%202024-09-13%20at%205.25.47%20PM.mp4?alt=media&token=712f3f73-9b61-4c5a-97e9-7081dc161e33',
                )
              }>
              <View style={styles.recommendItem}>
                <Image
                  style={styles.recommendImage}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-1.webp?alt=media&token=86a19147-9d69-45da-98c0-677546db5a7e',
                  }}
                />
                <Text style={styles.recommendText}>
                  Voice on Security: USB Drop
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.recommendItem}>
              <Image
                style={styles.recommendImage}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
                }}
              />
              <Text style={styles.recommendText}>The Threat of Free WiFi</Text>
            </View>
            <View style={styles.recommendItem}>
              <Image
                style={styles.recommendImage}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-3.png?alt=media&token=42b8ef40-cdaa-45e2-b8e1-df0454163369',
                }}
              />
              <Text style={styles.recommendText}>Cybersecurity Essentials</Text>
            </View>
            <View style={styles.recommendItem}>
              <Image
                style={styles.recommendImage}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-4.webp?alt=media&token=b73d88fa-55e4-47dd-9190-04d6962d76ff',
                }}
              />
              <Text style={styles.recommendText}>Data Privacy Basics</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Recommended by Your Organization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Recommended by Your Organization
        </Text>
        <View style={styles.orgRecommendations}>
          <View style={styles.orgRecommendItem}>
            <Image
              style={styles.recommendImage}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-2.jpg?alt=media&token=1af14000-8393-4dba-b878-e59467d98f47',
              }}
            />
            <Text style={styles.orgRecommendText}>
              Encora Unity Basic Course
            </Text>
          </View>
          <View style={styles.orgRecommendItem}>
            <Image
              style={styles.recommendImage}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/thumbnail%2Fthumb-4.webp?alt=media&token=b73d88fa-55e4-47dd-9190-04d6962d76ff',
              }}
            />
            <Text style={styles.orgRecommendText}>Kubernetes Assessment</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#281e6e',
    padding: 15,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  recommendations: {
    flexDirection: 'row',
  },
  recommendItem: {
    width: 200,
    marginRight: 10,
  },
  recommendImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  recommendText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  orgRecommendations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orgRecommendItem: {
    width: '48%',
  },
  orgRecommendText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressHeader: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  progressText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    marginRight: 10,
    height: 10,
  },
  percentageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
