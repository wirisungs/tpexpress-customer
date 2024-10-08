import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackIC from "../../svg/MTri/BackIC";
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
    <View style={styles.shadow}>
      <View className="flex relative p-6 h-header115 justify-end items-center">
        <View className="absolute left-6 bottom-6">
          <TouchableOpacity onPress={() => handleBack()}>
            {haveBackIcon ? <BackIC fill="#EB455F" /> : ""}
          </TouchableOpacity>
        </View>
        {title !== null ? (
          <Text className="text-2xl font-bold text-primaryText-EB455F">
            {title}
          </Text>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

const TransHeader = ({ haveBackIcon, title }: BasicHeaderProps) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View className="bg-transparent">
      <View className="flex relative p-6 h-header115 justify-end items-center">
        <View className="absolute left-6 bottom-6">
          <TouchableOpacity onPress={() => handleBack()}>
            {haveBackIcon ? <BackIC fill="#EB455F" /> : ""}
          </TouchableOpacity>
        </View>
        {title !== null ? (
          <Text className="text-2xl font-bold text-primaryText-EB455F">
            {title}
          </Text>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    width: "100%",
    backgroundColor: "#FCFCFC",
    shadowColor: "#1C1C1C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default BasicHeader;
export { TransHeader };
