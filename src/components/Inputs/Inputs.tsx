import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleProp,
  TextStyle,
} from "react-native";
import EyesIC from "../../svg/MTri/EyesIC";

type type = "numeric" | "default" | "email-address";

// Props input thường
interface InputProps {
  inputType: type;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  isBackground?: boolean;
  style?: StyleProp<TextStyle>;
}

// Props cho OTP
interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

// Props cho Icon
interface InputIconProps extends InputProps {
  icon?: ReactNode;
  isPassword?: boolean;
}

// Input thông thường
const Input: React.FC<InputProps> = ({
  inputType,
  placeholder,
  value,
  onChangeText,
  isBackground = false,
  style,
}) => {
  return (
    <>
      {!isBackground ? (
        <TextInput
          className="w-full h-12 px-3 py-3 border-solid border-[1px] border-border rounded-xl"
          keyboardType={inputType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={style}
        />
      ) : (
        <TextInput
          className="w-full h-12 px-3 py-3 rounded-xl bg-whiteBG-EEEEEE"
          keyboardType={inputType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={style}
        />
      )}
    </>
  );
};

// Input số điện thoại
const PhoneInput: React.FC<InputProps> = ({
  inputType,
  placeholder,
  value,
  onChangeText,
  isBackground = false,
  style,
}) => {
  return (
    <>
      {!isBackground ? (
        <TextInput
          className="w-full h-12 px-3 py-3 border-solid border-[1px] border-border rounded-xl"
          style={style}
          keyboardType={inputType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          maxLength={10}
        />
      ) : (
        <TextInput
          className="w-full h-12 px-3 py-3 rounded-xl bg-whiteBG-EEEEEE"
          style={style}
          keyboardType={inputType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          maxLength={10}
        />
      )}
    </>
  );
};

// Input OTP
const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(""));
  const inputsRefs = useRef<Array<TextInput | null>>([]);
  const handleOnChange = (text: string, index: number): void => {
    if (text.length > 1) return;

    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    if (text && index < length - 1) {
      inputsRefs.current[index + 1]?.focus();
    }

    // Gọi callback khi hoàn tất nhập OTP
    if (newOTP.join("").length === length) {
      onComplete(newOTP.join(""));
    }
  };
  const handleKeyPress = (e: any, index: number) => {
    // Xóa nội dung và chuyển con trỏ tới input trước đó nếu bấm phím Backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRefs.current[index - 1]?.focus();
    }
  };
  return (
    <View className="flex flex-row gap-2">
      {[...new Array(length)].map((item, index) => (
        <TextInput
          key={index}
          ref={(input) => (inputsRefs.current[index] = input)}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[index]}
          onChangeText={(text) => handleOnChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          className="text-center w-[45px] h-[45px] bg-transparent border-solid border-[1px] border-border rounded-xl"
        />
      ))}
    </View>
  );
};

// Input chứa icon
const InputWithIcon: React.FC<InputIconProps> = ({
  placeholder,
  value,
  onChangeText,
  icon,
  isPassword = false,
  style,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggle = () => {
    setIsHidden(!isHidden);
  };
  return (
    <View
      className="flex flex-row w-full h-12 px-3 py-3 border-solid border-[1px] border-border rounded-xl"
      style={style}
    >
      {isPassword ? (
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
            value={value}
            keyboardType={inputType}  //Trí thêm vào
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            className="icon"
            onPress={() => Alert.alert("Choose")}
          >
            {icon}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Input;
export { InputWithIcon, OTPInput, PhoneInput };
