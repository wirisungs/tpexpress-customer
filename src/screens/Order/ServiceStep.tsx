import React from "react";
import { ScrollView, StyleSheet, View, Text, Alert } from "react-native";
import BasicHeader from "../../components/Layouts/Headers";
import InfoBox, { ChooseInfoBox } from "../../components/Box/InfoBox";
import MoreIC from "../../svg/MTri/MoreIC";
import ButtonFill from "../../components/Buttons/Buttons";
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const ServiceStep = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const Route = useRoute<RouteProp<RootStackParamList, "ServiceOrder">>();
  const { 
    senderAddress = null, 
    receiverAddress = null, 
    packageName = null, 
    weight = null,
    phone = null,
    name = null, 
    note = null, 
    COD = null, 
  } = Route.params || {};
  const newOrderID = generateOrderID();

  const handleOnClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Trả về tab thứ 0
        routes: [{ name: "HomePage" }],
      })
    );
  };

  const handleSubmit = async () => {

    try {
      const response = await fetch('http://tpexpress.ddns.net:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          Order_ID: newOrderID,
          Cus_ID:'KH35540913',
          Sender_Address: senderAddress,
          Receiver_Phone: phone, 
          Receiver_Name: name,
          Receiver_Address: receiverAddress,
          Order_Type:'Nội thành',
          Order_Fragile: false,
          Order_Note: note,
          Order_COD: COD,
          Services_ID:'S001',
          Order_TotalPrice: 27781,
          Payment_ID:'P001',
          Status_ID:'ST001',
          Driver_ID:'',
          Order_Date:'',
          Delivery_Fee: 23000,
          Proof_Success:'',
          Order_Reason:''
        }), 
      });

      const result = await response.json();

      if (response.ok) {
        // Alert.alert('Thành công', 'Dữ liệu đã được thêm thành công!');
        navigation.navigate('SuccessStep')
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi gửi dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi dữ liệu.');
    }
  };

  function generateOrderID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderID = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      orderID += chars[randomIndex];
    }
    return orderID;
  };


  return (
    <ScrollView
      className="flex flex-col h-full bg-grayBG-FCFCFC"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <BasicHeader haveBackIcon={true} title="Chọn dịch vụ" />

      {/* Body */}

      <View className="body flex flex-col p-6 gap-8">
        <View className="content flex fex-col gap-6">
          {/* Lộ trình */}
          <View className="route-info flex flex-col gap-3">
            <Text>Lộ trình</Text>
            <View className="input flex flex-col gap-2">
              <InfoBox value={senderAddress} />
              <InfoBox value={receiverAddress} />
            </View>
          </View>

          {/* Thông tin gói hàng */}
          <View className="package-info flex flex-col gap-3">
            <Text>Thông tin gói hàng</Text>
            <View className="input flex flex-col gap-2">
              <InfoBox value={packageName} />
              <InfoBox value={weight} />
            </View>
          </View>

          {/* Lựa chọn dịch vụ */}
          <View className="service flex flex-col gap-3">
            <Text>Dịch vụ</Text>

            <View className="validService flex flex-col gap-2">
              <View
                style={styles.shadow}
                className="flex flex-row w-full h-[72px] rounded-xl bg-white"
              >
                <View className="right bg-[#217865] w-[3%] h-full rounded-l-xl"></View>
                <View className="right bg-[#fff] w-[97%] h-full rounded-r-xl p-3 flex flex-col justify-between">
                  <View className="title-bar flex flex-row justify-between">
                    <Text className="text-base text-basicBlack font-bold">
                      Giao hàng đặc biệt
                    </Text>
                    <Text className="text-base text-basicBlack font-bold">
                      322.000đ
                    </Text>
                  </View>
                  <View className="timeline">
                    <Text className="text-xs">Thời gian dự kiến: 2 tiếng</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Hình thức thanh toán */}
          <View className="package-info flex flex-col gap-3">
            <Text>Thông tin gói hàng</Text>
            <View className="choose-input flex flex-col gap-2">
              <ChooseInfoBox icon={<MoreIC />} />
            </View>
          </View>
        </View>

        {/* Thanh toán */}
        <View className="bottom-0">
          <ButtonFill onPress={handleSubmit}>
            <Text className="text-white text-xl font-bold">Thanh toán</Text>
          </ButtonFill>
        </View>
      </View>
    </ScrollView>
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

export default ServiceStep;
