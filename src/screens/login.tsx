import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import HeroSection from "../components/sections/HeroSection";
import Input, { InputWithIcon } from "../components/Inputs/Inputs";
import ButtonFill, { ButtonLine } from "../components/Buttons/Buttons";
import TextAndFunction from "../components/Items/TextAndFunction";
import IconAndText from "../components/Items/IconAndText";

// Import Icons
import PasswordIC from "../svg/PasswordIC";
import FingerPrintIC from "../svg/FingerPrintIC";
import OTPIC from "../svg/OtpIC";

const Login = () => {
  const [withPassword, setWithPassword] = useState(false);
  const handleLogin = () => {
    withPassword ? handleCheckPassword() : handleOTP();
  };

  const handleFingerPrint = () => {
    Alert.alert("Finger");
  };

  // Hàm kích hoạt ĐN Password
  const handlePasswordLogin = () => {
    setWithPassword(!withPassword);
  };

  const handleOTP = () => {
    Alert.alert("OTP");
  };
  const handleCheckPassword = () => {
    Alert.alert("checking pass");
  };
  return (
    <View className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      {/* HeroSection */}
      <HeroSection />

      {/* Form */}
      <View className="form flex flex-col gap-3 w-full">
        <Input inputType="numeric" placeholder="Số điện thoại" />
        {withPassword ? (
          <InputWithIcon inputType="visible-password" placeholder="Mật khẩu" />
        ) : (
          ""
        )}
        <View className="buttons flex flex-row w-full gap-2">
          <View className="flex-1 loginBtn h-12 ">
            <ButtonFill onPress={() => handleLogin()}>
              <Text className="text-white font-bold text-lg">Đăng nhập</Text>
            </ButtonFill>
          </View>
          <View className="fingerPrint">
            <ButtonLine onPress={() => handleFingerPrint()}>
              <FingerPrintIC />
            </ButtonLine>
          </View>
        </View>
      </View>

      {/* Tạo account  */}
      <View className="dontHaveAccount">
        <TextAndFunction text="Chưa có tài khoản?" clickableText="Đăng ký" />
      </View>

      {/* Phương thức đăng nhập khác */}
      <View className="anotherWays">
        {withPassword ? (
          <IconAndText
            onPress={() => handlePasswordLogin()}
            icon={<OTPIC />}
            text="Đăng nhập bằng OTP"
          />
        ) : (
          <IconAndText
            onPress={() => handlePasswordLogin()}
            icon={<PasswordIC />}
            text="Đăng nhập bằng mật khẩu"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
