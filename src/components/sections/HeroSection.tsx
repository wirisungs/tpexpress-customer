import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const HeroSection = () => {
  return (
    <View className="HeroSection flex flex-col gap-3 items-center">
      <Image
        className="w-[220px] h-[96px]"
        source={require("../../assets/TPLogo.png")}
      />
      <View className="flex flex-col gap-2 items-center">
        <Text className="text-[28px] font-bold uppercase text-basicBlack">
          Thien Phuc Express
        </Text>
        <View className="flex flex-col gap-0 items-center">
          <Text className="text-base font-medium text-subtitle">
            Giao hàng 1 giây
          </Text>
          <Text className="text-base font-medium text-subtitle">
            nhận hàng liền tay!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HeroSection;
