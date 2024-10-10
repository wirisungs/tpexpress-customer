import React, { ReactNode, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import EyesIC from "../../svg/MTri/EyesIC";

type type = "numeric" | "default" | "email-address" | "visible-password";

// Props input thường
interface InputProps {
  inputType: type;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

// Props cho OTP
interface OTPInputProps {
  length: number;
  value: Array<string>;
  disable: boolean;
  onChangeText(value: Array<string>): void;
}

// Props cho Icon
interface InputIconProps extends InputProps {
  icon: ReactNode;
}

const Input: React.FC<InputProps> = ({
  inputType,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      className="w-full h-12 px-3 py-3 border-solid border-[1px] border-border rounded-xl"
      keyboardType={inputType}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  value,
  disable,
  onChangeText,
}) => {
  return (
    <View className="flex flex-row gap-2">
      {[...new Array(length)].map((item, index) => (
        <TextInput
          key={index}
          className="w-[45px] h-[45px] bg-transparent border-solid border-[1px] border-border rounded-xl"
        />
      ))}
    </View>
  );
};

const InputWithIcon: React.FC<InputIconProps> = ({
  inputType,
  placeholder,
  value,
  onChangeText,
  icon,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggle = () => {
    setIsHidden(!isHidden);
  };
  return (
    <View className="flex flex-row w-full h-12 px-3 py-3 border-solid border-[1px] border-border rounded-xl">
      {inputType === "visible-password" ? (
        <View className="flex flex-row items-center w-full justify-between">
          <TextInput
            className="w-[90%]"
            placeholder={placeholder}
            secureTextEntry={isHidden}
            value={value}
            onChangeText={onChangeText}
          />
          <TouchableOpacity className="icon" onPress={() => handleToggle()}>
            <EyesIC />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex flex-row items-center w-full justify-between">
          <TextInput
            className="w-[90%]"
            placeholder={placeholder}
            secureTextEntry={isHidden}
            value={value}
            keyboardType={inputType}  //Trí thêm vào
            onChangeText={onChangeText}
          />
          <TouchableOpacity className="icon" onPress={() => handleToggle()}>
            {icon}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
export { InputWithIcon, OTPInput };
