import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import EyesIC from "../../svg/EyesIC";

type type = "numeric" | "default" | "email-address" | "visible-password";

interface InputProps {
  inputType: type;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}
interface OTPInputProps {
  length: number;
  value: Array<string>;
  disable: boolean;
  onChangeText(value: Array<string>): void;
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

const InputWithIcon: React.FC<InputProps> = ({
  inputType,
  placeholder,
  value,
  onChangeText,
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
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
export { InputWithIcon, OTPInput };
