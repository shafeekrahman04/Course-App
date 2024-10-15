import { View, Text, Animated, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMessageColorByCode } from '../utilities/constant/CommonMethod';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AlertMessage({ message, messageType }) {
    const [fadeAnim] = useState(new Animated.Value(0));

    const alertType = messageType || {};
    const iconName = alertType.icon || 'info-circle';

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
            <View style={styles.messageContent}>
                <Icon name={iconName} size={20} color="#fff" style={styles.iconStyle} />
                <Text style={styles.alertText}>{message.message}</Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        top: '10%',
        right: 20,
        padding: 10,
        borderRadius: 5,
    },
    messageContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        marginRight: 10,
    },
    alertText: {
        color: '#fff',
        fontSize: 16,
    },
});
