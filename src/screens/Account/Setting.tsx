import React from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { CommonActions, NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { TransHeader } from "../../components/Layouts/Headers";
import ButtonFill from "../../components/Buttons/Buttons";
import { useTheme } from "../../components/Darkmode/ThemeContext";

const Setting = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const handleOnClick = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "SSO" }],
            })
        );
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <TransHeader haveBackIcon={true} title="Cài đặt" />
            <View style={styles.all}>
                <View style={styles.btndark}>
                    <Text style={[styles.txtbutton, isDarkMode && styles.darkText]}>
                        Chế độ ban đêm
                    </Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkMode ? "#EB455F" : "#f4f3f4"}
                    />
                </View>
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
        backgroundColor: "#ffffff",
    },
    darkContainer: {
        backgroundColor: "#000000",
    },
    all: {
        padding: 24,
        flex: 1,
    },
    btndark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtbutton: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
    },
    darkText: {
        color: "#ffffff",
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
