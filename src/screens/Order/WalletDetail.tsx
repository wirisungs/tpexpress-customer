import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from 'react-native-webview';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const WalletDetal = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [url, setUrl] = useState("https://wowo.htilssu.id.vn/order/476");

    useEffect(() => {
        // Set a timeout to automatically navigate after 10 seconds
        const timer = setTimeout(() => {
            navigation.navigate("SuccessStep");
        }, 10000); // 10 seconds

        // Clear the timeout if the component unmounts to avoid memory leaks
        return () => clearTimeout(timer);
    }, [navigation]);

    const onMessage = (event) => {
        const valueFromWeb = event.nativeEvent.data;
        console.log("Dữ liệu nhận từ web:", valueFromWeb);
        navigation.navigate("SuccessStep");
    };

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}
                onMessage={onMessage} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20,
    },
});

export default WalletDetal;
