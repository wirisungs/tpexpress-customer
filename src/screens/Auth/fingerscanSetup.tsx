import React, { useState } from "react";
import { Alert, Button, StyleSheet, ToastAndroid, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Text } from "react-native";
import { ButtonLine } from "../../components/Buttons/Buttons";
import FingerIC from "../../svg/MTri/FingerPrintIC";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const FingerscanSetup = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Xác thực bằng vân tay",
      });
      if (result.success) {
        navigation.navigate("HomePage");
      } else {
        ToastAndroid.show("Đăng nhập thất bại", ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(
        "Thiết bị không hỗ trợ hoặc chưa đăng ký sinh trắc học.",
        ToastAndroid.SHORT
      );
    }
  };
  return (
    <View className="fingerPrint">
      <ButtonLine onPress={authenticate}>
        <FingerIC />
      </ButtonLine>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FingerscanSetup;
