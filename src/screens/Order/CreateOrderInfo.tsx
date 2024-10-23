import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import Input, { InputWithIcon, PhoneInput } from "../../components/Inputs/Inputs";
import CheckboxText from "../../components/Inputs/CheckboxText";
import ButtonFill from "../../components/Buttons/Buttons";
import Marker from "../../svg/MTri/Marker";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Touchable } from "react-native";
import CancelIC from "../../svg/DucTri/Icons/Order/Cancel"

const initialFormValues = {
  senderAddress: "",
  phoneNumber: "",
  receiverName: "",
  receiverAddress: "",
  packageName: "",
  weight: "",
  priceOfItem: "",
  ordernote:"",
  orderCOD:"",
};

const CreateOrder = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [codInput, setCODInput] = useState(false);
  const [fragileInput, setFragileInput] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [items, setItems] = useState([{ id: Date.now(), name: "Món hàng 1" }]);
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      resetForm();
    }
  }, [isFocused]);

  const resetForm = () => {
    setFormValues(initialFormValues);
    setInputErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setInputErrors((prev) => ({ ...prev, [field]: false }));
  };
  
  
  const handleSubmit = async () => {
    navigation.navigate('ServiceOrder', { 
      senderAddress: formValues.senderAddress, 
      receiverAddress: formValues.receiverAddress,
      phone: formValues.phoneNumber,
      name: formValues.receiverName,
      note: formValues.ordernote,
      COD: formValues.orderCOD 
    } );
  };

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), name: `Món hàng ${prevItems.length + 1}` },
    ]);
  };

  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const errorStyle: StyleProp<TextStyle> = { borderColor: "#EB455F" };

  return (
    <ScrollView
      className="flex flex-col bg-grayBG-FCFCFC"
      showsVerticalScrollIndicator={false}
    >
      <TransHeader haveBackIcon={true} title="Tạo đơn hàng" />

      <View className="content flex flex-col gap-6 p-6">
        {/* Thông tin người gửi */}
        <View className="sender-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin người gửi <Text className="text-primary">*</Text>
          </Text>
          <InputWithIcon
            placeholder="Địa chỉ"
            value={formValues.senderAddress}
            onChangeText={(val) => handleInputChange("senderAddress", val)}
            icon={<Marker />}
            style={inputErrors.senderAddress && errorStyle} inputType={"default"}          />
          <Text className="text-primaryText-EB455F">
            Lưu ý: Không được để trống bất kì ô nào
          </Text>
        </View>

        {/* Thông tin người nhận */}
        <View className="receiver-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin người nhận <Text className="text-primary">*</Text>
          </Text>
          <PhoneInput
            placeholder="Số điện thoại"
            value={formValues.phoneNumber}
            onChangeText={(val) => handleInputChange("phoneNumber", val)}
            style={inputErrors.phoneNumber && errorStyle} inputType={"numeric"} />
          <Input
            placeholder="Họ tên"
            value={formValues.receiverName}
            onChangeText={(val) => handleInputChange("receiverName", val)}
            style={inputErrors.receiverName && errorStyle} inputType={"default"} />
          <InputWithIcon
            placeholder="Địa chỉ"
            value={formValues.receiverAddress}
            onChangeText={(val) => handleInputChange("receiverAddress", val)}
            icon={<Marker />}
            style={inputErrors.receiverAddress && errorStyle} inputType={"default"} />
        </View>

        {/* Thông tin đơn hàng */}
        <View className="order-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin đơn hàng <Text className="text-primary">*</Text>
          </Text>

          {items.map((item) => (
            <View key={item.id} className="gap-3" style={styles.itembox}>
              <Text className="text-l">{item.name}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                <CancelIC />
              </TouchableOpacity>
            </View>
          ))}

          <Input
            placeholder="Tên hàng"
            value={formValues.packageName}
            onChangeText={(val) => handleInputChange("packageName", val)} inputType={"default"}          />
            <View style={styles.row}>
            <Input
              placeholder="Khối lượng"
              value={formValues.weight}
              onChangeText={(val) => handleInputChange("weight", val)}
              style={{ flex: 1 }} inputType={"numeric"}            />
            <Input
              placeholder="Giá trị món hàng"
              value={formValues.priceOfItem}
              onChangeText={(val) => handleInputChange("priceOfItem", val)}
              style={{ flex: 1, marginLeft: 8 }} inputType={"numeric"}            />
            </View>
          </View>
          <TouchableOpacity className="flex items-center justify-center py-2 px-4 bg-blue-500 rounded-md" 
           onPress={addItem}
           >
                <Text style={styles.txadd}>Thêm hàng</Text>
          </TouchableOpacity>
        </View>

      <View style={styles.boxinfo} className="order-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin tổng kiện hàng 
          </Text>
          <Input
            placeholder="Ghi chú"
            value={formValues.ordernote}
            onChangeText={(val) => handleInputChange("ordernote", val)} inputType={"default"}          />
        {/* hang de vỡ */}
        <CheckboxText
          isChecked={isChecked2}
          onCheckChange={setIsChecked2}
          setCOD={setFragileInput}
        >
          <Text>Hàng dễ vỡ
          </Text>
        </CheckboxText>
        {/* Checkbox COD */}
        <CheckboxText
          isChecked={isChecked}
          onCheckChange={setIsChecked}
          setCOD={setCODInput}
        >
          <Text>Thu hộ COD</Text>
        </CheckboxText>
        {codInput && <Input placeholder="Phí thu hộ" value={formValues.orderCOD}
            onChangeText={(val) => handleInputChange("orderCOD", val)} inputType={"numeric"} />}
        {/* Nút tiếp tục */}
        <ButtonFill onPress={handleSubmit}>
          <Text className="text-white text-xl font-bold">Tiếp tục</Text>
        </ButtonFill>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  itembox:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  txadd:{
    color:'#495DC1',
    alignSelf:'center'
  },
  boxinfo:{
    padding: 24
  }
});

export default CreateOrder;
