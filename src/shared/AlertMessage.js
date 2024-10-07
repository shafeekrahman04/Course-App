import { View, Text, Animated, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import { getMessageColorByCode } from '../utilities/constant/CommonMethod';

export default function AlertMessage({message, messageType}) {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [fadeAnim, message]);

    return (
        <Animated.View
            style={[
                styles.alertContainer,
                {
                    backgroundColor: getMessageColorByCode(messageType),
                    opacity: fadeAnim,
                }
            ]}
        >
            <Text style={styles.alertText}>{message.message}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        top: '10%',
        right: 20,
        
        padding: 10,
        borderRadius: 5,
        // zIndex: 999,
    },
    alertText: {
        color: '#fff',
        fontSize: 16,
    },
})