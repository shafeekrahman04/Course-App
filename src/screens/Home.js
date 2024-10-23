import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../security/AuthContext';


const categories = [
  { name: 'Art', image: require('../assets/logo/arts.png') },
  { name: 'Coding', image: require('../assets/logo/code.png') },
  { name: 'Marketing', image: require('../assets/logo/marketing.png') },
  { name: 'Business', image: require('../assets/logo/business.png') },
  { name: 'Accounting', image: require('../assets/logo/marketing.png') },
];


const popularCourses = [
  {
    id: '1',
    title: 'Design Thinking Fundamentals',
    instructor: 'Robert Green',
    price: '$180.00',
    image: require('../assets/logo/course.jpg'),
  },
  {
    id: '2',
    title: 'Advanced React Native',
    instructor: 'Sarah Smith',
    price: '$200.00',
    image: require('../assets/logo/course.jpg'), 
  },
  {
    id: '3',
    title: 'Introduction to Marketing',
    instructor: 'Michael Johnson',
    price: '$150.00',
    image: require('../assets/logo/course.jpg'), 
  },
];

export default function Home({ navigation }) {
  const authContext = useAuth();

  const openVideo = (videoUri) => {
    navigation.navigate('VideoScreen', { videoUri });
  };

  function logoutHandler() {
    authContext.logout();
    navigation.navigate("Login");
  }

  return (

    <ScrollView style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Header Section */}
      <ImageBackground
        style={styles.imgback}
        source={require('../assets/logo/bg1.jpg')}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Hi, ALEX</Text>
          <Text style={styles.subText}>Let's start learning!</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications-outline" size={25} color="#000"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="log-out-outline" size={25} color="#000" onPress={logoutHandler}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* Search Bar */}

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#777" style={styles.searchicon} />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      {/* Categories Section */}
      <View>
        <View style={styles.seeallbtn}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              style={styles.categoryItem}
              key={category.name}>
              <View style={styles.categoryIconWrapper}>
                <Image source={category.image} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Continue Learning */}
      <View style={styles.seeallbtn}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <View style={styles.orgRecommendations}>
          <View style={styles.orgRecommendItem}>
            <Image
              style={styles.recommendImage}
              source={require('../assets/logo/course.jpg')}
            />
            <Text style={styles.orgRecommendText}>Encora Unity Basic Course</Text>
            <TouchableOpacity style={styles.progressContainer} >
              <View style={styles.progressCircle}>
                <View style={styles.innerCircle}>
                  <Icon name="play" size={20} color="grey" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.orgRecommendItems}>
            <Image
              style={styles.recommendImage}
              source={require('../assets/logo/course1.jpg')}
            />
            <Text style={styles.orgRecommendText}>Kubernetes Assessment</Text>
            <TouchableOpacity style={styles.progressContainer} >
              <View style={styles.progressCircle}>
                <View style={styles.innerCircle}>
                  <Icon name="play" size={20} color="grey" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Popular Courses */}
      <View style={styles.seeallbtn}>
        <Text style={styles.sectionTitle}>Popular Courses</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={popularCourses}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => openVideo('https://firebasestorage.googleapis.com/v0/b/fir-3b89d.appspot.com/o/video%2FWhatsApp%20Video%202024-09-13%20at%205.25.47%20PM.mp4?alt=media&token=712f3f73-9b61-4c5a-97e9-7081dc161e33')} style={styles.courseCard}>
            <Image source={item.image} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseInstructor}>{item.instructor}</Text>
              <Text style={styles.coursePrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.courseList}
      />

      {/* Recommended for you*/}
      <View style={styles.seeallbtn}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.recommendations}>
            {/* First Card */}
            <TouchableOpacity onPress={() => openVideo('your_video_url_here')}>
              <View style={styles.recommendItem}>

          
                <Text style={styles.recommendText}>Graphic Design Training</Text>
                <View style={styles.recommandimg}>
                  <Text style={styles.recommendSubText}>3 Courses</Text>
             
                  <Image
                    style={styles.designicon}
                    source={require('../assets/logo/layers.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/* Add other recommendation cards*/}
            <View style={styles.recommendItem}>


                <Text style={styles.recommendText}>Mobile Application</Text>
                <View style={styles.recommandimg}>
                <Text style={styles.recommendSubText}>17 Courses</Text>
                <Image
                    style={styles.designicon}
                    source={require('../assets/logo/layers.png')}
                  />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  imgback: {
    padding: 16, 
    flex: 1,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 120
  },
  container: {
    // flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    margin: 0,
    padding: 0,

  },
  seeallbtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  seeAllText: {
    color: '#ffc200'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    color: '#888',
  },
  notificationIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fde07c',
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
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  searchicon: {
    marginLeft: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  courseCard: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 16, 
    width: 250, 
    height: 250,
  },
  courseImage: {
    width: '100%',
    height: 145,
    borderRadius: 10,
  },
  courseInfo: {
    padding: 10, 
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseInstructor: {
    color: '#888',
    marginTop: 4,
  },
  coursePrice: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 8,
  },
  orgRecommendations: {
    flexDirection: 'column', 
    justifyContent: 'center',
        alignItems: 'center', 
    margin: 10,
  },
  orgRecommendItem: {
    width: '100%',
    alignItems: 'center', 
    marginBottom: 10, 
    flexDirection: 'row',
    backgroundColor: '#FEF9D9',
    borderRadius: 20,

  },
  orgRecommendItems: {
    width: '100%',
    alignItems: 'center', 
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#E5D9F2',
    borderRadius: 20,

  },
  orgRecommendText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10
  },
  recommendImage: {
    width: '30%',
    height: 100,
    borderRadius: 10,
  },
  courseList: {
    paddingLeft: 10,
    paddingBottom: 20,
  },
  progressContainer: {
    marginTop: 10,
    padding: 10,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffc100',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4
  },
  sectionTitles: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendations: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  recommendItem: {
    flexDirection: 'column',
    backgroundColor: '#FDCEDF', 
    borderRadius: 15,
    padding: 20,
    marginRight: 16,
  
    width: 220,
    
    textAlign:'left'
  },
  recommandimg: {
    flexDirection: 'row',
    flex:1,
    justifyContent:'space-between'
  },
  designicon: {
    width: 40, 
    height: 40,
  },
  recommendText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',

  },
  recommendSubText: {
    fontSize: 12,
    color: '#777', 
paddingTop:'5%'
  },
});
