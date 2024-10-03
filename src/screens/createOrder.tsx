import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import BasicHeader from "../components/Layouts/Headers";
import Input, { InputWithIcon } from "../components/Inputs/Inputs";
import Marker from "../svg/Marker";
import CheckboxText from "../components/Inputs/CheckboxText";
import ButtonFill from "../components/Buttons/Buttons";

const CreateOrder = () => {
  const [codInput, setCODInput] = useState<boolean>(false);
  return (
    <ScrollView
      className="flex flex-col bg-grayBG-FCFCFC"
      showsVerticalScrollIndicator={false}
    >
      {/* Header tạm thời */}
      <BasicHeader haveBackIcon={true} title="Tạo đơn hàng" />
      <View className="content flex flex-col gap-6 p-6">
        {/* Thông tin người gửi */}
        <View className="sender-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin người gửi <Text className="text-primary">*</Text>
          </Text>
          <InputWithIcon
            inputType="default"
            placeholder="Nhập địa chỉ"
            icon={<Marker />}
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
            <Input inputType="default" placeholder="Số điện thoại" />
            <Input inputType="default" placeholder="Họ tên" />
            <InputWithIcon
              inputType="default"
              placeholder="Nhập địa chỉ"
              icon={<Marker />}
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
            <Input inputType="default" placeholder="Tên hàng" />
            <Input inputType="numeric" placeholder="Khối lượng" />
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
          <CheckboxText setCOD={setCODInput}>
            <Text>Thu hộ COD</Text>
          </CheckboxText>
          {codInput && <Input inputType="numeric" placeholder="Phí thu hộ" />}
        </View>
        {/* Qua bước tiếp theo */}
        <ButtonFill onPress={() => Alert.alert("Next Step")}>
          <Text className="text-white text-xl font-bold">Tiếp tụccc</Text>
        </ButtonFill>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default CreateOrder;
