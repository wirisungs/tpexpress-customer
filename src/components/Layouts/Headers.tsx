import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackIC from "../../svg/BackIC";
import { useNavigation } from "@react-navigation/native";

interface BasicHeaderProps {
  haveBackIcon: boolean;
  title?: string;
}
const BasicHeader = ({ haveBackIcon, title }: BasicHeaderProps) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View className="w-full">
      <View className="flex relative p-6 h-header115 justify-end items-center">
        <View className="absolute left-6 bottom-6">
          <TouchableOpacity onPress={() => handleBack()}>
            {haveBackIcon ? <BackIC /> : ""}
          </TouchableOpacity>
        </View>
        {title !== null ? (
          <Text className="text-2xl font-bold">{title}</Text>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BasicHeader;
