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
  FlatList,
} from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import Input, { InputWithIcon, PhoneInput } from "../../components/Inputs/Inputs";
import CheckboxText from "../../components/Inputs/CheckboxText";
import ButtonFill from "../../components/Buttons/Buttons";
import Marker from "../../svg/MTri/Marker";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Touchable } from "react-native";
import CancelIC from "../../svg/DucTri/Icons/Order/Cancel"
import axios from "axios";

const initialFormValues = {
  senderAddress: "",
  phoneNumber: "",
  receiverName: "",
  receiverAddress: "",
  packageName: "",
  weight: "",
  priceOfItem: "",
  ordernote: "",
  orderCOD: "",
  
};

const MAPBOX_API_KEY = "pk.eyJ1IjoiYmx1ZWR1Y2swOTA3IiwiYSI6ImNtMnI0ZWJ6aTEzengyanNibHpkanp4djEifQ.iaoeQHLQaLkNHLga6ZUffw"; // Thay bằng token Mapbox của bạn

interface Coordinates {
  latitude: number;
  longitude: number;
}

const CreateOrder = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [codInput, setCODInput] = useState(false);
  const [fragileInput, setFragileInput] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [orders, setOrders] = useState([{ id: 1 }]);
  const [showErrorNote, setShowErrorNote] = useState(false); 
  // map
  const [originCoords, setOriginCoords] = useState<Coordinates | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<Coordinates | null>(null);
  const [distance, setDistance] = useState<string | null>(null);


  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getCoordinates = async (address: string) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
      const response = await axios.get(url);
      const { lat, lon } = response.data[0]; // Lấy tọa độ đầu tiên tìm thấy
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", `Không thể tìm thấy tọa độ cho địa chỉ: ${address}`);
      throw error;
    }
  };

  // Hàm tính khoảng cách giữa hai tọa độ bằng Mapbox Directions API
  const calculateDistance = async () => {
    try {
      const originCoords = await getCoordinates(formValues.senderAddress);
      const destinationCoords = await getCoordinates(formValues.receiverAddress);
  
      setOriginCoords(originCoords);
      setDestinationCoords(destinationCoords);
  
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.longitude},${originCoords.latitude};${destinationCoords.longitude},${destinationCoords.latitude}?access_token=${MAPBOX_API_KEY}`;
  
      const response = await axios.get(url);
      console.log("Response from Mapbox API:", response.data);
  
      if (!response.data.routes || response.data.routes.length === 0) {
        Alert.alert("Lỗi", "Không tìm thấy tuyến đường hợp lệ.");
        return null;
      }
  
      const distanceMeters = response.data.routes[0].distance;
      const distanceKm = (distanceMeters / 1000).toFixed(2); // Đổi sang km
  
      return distanceKm; // Trả về khoảng cách
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tính khoảng cách.");
      return null;
    }
  };
  

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setInputErrors((prev) => ({ ...prev, [field]: false }));
  };


  const handleSubmit = async () => {
    const newErrors = {};
  
    // Kiểm tra các trường thông tin người gửi và người nhận
    const requiredFields = [
      "senderAddress",
      "phoneNumber",
      "receiverName",
      "receiverAddress",
    ];
  
    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = "Không được bỏ trống ô.";
      }
    });
  
    // Kiểm tra số điện thoại
    const phone = formValues.phoneNumber;
    if (!phone) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại.";
    } else if (phone.length !== 10) {
      newErrors.phoneNumber = "Hãy nhập đủ 10 số.";
    } else if (phone[0] !== "0") {
      newErrors.phoneNumber = "Số điện thoại phải bắt đầu bằng 0.";
    }
  
    // Kiểm tra các trường trong từng đơn hàng
    orders.forEach((order, index) => {
      if (!order.packageName) {
        newErrors[`packageName-${index}`] = `Tên hàng của đơn ${index + 1} không được bỏ trống.`;
      }
      if (!order.weight) {
        newErrors[`weight-${index}`] = `Khối lượng của đơn ${index + 1} không được bỏ trống.`;
      }
      if (!order.priceOfItem) {
        newErrors[`priceOfItem-${index}`] = `Giá trị món hàng của đơn ${index + 1} không được bỏ trống.`;
      }
    });
  
    setInputErrors(newErrors);
    setShowErrorNote(Object.keys(newErrors).length > 0);
  
    // Nếu có lỗi, dừng quá trình
    if (Object.keys(newErrors).length > 0) return;
  
    try {
      const calculatedDistance = await calculateDistance(); // Đợi giá trị distance
  
      if (!calculatedDistance) {
        return; // Nếu không có khoảng cách, dừng quá trình
      }
  
      // Điều hướng sau khi tính khoảng cách thành công
      navigation.navigate("ServiceOrder", {
        orders,
        senderAddress: formValues.senderAddress,
        receiverAddress: formValues.receiverAddress,
        phone: formValues.phoneNumber,
        name: formValues.receiverName,
        note: formValues.ordernote,
        COD: formValues.orderCOD || 0,
        fragileInput,
        distance: calculatedDistance,
      });
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      Alert.alert("Lỗi", "Không thể thực hiện yêu cầu.");
    }
  };
  
 
  const renderError = (field: string) => {
    const errorMessage = inputErrors[field];
    return (
      errorMessage &&
      showErrorNote && (
        <Text className="text-primaryText-EB455F">
          {errorMessage}
        </Text>
      )
    );
  };

  const removeOrder = (id) => {
    const newOrders = orders
    .filter(order => order.id !== id) // Xóa đơn hàng theo ID
    .map((order, index) => ({ ...order, id: index + 1 })); // Tái đánh số thứ tự
  setOrders(newOrders);
  };

  const addOrder = () => {
    const newId = orders.length + 1;
    setOrders([...orders, { id: newId }]); // Thêm đơn hàng mới
  };

  const handleOrderDataUpdate = (id: number, field: string, value: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, [field]: value } : order
      )
    );
  };
  

  const renderOrderItem = ({ item }) => (
    <View className="gap-3">
      <View style={styles.itembox}>
        <Text className="text-l">Đơn hàng {item.id}</Text>
        {item.id !== 1 && (
          <TouchableOpacity onPress={() => removeOrder(item.id)}>
            <CancelIC />
          </TouchableOpacity>
        )}
      </View>
      <Input
        placeholder="Tên hàng"
        value={item.packageName || ""}
        onChangeText={(val) => handleOrderDataUpdate(item.id, "packageName", val)}
        inputType="default"
      />
      {renderError(`packageName-${item.id - 1}`)}
  
      <View style={styles.row}>
        <Input
          placeholder="Khối lượng"
          value={item.weight || ""}
          onChangeText={(val) => handleOrderDataUpdate(item.id, "weight", val)}
          style={{ flex: 1 }}
          inputType="numeric"
        />
         <Text style={styles.currency}>KG</Text>
        <Input
          placeholder="Giá trị món hàng"
          value={item.priceOfItem || ""}
          onChangeText={(val) => handleOrderDataUpdate(item.id, "priceOfItem", val)}
          style={{ flex: 1, marginLeft: 8 }}
          inputType="numeric"
        />
         <Text style={styles.currency}>VNĐ</Text>
      </View>
      {renderError(`weight-${item.id - 1}`)}
      {renderError(`priceOfItem-${item.id - 1}`)}
    </View>
  );
  


  const errorStyle: StyleProp<TextStyle> = { borderColor: "#EB455F" };

  return (  
    <FlatList
    className="flex flex-col bg-grayBG-FCFCFC"     showsVerticalScrollIndicator={false}
    data={[{ key: 'content' }]} 
    renderItem={() => (
      <View className="content flex flex-col gap-6 p-6">
        <TransHeader haveBackIcon={true} title="Tạo đơn hàng" />
  
        {/* Thông tin người gửi */}
        <View className="sender-info flex flex-col gap-3">
          <Text className="text-xl font-bold">
            Thông tin người gửi {distance} <Text className="text-primary">*</Text>
          </Text>
          <InputWithIcon
            placeholder="Địa chỉ"
            value={formValues.senderAddress}
            onChangeText={(val) => handleInputChange("senderAddress", val)}
            icon={<Marker />}
            style={inputErrors.senderAddress && errorStyle}
            inputType="default"
          />
            {renderError("senderAddress")}
          
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
              style={inputErrors.phoneNumber && errorStyle}
              inputType="numeric"
          />
          {renderError("phoneNumber")}
          {/* {renderError("phoneNumber")} */}
          <Input
            placeholder="Họ tên"
            value={formValues.receiverName}
            onChangeText={(val) => handleInputChange("receiverName", val)}
            style={inputErrors.receiverName && errorStyle}
            inputType="default"
          />
          {renderError("receiverName")}
          <InputWithIcon
            placeholder="Địa chỉ"
            value={formValues.receiverAddress}
            onChangeText={(val) => handleInputChange("receiverAddress", val)}
            icon={<Marker />}
            style={inputErrors.receiverAddress && errorStyle}
            inputType="default"
          />
          {renderError("receiverAddress")}
        </View>
  
        {/* Thông tin đơn hàng */}
        <View className="order-info flex flex-col ">
          <Text className="text-xl font-bold">
            Thông tin đơn hàng <Text className="text-primary">*</Text>
          </Text>

          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          
          <TouchableOpacity
            className="flex items-center justify-center py-2 px-4 bg-blue-500 rounded-md"
            onPress={addOrder}
          >
            <Text style={styles.txadd}>Thêm hàng</Text>
          </TouchableOpacity>
        </View>
  
        {/* Thông tin tổng kiện hàng */}
        <View style={styles.boxinfo} className="order-info flex flex-col gap-3">
          <Text className="text-xl font-bold">Thông tin tổng kiện hàng</Text>
          <Input
            placeholder="Ghi chú"
            value={formValues.ordernote}
            onChangeText={(val) => handleInputChange("ordernote", val)}
            inputType="default"
          />
          <CheckboxText
            isChecked={isChecked2}
            onCheckChange={setIsChecked2}
            setCOD={setFragileInput} 
          >
            <Text>Hàng dễ vỡ </Text>

          </CheckboxText>

          {/* <Text>Giá trị của fragileInput: {fragileInput ? "true" : "false"}</Text> */}

          <CheckboxText
            isChecked={isChecked}
            onCheckChange={setIsChecked}
            setCOD={setCODInput}
          >
            <Text>Thu hộ COD</Text>
          </CheckboxText>
          {codInput && (
            <Input
              placeholder="Phí thu hộ"
              value={formValues.orderCOD}
              onChangeText={(val) => handleInputChange("orderCOD", val)}
              inputType="numeric"
            />
          )}
          <ButtonFill onPress={handleSubmit}>
            <Text className="text-white text-xl font-bold">Tiếp tục</Text>
          </ButtonFill>
        </View>
      </View>
    )}
    keyExtractor={(item) => item.key}
  />
  
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center", 
  },
  itembox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12
  },
  txadd: {
    color: '#495DC1',
    alignSelf: 'center',
    marginTop: 24
  },
  boxinfo: {
    // padding: 24
  },
  currency:{
    fontSize: 12,
    color: "#495DC1",
    marginLeft: 5
  }
});

export default CreateOrder;
