import React, { useEffect, useState } from "react";
import { ScrollView, StyleProp, Text, TextStyle, View } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import Input, {
  InputWithIcon,
  PhoneInput,
} from "../../components/Inputs/Inputs";
import Marker from "../../svg/MTri/Marker";
import CheckboxText from "../../components/Inputs/CheckboxText";
import ButtonFill from "../../components/Buttons/Buttons";
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

// Type
type formValuesType = {
  senderAddress: string;
  receiverAddress: string;
  phoneNumber: string;
  receiverName: string;
  packageName: string;
  weight: string;
};

const CreateOrder = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  // Khai báo cho checkBox
  const [isChecked, setIsChecked] = useState(false);
  // Value của input
  // Thông tin người nhận
  const [formValues, setFormValues] = useState<formValuesType>({
    senderAddress: "",
    receiverAddress: "",
    phoneNumber: "",
    receiverName: "",
    packageName: "",
    weight: "",
  });

  // Trạng thái input
  const [senderAddressCheck, setSenderAddressCheck] = useState<boolean>(false);
  const [receiverAddressCheck, setReceiverAddressCheck] =
    useState<boolean>(false);
  const [phoneNumberCheck, setPhoneNumberCheck] = useState<boolean>(false);
  const [receiverNameCheck, setReceiverNameCheck] = useState<boolean>(false);
  const [packageNameCheck, setPackageNameCheck] = useState<boolean>(false);
  const [weightCheck, setWeightCheck] = useState<boolean>(false);

  // Xử lý khi rời khỏi trang
  useEffect(() => {
    // Reset các state của form
    setFormValues({
      senderAddress: "",
      receiverAddress: "",
      phoneNumber: "",
      receiverName: "",
      packageName: "",
      weight: "",
    });
    // Reset trạng thái lỗi của các input
    setSenderAddressCheck(false);
    setReceiverAddressCheck(false);
    setPhoneNumberCheck(false);
    setReceiverNameCheck(false);
    setPackageNameCheck(false);
    setWeightCheck(false);
  }, [isFocused]);

  useEffect(() => {
    // Kiểm tra khác null
    if (formValues.senderAddress !== "") setSenderAddressCheck(false);
    if (formValues.receiverAddress !== "") setReceiverAddressCheck(false);
    if (formValues.phoneNumber !== "") setPhoneNumberCheck(false);
    if (formValues.receiverName !== "") setReceiverNameCheck(false);
    if (formValues.packageName !== "") setPackageNameCheck(false);
    if (formValues.weight !== "") setWeightCheck(false);
  });
  const handleOnClick = () => {
    const fields = [
      formValues.senderAddress,
      formValues.receiverAddress,
      formValues.phoneNumber,
      formValues.receiverName,
      formValues.packageName,
      formValues.weight,
    ];
    const isNullField = fields.some((field) => field === "");
    !isNullField && navigation.navigate("ServiceOrder", { ...formValues });

    // Check null
    if (formValues.senderAddress === "") setSenderAddressCheck(true);
    if (formValues.receiverAddress === "") setReceiverAddressCheck(true);
    if (formValues.phoneNumber === "") setPhoneNumberCheck(true);
    if (formValues.receiverName === "") setReceiverNameCheck(true);
    if (formValues.packageName === "") setPackageNameCheck(true);
    if (formValues.weight === "") setWeightCheck(true);
  };
  const [codInput, setCODInput] = useState<boolean>(false);

  // Khai báo style
  const errorStyle: StyleProp<TextStyle> = {
    borderColor: "#EB455F",
  };
  return (
    <ScrollView
      className="flex flex-col bg-grayBG-FCFCFC"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <TransHeader haveBackIcon={true} title="Tạo đơn hàng" />
      <View className="content flex flex-col gap-6 p-6">
        {/* Thông tin người gửi */}
        <View className="sender-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin người gửi <Text className="text-primary">*</Text>
          </Text>
          <InputWithIcon
            inputType="default"
            placeholder="Địa chỉ mặc định"
            value={formValues.senderAddress}
            onChangeText={(data) =>
              setFormValues((prev) => ({ ...prev, senderAddress: data }))
            }
            icon={<Marker />}
            style={senderAddressCheck && errorStyle}
          />
          <Text className="text-primaryText-EB455F">
            Lưu ý: Không được để trống bất kì ô nào
          </Text>
        </View>
        {/* Thông tin người nhận */}
        <View className="receiver-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin người nhận <Text className="text-primary">*</Text>
          </Text>

          <View className="inputContainer flex flex-col gap-2">
            <PhoneInput
              inputType="numeric"
              placeholder="Số điện thoại"
              value={formValues.phoneNumber}
              onChangeText={(data) =>
                setFormValues((prev) => ({ ...prev, phoneNumber: data }))
              }
              style={phoneNumberCheck && errorStyle}
            />
            <Input
              inputType="default"
              placeholder="Họ tên"
              value={formValues.receiverName}
              onChangeText={(data) =>
                setFormValues((prev) => ({ ...prev, receiverName: data }))
              }
              style={receiverNameCheck && errorStyle}
            />
            <InputWithIcon
              inputType="default"
              placeholder="Nhập địa chỉ"
              value={formValues.receiverAddress}
              onChangeText={(data) =>
                setFormValues((prev) => ({ ...prev, receiverAddress: data }))
              }
              icon={<Marker />}
              style={receiverAddressCheck && errorStyle}
            />
          </View>
          <Text className="text-primaryText-EB455F">
            Lưu ý: Không được để trống bất kì ô nào
          </Text>
        </View>
        {/* Thông tin đơn hàng */}
        <View className="receiver-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin đơn hàng <Text className="text-primary">*</Text>
          </Text>

          <View className="inputContainer flex flex-col gap-2">
            <Input
              inputType="default"
              placeholder="Tên hàng"
              value={formValues.packageName}
              onChangeText={(data) =>
                setFormValues((prev) => ({ ...prev, packageName: data }))
              }
              style={packageNameCheck && errorStyle}
            />
            <Input
              inputType="numeric"
              placeholder="Khối lượng"
              value={formValues.weight}
              onChangeText={(data) =>
                setFormValues((prev) => ({ ...prev, weight: data }))
              }
              style={weightCheck && errorStyle}
            />
          </View>
        </View>
        {/* Thêm đơn hàng mới (Nếu có) */}
        <View className="flex w-full items-center">
          <Text className="text-blueText-495DC1">Thêm hàng</Text>
        </View>
        {/* Thông tin tổng kiện hàng */}
        <View className="receiver-info flex flex-col gap-3">
          <Text className="text-xl font-bold">Thông tin tổng kiện hàng</Text>
          <View className="inputContainer flex flex-col gap-2">
            <Input inputType="numeric" placeholder="Chiều dài / rộng / cao" />
            <Input inputType="default" placeholder="Ghi chú" />
          </View>
        </View>
        {/* Checkbox */}
        <View className="cod-input flex flex-col gap-2">
          <CheckboxText
            isChecked={isChecked}
            onCheckChange={setIsChecked}
            setCOD={setCODInput}
          >
            <Text>Thu hộ COD</Text>
          </CheckboxText>
          {codInput && <Input inputType="numeric" placeholder="Phí thu hộ" />}
        </View>
        {/* Qua bước tiếp theo */}
        <ButtonFill onPress={() => handleOnClick()}>
          <Text className="text-white text-xl font-bold">Tiếp tục</Text>
        </ButtonFill>
      </View>
    </ScrollView>
  );
};

export default CreateOrder;
