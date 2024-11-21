import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import * as Notifications from 'expo-notifications';
import ButtonFill from "../../components/Buttons/Buttons";


const DistanceCalculator = () => {

    const handleNextPress = async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Your OTP',
            body: 'Hello'
          },
          trigger: { seconds: 1 },
        });
      };

    return (
        <View style={styles.container}>
            <ButtonFill onPress={handleNextPress}>
                <Text className="text-white text-xl font-bold">Hoàn tất</Text>
            </ButtonFill>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        width: "80%",
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    suggestionItem: {
        padding: 10,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        width: "80%",
    },
});

export default DistanceCalculator;
