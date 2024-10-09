import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, ToastAndroid, View } from "react-native";
import HeroSection from "../../components/sections/HeroSection";
import Input, {
  InputWithIcon,
  PhoneInput,
} from "../../components/Inputs/Inputs";
import ButtonFill from "../../components/Buttons/Buttons";
import TextAndFunction from "../../components/Items/TextAndFunction";
import IconAndText from "../../components/Items/IconAndText";

// Import Icons
import PasswordIC from "../../svg/MTri/PasswordIC";
import OTPIC from "../../svg/MTri/OtpIC";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import FingerscanSetup from "./fingerscanSetup";

const Login = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setPhoneNumber("");
      setWarning("");
      setWithPassword(false);
    }
  }, [isFocused]);
  // Khai báo navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [withPassword, setWithPassword] = useState(false);
  const handleLogin = () => {
    withPassword ? handleCheckPassword() : handleOTP();
  };

  // Hàm kích hoạt ĐN Password
  const handlePasswordLogin = () => {
    setWithPassword(!withPassword);
  };

  const handleOTP = () => {
    if (!phoneNumber) {
      setWarning("Hãy nhập số điện thoại");
    } else if (phoneNumber.length == 10) {
      navigation.navigate("VerifyPage", { phoneNumber });
    } else {
      setWarning("Số điện thoại phải đủ 10 số");
    }
  };
  const handleCheckPassword = async () => {
    const phoneNumberTostring = String(phoneNumber);
    try {
      const response = await fetch("http://192.168.1.10:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phonenumber: phoneNumberTostring, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        data.erCode === "wrp" && setWarning("Sai mật khẩu!"); // wrp: wrong password
        data.erCode === "pne" && setWarning("Số điện thoại không tồn tại!"); // pne: phone not existed
      }
      if (response.ok) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        // Chuyển trang khi thành công

        navigation.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        });
      }
    } catch (error) {
      console.error("Error collecting data:", error);
    }
  };
  return (
    <View className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      {/* HeroSection */}
      <HeroSection />

      {/* Form */}
      <View className="form flex flex-col gap-3 w-full">
        <View className="flex flex-col gap-1">
          <PhoneInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            inputType="numeric"
            placeholder="Số điện thoại"
          />
          {/* Hiển thị cảnh báo */}
        </View>

        {/* Phương thức đăng nhập với mật khẩu */}
        {withPassword ? (
          <InputWithIcon
            isPassword={true}
            inputType="default"
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
          />
        ) : (
          ""
        )}
        {warning ? (
          <View>
            <Text className="text-red-500">* {warning}</Text>
          </View>
        ) : (
          ""
        )}
        <View className="buttons flex flex-row w-full gap-2">
          <View className="flex-1 loginBtn h-12 ">
            <ButtonFill onPress={() => handleLogin()}>
              <Text className="text-white font-bold text-lg">Đăng nhập</Text>
            </ButtonFill>
          </View>
          <FingerscanSetup />
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
