import React, { ReactNode, useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  isPassword?: boolean;
}

const ButtonFill = ({ children, onPress }: ButtonProps) => {
  return (
    <View className="flex w-full">
      <TouchableOpacity onPress={onPress}>
        <View className="flex w-full justify-center items-center h-12 bg-primary rounded-xl py-[6px] px-6">
          {children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ButtonLine = ({ children, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex items-center justify-center w-12 h-12 bg-transparent border-solid border-[1px] border-primary rounded-xl">
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    backgroundColor: "#EB455F",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
});

export default ButtonFill;
export { ButtonLine };
