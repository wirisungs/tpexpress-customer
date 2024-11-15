import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { WebView } from 'react-native-webview';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const SSO = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [url, setUrl] = useState("http://tpexpress.ddns.net:4000/");

    const onMessage = (event) => {
        // Nhận dữ liệu từ web
        const valueFromWeb = event.nativeEvent.data;
        console.log("Dữ liệu nhận từ web:", valueFromWeb);
        // Điều hướng đến trang chính và truyền dữ liệu
        navigation.navigate("Verify", { value: valueFromWeb });
    };

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}
                onMessage={onMessage} // Để nhận dữ liệu từ trang web
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20,
    },
});

export default SSO;
