import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import HeroSection from "../../components/sections/HeroSection";
import Input from "../../components/Inputs/Inputs";
import ButtonFill from "../../components/Buttons/Buttons";
import CheckboxText from "../../components/Inputs/CheckboxText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleRegister = () => {
    const countPhoneNumber: number = phoneNumber.length;
    if (countPhoneNumber === 10) {
      navigation.navigate("VerifyPage", { phoneNumber });
    } else {
      Alert.alert("Số điện thoại phải đủ 10 số");
    }
  };

  return (
    <View className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      {/* HeroSection */}
      <HeroSection />

      {/* Form */}
      <View className="form flex flex-col gap-3 w-full">
        <Input inputType="default" placeholder="Họ và tên" />
        <Input
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          inputType="numeric"
          placeholder="Số điện thoại"
        />
        <Input inputType="email-address" placeholder="Email" />
        <Input inputType="visible-password" placeholder="Mật khẩu" />
      </View>

      <View className="button flex flex-col gap-3">
        <View className="checkBox w-full">
          <CheckboxText>
            <Text className="text-wrap text-sm flex flex-shrink-1 ">
              Đồng ý với{" "}
              <Text
                onPress={() => Alert.alert("Policy")}
                className="text-primary underline"
              >
                điều khoản và điều kiện
              </Text>{" "}
              của chúng tôi
            </Text>
          </CheckboxText>
        </View>

        <View className="buttons flex flex-row w-full gap-2">
          <View className="flex-1 loginBtn h-12 ">
            <ButtonFill onPress={() => handleRegister()}>
              <Text className="text-white font-bold text-lg">Đăng ký</Text>
            </ButtonFill>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Register;
