import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors} from '../utilities/styles/GlobalStyles';

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.header_content}>
        <View style={styles.header_items}>
          <FontAwesome6
            name={'book'}
            size={20}
            color={Colors.primaryColor}
            style={styles.icon_pading}
          />
          <Text style={styles.text_style}>Asta Systech</Text>
        </View>
        <View style={styles.header_items}>
          <TouchableOpacity>
            <FontAwesome6
              name={'bell'}
              size={20}
              color={Colors.grey}
              style={styles.icon_pading}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome6
              name={'right-from-bracket'}
              size={20}
              color={Colors.grey}
              style={styles.icon_pading}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    height: 55,
  },
  header_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    paddingLeft: 15,
  },
  header_items: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_pading: {
    paddingRight: 15,
  },
  padding: {
    paddingRight: 5,
  },
  text_style: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: '600',
  },
});
