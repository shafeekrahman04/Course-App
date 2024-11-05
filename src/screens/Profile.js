
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Switch, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../security/AuthContext';

const ProfileScreen = ({navigation}) => {
const {user} = useAuth();
const authContext = useAuth();

function logoutHandler() {
      authContext.logout();
      navigation.reset({
        index:0,
        routes:[{name:'Login'}],
      });
    }

  const profileOptions = [
    { id: '1', title: 'First Name', value: user?.User_FirstNameEn, icon: 'person' },
    { id: '2', title: 'Last Name', value: user?.User_LastNameAr, icon: 'person' },
    { id: '3', title: 'User ID', value: user?.USER_Id, icon: 'id-card' },
    { id: '4', title: 'Employee ID', value: user?.Emp_Id, icon: 'business' },
    // { id: '5', title: 'Is Logged In', value: user?.USER_IsLoggedIn ? 'Yes' : 'No', icon: 'log-in' },
    // { id: '6', title: 'Login Group ID', value: user?.LoginGroupID, icon: 'people' },
    { id: '7', title: 'Active Status', value: user?.IsActive ? 'Yes' : 'No', icon: 'checkmark-circle' },
    // { id: '8', title: 'Branch ID', value: user?.USER_BranchId, icon: 'location' },
    // { id: '9', title: 'Language ID', value: user?.USER_LanguageId, icon: 'language' },
    { id: '10', title: 'Last Updated Date', value: user?.User_LastUpdatedDate, icon: 'time' },
    { id: '11', title: 'School Name', value: user?.SchoolName, icon: 'school' },
    { id: '12', title: 'Logout', value: '', icon: 'log-out', isLogout: true },
  ];



  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={item.isLogout ? logoutHandler : null}>
      <Icon name={item.icon} size={24} color="#999" style={styles.optionIcon} />
      <Text style={styles.optionText}>{item.title} </Text> 
      {/* <View style={styles.rightContainer}> */}
         <Text style={styles.optionValue}>{item.value}</Text>
         
      {/* </View> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/logo/bg1.jpg')} 
        style={styles.profileHeader}
        imageStyle={styles.backgroundImage} 
      >
        <View style={styles.profileInfoContainer}>
        <Text style={styles.profiletxt}>Profile</Text>
          <Image
            source={require('../assets/logo/avator.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{user?user.User_FirstNameEn:'Loading'}</Text>
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
    paddingLeft: 20,
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
