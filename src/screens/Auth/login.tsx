import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeroSection from "../../components/sections/HeroSection";
import ButtonFill from "../../components/Buttons/Buttons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
// import {SSO} from '@htilssu/wowo'

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const sso = new SSO('TPE');

  // const handleSSOLogin = () => {
  //   // Gọi phương thức redirectToLogin với URL callback
  //   sso.redirectToLogin('http://localhost:3001/callback');

  // };

  return (
    <View className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      <HeroSection />
      <View className="form flex flex-col gap-3 w-full">
        <View className="buttons flex flex-row w-full gap-2">
          <View className="flex-1 loginBtn h-12 ">
            {/* <ButtonFill onPress={handleSSOLogin}>
              <Text className="text-white font-bold text-lg">Đăng nhập với SSO</Text>
            </ButtonFill> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
