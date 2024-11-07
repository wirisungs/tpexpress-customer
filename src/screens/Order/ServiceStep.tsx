import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Dimensions, Modal } from "react-native";
import BasicHeader from "../../components/Layouts/Headers";
import InfoBox, { ChooseInfoBox } from "../../components/Box/InfoBox";
import CancelIC from "../../svg/DucTri/Icons/Order/Drop";
import GHTKIC from "../../svg/DucTri/Icons/Order/GHTK";
import GHNIC from "../../svg/DucTri/Icons/Order/GHN";
import GHTLIC from "../../svg/DucTri/Icons/Order/GHTL";
import THGHIC from "../../svg/DucTri/Icons/Order/TPGH";
//pay
import Wallet from "./Wallet";

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
  const [service, setService] = useState([]);
  const [payment, setPayment] = useState([]);
  //popup dịch vụ
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const handleOpenPopup = () => setPopupVisible(true);
  const handleClosePopup = () => setPopupVisible(false);


  const {
    senderAddress = null,
    receiverAddress = null,
    phone = null,
    name = null,
    note = null,
    COD = null,
    fragileInput = null,
    orders = null,
    distance = null,
  } = Route.params || {};
  const newOrderID = generateOrderID();
  const newItemID = generateItemID();

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Định dạng: YYYY-MM-DD
  };

  const isOutskirt = (distance: number) => {
    return distance > 30; // Ví dụ: trên 10km được coi là ngoại thành
  };
  

  const handleSubmit = async () => {
    const orderType = isOutskirt(distance) ? 'Ngoại thành' : 'Nội thành';
    const orderDate = getCurrentDate();
    const sanitizedCOD = Number(COD) || 0;
    const total = sanitizedCOD + calculatorFee(selectedService.dservicesPrice);

    try {
      const response = await fetch('http://tpexpress.ddns.net:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: newOrderID,
          cusId: 'KH84723774',
          senderAddress: senderAddress,
          receiverPhone: phone,
          receiverName: name,
          receiverAddress: receiverAddress,
          orderType: orderType,
          orderIsFragile: fragileInput,
          orderNote: note,
          orderCOD: sanitizedCOD,
          dservicesId: selectedService.dservicesId,
          totalPrice: total,
          paymentId: selectedPaymentMethod.Pay_ID,
          orderStatusId: 'ST001',
          driverId: null,
          createdDate: orderDate,
          deliverPrice: calculatorFee(selectedService.dservicesPrice),
          proofSuccess: null,
          reasonFailed: null
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


  const handleSubmitItem = async () => {
    try {
      for (const order of orders) {
        const response = await fetch('http://tpexpress.ddns.net:3000/api/item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Item_ID: generateItemID(),
            Item_Name: order.packageName,
            Item_Weight: order.weight,
            Item_AllValue: order.priceOfItem,
            Order_ID: newOrderID,
          }),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi gửi dữ liệu.');
          return; // Dừng lại nếu có lỗi
        }
      }
      // Alert.alert('Thành công', 'Tất cả item đã được thêm thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi dữ liệu.');
    }
  };
  
  const SubmitAll = async () => {
    handleSubmitItem();
    handleSubmit();
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

  function generateItemID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderID = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      orderID += chars[randomIndex];
    }
    return orderID;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://tpexpress.ddns.net:3000/api/Service'); 
        const promotionsData = await response.json();
        setService(promotionsData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    }; 
    fetchData();
  }, []);



  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  const getServiceIcon = (serviceId: any) => {
    switch (serviceId) {
      case 'S001':
        return <GHTKIC />;
      case 'S002':
        return <GHNIC />;
      case 'S003':
        return <GHTLIC />;
      case 'S004':
        return <THGHIC />;
      default:
        return null; // Nếu không có icon phù hợp
    }
  };


  const calculatorFee = (servicePrice: Number) => {
    // Nếu không có giá dịch vụ, trả về 0
    if (!servicePrice) return 0;
  
    // Khởi tạo phí bằng giá dịch vụ
    let fee = servicePrice;
  
    // Tính phí theo km
    const kmFee = distance > 5 ? (distance - 5) * 3000 : 0;
  
    // Tính phí theo trọng lượng
    const totalWeight = orders.reduce((total, order) => total + order.weight, 0);
    const weightFee = totalWeight > 3 ? (totalWeight - 3) * 5000 : 0;
  
    // Tính phí thu hộ COD
    const codFee = COD ? Math.max(0.02 * COD, 15000) : 0;
  
    // Tính phí bảo vệ hàng dễ vỡ
    const fragileFee = fragileInput ? 20000 : 0;
  
    // Cộng tất cả các khoản phí lại với nhau
    fee += kmFee + weightFee + codFee + fragileFee;
  
    return fee;
  };
  

  return (
    <>
      <ScrollView
        className="flex flex-col h-full bg-grayBG-FCFCFC"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <BasicHeader haveBackIcon={true} title="Chọn dịch vụ" />
  
        {/* Body */}
        <View className="body flex flex-col p-6 gap-8">
          <View className="content flex flex-col gap-6">
            {/* Lộ trình */}
            <View className="route-info flex flex-col gap-3">
              <Text style={styles.tx1}>Lộ trình </Text>
              <View className="input flex flex-col gap-2">
                <InfoBox value={senderAddress} />
                <InfoBox value={receiverAddress} />
              </View>
            </View>
  
            {/* Thông tin gói hàng */}
            <View className="package-info flex flex-col gap-3">
              <Text style={styles.tx1}>Thông tin gói hàng </Text>
              {orders.map((order, index) => (
                <View className="input flex flex-col gap-2" key={index}>
                  <Text style={styles.tx2}>Đơn hàng {order.id}</Text>
                  <InfoBox value={order.packageName} />
                  <View style={styles.box2}>
                    <View style={styles.flexItem}>
                      <InfoBox value={order.weight} />
                    </View>
                    <Text style={styles.currency}>KG</Text>
                    <View style={[styles.flexItem, styles.marginLeft]}>
                      <InfoBox value={formatPrice(order.priceOfItem)} />
                    </View>
                    <Text style={styles.currency}>VNĐ</Text>
                  </View>
                </View>
              ))}
            </View>
  
            {/* Lựa chọn dịch vụ */}
            <View className="service flex flex-col gap-3">
              <Text style={styles.tx1}>Dịch vụ</Text>
              
              <TouchableOpacity
                className="validService flex flex-col gap-2"
                onPress={handleOpenPopup}
              >
                <View
                  style={styles.shadow}
                  className="flex flex-row w-full h-[72px] rounded-xl bg-white"
                >
                  <View className="right bg-[#217865] w-[3%] h-full rounded-l-xl" />
                  <View className="right bg-[#fff] w-[97%] h-full rounded-r-xl p-3 flex flex-col justify-between">
                    <View className="title-bar flex flex-row justify-between">
                      <Text className="text-base text-basicBlack font-bold">
                        {selectedService ? selectedService.dservicesName : 'Hãy chọn dịch vụ'}
                      </Text>
                      <Text className="text-base text-basicBlack font-bold">
                        {selectedService ? formatPrice(calculatorFee(selectedService.dservicesPrice)) : ''} 
                      </Text>
                    </View>
                    <View className="timeline">
                      <Text className="text-xs">Thời gian dự kiến:  {selectedService ? selectedService.dservicesTime : 'Tùy dịch vụ'}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
  
           
          </View>
          <Wallet onSelectPayment={(method: React.SetStateAction<null>) => setSelectedPaymentMethod(method)} />
          {/* Thanh toán */}
          <View className="bottom-0">
            <ButtonFill onPress={SubmitAll}>
              <Text className="text-white text-xl font-bold">Thanh toán</Text>
            </ButtonFill>
          </View>
        </View>
      </ScrollView>
  
      {/* Modal */}
      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClosePopup}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popupContent}>

            <TouchableOpacity style={styles.dropic}  onPress={handleClosePopup}>
              <CancelIC />
            </TouchableOpacity>

            {service.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.itemservice}
                  onPress={() => {
                    setSelectedService(item); // Lưu dịch vụ đã chọn vào state
                    handleClosePopup(); // Mở popup
                  }}
                >
                  {getServiceIcon(item.dservicesId)}
                  <View style={styles.textservice}>
                    <View style={styles.row1}>
                      <Text style={styles.popupTitle}>{item.dservicesName}</Text>
                      <Text style={styles.popupTitle}>{formatPrice(calculatorFee(item.dservicesPrice))} đ</Text>
                    </View>
                    <Text>Thời gian dự kiến: {item.dservicesTime}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}

          </View>
        </View>
      </Modal>
     
      
    </>
  );
  
};


const styles = StyleSheet.create({
  shadow: {
    width: "100%",
    backgroundColor: "#767676",
    borderWidth: 0.5
  },
  tx1:{
    color: '#111111',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 12
  },
  box2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  flexItem: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  marginLeft: {
    marginLeft: 8,
  },
  currency: {
    fontSize: 12,
    color: "#495DC1",
    marginLeft: 5,
  },
  //modal
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    height: Dimensions.get("window").height * 0.390,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // padding: 24,
    paddingHorizontal: 24
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  dropic:{
    alignItems:'center',
    marginBottom: 12
  },
  itemservice:{
    flexDirection:'row',
    alignItems:'center',
    // backgroundColor:'#ffff00',
    paddingVertical: 8
  },
  textservice:{
    flexDirection:'column',
    marginLeft: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  row1:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tx2:{
    fontSize: 16,
    fontWeight: 'medium',
    paddingVertical: 12
  }
});

export default ServiceStep;
