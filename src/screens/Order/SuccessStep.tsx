import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SuccessIC from "../../svg/MTri/SuccessIC";
const SuccessStep = () => {
  return (
    <View className="flex flex-col w-full h-full p-6">
      <View className="NoticeBox flex flex-col w-full h-3/5 items-center justify-center">
        <SuccessIC />
        <Text className="text-success-5DC061">Hoàn tất đặt hàng</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SuccessStep;
