import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { TransHeader } from "../../components/Layouts/Headers";
import ButtonFill from "../../components/Buttons/Buttons";

const Setting = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleOnClick = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "SSO" }],
          })
        );
    };

    return (
        <View style={styles.container}>
            <TransHeader haveBackIcon={true} title="Cài đặt" />
            <View style={styles.all}>
                <Text style={styles.txtbutton}>Chế độ ban đêm</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonFill onPress={handleOnClick}>
                    <Text style={styles.buttonText}>Đăng xuất</Text>
                </ButtonFill>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    all: {
        padding: 24,
        flex: 1,
    },
    txtbutton: {
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonContainer: {
        padding: 24,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Setting;
