import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  StyleProp,
  TextStyle,
} from "react-native";
import HeroSection from "../../components/sections/HeroSection";
import Input, {
  InputWithIcon,
  PhoneInput,
} from "../../components/Inputs/Inputs";
import ButtonFill from "../../components/Buttons/Buttons";
import CheckboxText from "../../components/Inputs/CheckboxText";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const Register = () => {
  // Khai báo
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [checkFullName, setCheckFullName] = useState<boolean>(false);
  const [checkPhoneNumber, setCheckPhoneNumber] = useState<boolean>(false);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);

  // Khai báo checked
  const [isChecked, setIsChecked] = useState(false);

  // Khai báo isFocuse
  const isFocus = useIsFocused();
  useEffect(() => {
    if (!isFocus) {
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setIsChecked(false);
    }
  });

  // Kiểm tra input
  useEffect(() => {
    if (fullName !== "") setCheckFullName(false);
    if (phoneNumber !== "") setCheckPhoneNumber(false);
    if (email !== "") setCheckEmail(false);
    if (password !== "") setCheckPassword(false);
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const errorStyle: StyleProp<TextStyle> = {
    borderColor: "#EB455F",
  };

  // Hàm register
  const handleRegister = () => {
    const field = [fullName, phoneNumber, email, password];
    if (fullName === "") setCheckFullName(true);
    if (phoneNumber === "") setCheckPhoneNumber(true);
    if (email === "") setCheckEmail(true);
    if (password === "") setCheckPassword(true);

    const isFieldNull = field.some((field) => field === "");
    !isFieldNull &&
      isChecked &&
      navigation.navigate("VerifyPage", { phoneNumber });
  };

  return (
    <View className="w-full h-full flex flex-col items-center justify-center px-6 gap-6">
      {/* HeroSection */}
      <HeroSection />

      {/* Form */}
      <View className="form flex flex-col gap-3 w-full">
        <Input
          value={fullName}
          onChangeText={setFullName}
          style={checkFullName && errorStyle}
          inputType="default"
          placeholder="Họ và tên"
        />
        <PhoneInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={checkPhoneNumber && errorStyle}
          inputType="numeric"
          placeholder="Số điện thoại"
        />
        <Input
          value={email}
          onChangeText={setEmail}
          style={checkEmail && errorStyle}
          inputType="email-address"
          placeholder="Email"
        />
        <InputWithIcon
          isPassword={true}
          value={password}
          onChangeText={setPassword}
          style={checkPassword && errorStyle}
          inputType="default"
          placeholder="Mật khẩu"
        />
      </View>

      <View className="button flex flex-col gap-3">
        <View className="checkBox w-full">
          <CheckboxText isChecked={isChecked} onCheckChange={setIsChecked}>
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
