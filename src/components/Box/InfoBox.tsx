import React, { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

interface InfoBoxProps {
  value?: string;
}
interface ChooseInfoProps extends InfoBoxProps {
  icon: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ value }) => {
  return (
    <View className="flex justify-center p-3 w-full h-[50px] border-solid border-[1px] border-border rounded-xl">
      <Text className=" text-grayText-767676 text-base font-medium text-ellipsis">
        {value}
      </Text>
    </View>
  );
};

const ChooseInfoBox: React.FC<ChooseInfoProps> = ({
  value = "Thanh toán trực tiếp",
  icon,
}) => {
  return (
    <View className="flex flex-row justify-center items-center p-3 w-full h-[50px] border-solid border-[1px] border-border rounded-xl">
      <Text className=" text-grayText-767676 text-base font-medium text-ellipsis w-[90%]">
        {value}
      </Text>
      <View className="icon w-[10%] h-full">{icon}</View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default InfoBox;
export { ChooseInfoBox };
