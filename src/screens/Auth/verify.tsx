import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import BasicHeader, { TransHeader } from "../../components/Layouts/Headers";
import SendOTPIC from "../../svg/MTri/SendOTPIC";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { OTPInput } from "../../components/Inputs/Inputs";
import ButtonFill from "../../components/Buttons/Buttons";

const Verify = () => {
  const Route = useRoute<RouteProp<RootStackParamList, "VerifyPage">>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { phoneNumber } = Route.params;
  const [timeLeft, setTimeLeft] = useState(60);

  const startTimer = (initialTime: number) => {
    setTimeLeft(initialTime);
  };

  // Đếm ngược gửi OTP
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOTPComplete = (otp: string) => {
    if (otp.length == 6) {
      navigation.navigate("HomePage");
    }
  };
  return (
    <View className="w-full">
      <TransHeader haveBackIcon={true} />
      <View className="body flex flex-col gap-6 items-center justify-center">
        <SendOTPIC />
        <View className="title flex flex-col gap-2 items-center">
          <Text className="text-basicBlack text-[28px] font-bold">
            Nhập mã xác nhận
          </Text>
          <View className="subtitle flex flex-col items-center">
            <Text className="text-grayText-767676 font-medium">
              Hãy nhập mã OTP được gửi cho {phoneNumber}
            </Text>
            <Text className="text-grayText-767676 font-medium">
              Gửi lại OTP sau (
              {timeLeft !== 0 ? (
                <Text className="text-grayText-767676 font-medium">
                  {" "}
                  {timeLeft}{" "}
                </Text>
              ) : (
                <Text
                  onPress={() => startTimer(60)}
                  className="text-xs text-primary underline font-medium"
                >
                  {" "}
                  Gửi lại{" "}
                </Text>
              )}
              )
            </Text>
          </View>
        </View>
        <View className="inputBox w-full px-6 flex items-center flex-col gap-3">
          <OTPInput length={6} onComplete={handleOTPComplete} />
          <ButtonFill onPress={() => navigation.navigate("HomePage")}>
            <Text className="text-white font-bold text-xl">Xác thực</Text>
          </ButtonFill>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Verify;
