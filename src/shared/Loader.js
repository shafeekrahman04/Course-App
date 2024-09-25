import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../utilities/styles/GlobalStyles'

export default function Loader() {
    return (
        <View style={styles.loader_styles}>
            <ActivityIndicator size="large" color={Colors.primaryColor}/>
        </View>
    )
}


const styles = StyleSheet.create({
    loader_styles: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000020'
      }
})