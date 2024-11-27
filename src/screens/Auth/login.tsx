import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import HeroSection from "../../components/sections/HeroSection";
import ButtonFill from "../../components/Buttons/Buttons";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { jwtDecode } from "jwt-decode"; // Nhập thư viện jwt-decode
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from "../../components/Inputs/Inputs";

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute(); // Lấy thông tin route để lấy giá trị
  const [email, setEmail] = useState<string>("");

  const handleSSOLogin = () => {
    navigation.navigate('SSO');
  };

  return (
    <View className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      <HeroSection />
      <View className="form flex flex-col gap-3 w-full">
        {/* <Input
          value={email}
          onChangeText={setEmail}
          // style={checkFullName && errorStyle}
          inputType="default"
          placeholder="Email"
        />
         <Input
          value={email}
          onChangeText={setEmail}
          // style={checkFullName && errorStyle}
          inputType="default"
          placeholder="Mật khẩu"
        /> */}
        <View className="buttons flex flex-row w-full gap-2">

          <View className="flex-1 loginBtn h-12 ">
            <ButtonFill onPress={handleSSOLogin}>
              <Text className="text-white font-bold text-lg">Đăng nhập với Wowo</Text>
            </ButtonFill>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
