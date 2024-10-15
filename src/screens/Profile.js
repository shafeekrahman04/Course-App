
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Switch, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const profileOptions = [
    { id: '1', title: 'Edit Profile', icon: 'person' },
    { id: '2', title: 'Notification', icon: 'notifications' },
    // { id: '3', title: 'Payment Methods', icon: 'card' },
    // { id: '4', title: 'Security', icon: 'shield-checkmark' },
    { id: '5', title: 'Language', value: 'English (US)', icon: 'language' },
    { id: '6', title: 'Dark Mode', isToggle: true, icon: 'moon' },
    { id: '7', title: 'Privacy Policy', icon: 'document-text' },
    { id: '8', title: 'Help Center', icon: 'help-circle' },
    { id: '9', title: 'Invite Friends', icon: 'people' },
    { id: '10', title: 'Logout', icon: 'log-out', isLogout: true },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer}>
      <Icon name={item.icon} size={24} color="#999" style={styles.optionIcon} />
      <Text style={styles.optionText}>{item.title}</Text>
      <View style={styles.rightContainer}>
        {item.value && <Text style={styles.optionValue}>{item.value}</Text>}
        {item.isToggle ? (
          <Switch />
        ) : (
          !item.isLogout && <Icon name="chevron-forward" size={20} color="#999" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/logo/bg1.jpg')} 
        style={styles.profileHeader}
        imageStyle={styles.backgroundImage} 
      >
        <View style={styles.profileInfoContainer}>
        <Text style={styles.profiletxt}>Profile</Text>
          <Image
            source={require('../../assets/logo/avator.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Andrew Ainsley</Text>
          {/* <Text style={styles.profileEmail}>andrew_ainsley@yourdomain.com</Text> */}
        </View>
      </ImageBackground>
      <FlatList
        data={profileOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {/* <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profiletxt:{
    fontSize: 18,
    fontWeight: 'bold',
   paddingBottom:10,

  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150, 
    
  },
  backgroundImage: {
    // opacity: 0.7, 
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    
  },
  profileInfoContainer: {
    // zIndex: 1, 
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: 'gray',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    flex: 1, 
    marginLeft: 15, 
    color:'#000',
    fontWeight:'medium'
  },
  optionIcon: {
    marginRight: 15,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 14,
    color: 'gray',
    marginRight: 10,
  },
  logoutButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ProfileScreen;
