import React, { Children, ReactNode, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TickIC from "../../svg/MTri/TickIC";
interface CheckboxTextProps {
  children: ReactNode;
  setCOD: any;
}
const CheckboxText = ({ children, setCOD }: CheckboxTextProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = (setCOD: any) => {
    setIsChecked(!isChecked);
    if (setCOD) {
      if (!isChecked) {
        setCOD(true);
      } else setCOD(false);
    }
  };

  return (
    <View className="flex flex-row w-full ">
      <View className="w-full">
        <TouchableOpacity onPress={() => handleCheckbox(setCOD)}>
          <View className="flex flex-row gap-[6px] items-center">
            {!isChecked ? (
              <View className="checkbox w-6 h-6 bg-transparent border-solid border-[1px] border-primary rounded-md" />
            ) : (
              <View className="flex items-center justify-center checkbox w-6 h-6 bg-primary rounded-md">
                <TickIC fill="#fff" />
              </View>
            )}
            <View className="flex-1">{children}</View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CheckboxText;
