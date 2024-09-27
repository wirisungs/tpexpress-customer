import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

interface TAFProps {
  text: string;
  clickableText: string;
}

const TextAndFunction: React.FC<TAFProps> = ({ text, clickableText }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleNavigation = () => {
    navigation.navigate("RegisterPage");
  };
  return (
    <View className="flex flex-row gap-2">
      <Text className="text-grayText-767676">{text}</Text>
      <TouchableOpacity onPress={() => handleNavigation()}>
        <Text className="text-primaryText-EB455F underline">
          {clickableText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TextAndFunction;
