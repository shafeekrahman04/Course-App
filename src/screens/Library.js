import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../shared/Header';

export default function Library({ navigation }) {

  const openVideo = (videoUri) => {
    navigation.navigate('VideoScreen', { videoUri });
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header/>
      <View style={styles.header}>
        <Text style={styles.title}>Library</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput placeholder="Search..." style={styles.searchInput} />
        </View>
      </View>

      {/* Recommended for You */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.recommendations}>
            <TouchableOpacity
              onPress={() =>
                openVideo('https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/video%2FWhatsApp%20Video%202024-09-13%20at%205.25.47%20PM.mp4?alt=media&token=712f3f73-9b61-4c5a-97e9-7081dc161e33')
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: '#000',
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
});
