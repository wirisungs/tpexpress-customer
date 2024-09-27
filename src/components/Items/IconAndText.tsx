import React, { ReactNode } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// Icon and Text Props
interface IATProps {
  icon: ReactNode;
  text: string;
  onPress?: () => void;
}
const IconAndText = ({ icon, text, onPress }: IATProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex flex-col w-20 items-center gap-[6px]">
        <View className="icon w-9 h-9">{icon}</View>
        <Text className="text-wrap text-center text-xs">{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default IconAndText;
