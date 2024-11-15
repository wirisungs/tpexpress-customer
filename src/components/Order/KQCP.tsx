import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Dimensions, Modal } from "react-native";
import BasicHeader from "../../components/Layouts/Headers";
import GHTKIC from "../../svg/DucTri/Icons/Order/GHTK";
import GHNIC from "../../svg/DucTri/Icons/Order/GHN";
import GHTLIC from "../../svg/DucTri/Icons/Order/GHTL";
import THGHIC from "../../svg/DucTri/Icons/Order/TPGH";
//pay
import ButtonFill from "../../components/Buttons/Buttons";
import {
  CommonActions,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const KQCP = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const Route = useRoute<RouteProp<RootStackParamList, "ServiceOrder">>();
  const [service, setService] = useState([]);
  //popup dịch vụ
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleOpenPopup = () => setPopupVisible(true);
  const handleClosePopup = () => setPopupVisible(false);

  const {
    orders = [],
    COD = 0,
    fragileInput = false,
    distance = 0,
  } = Route.params || {};

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

  const calculatorFee = (servicePrice: number) => {
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
        // className="flex flex-col h-full bg-grayBG-FCFCFC"
        // showsVerticalScrollIndicator={false}
      
      >
        {/* Header */}
        <BasicHeader haveBackIcon={true} title="Kết quả" />
  
        {/* Body */}
        <View className="body flex flex-col p-6 gap-8">
          <View className="content flex flex-col gap-6">
  
            {/* Lựa chọn dịch vụ */}
            <View className="service flex flex-col gap-3">
              <Text style={styles.tx1}>Dịch vụ </Text>
              {service.map((item, index) => (
                <View key={index}>
                  <View
                    style={styles.itemservice}  
                  >
                    {getServiceIcon(item.dservicesId)}
                    <View style={styles.textservice}>
                      <View style={styles.row1}>
                        <Text style={styles.popupTitle}>{item.dservicesName} </Text>
                        <Text style={styles.popupTitle}>{formatPrice(calculatorFee(item.dservicesPrice))}đ</Text>
                      </View>
                      <Text>Thời gian dự kiến: {item.dservicesTime}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <Text>Lưu ý</Text>
              <View>
                <Text>Giao hàng tên lửa & Thiên Phúc giao hàng chỉ áp dụng nội thành</Text>
                <Text>Thiên Phúc giao hàng sẽ tăng thêm 30.000đ nếu giao từ thời gian 00:00 - 05:00</Text>
              </View>
            </View>
          </View>
  
          <View className="bottom-0">
            <ButtonFill onPress={() => navigation.navigate('HomePage')}>
              <Text className="text-white text-xl font-bold">Trở về</Text>
            </ButtonFill>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  tx1: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemservice: {
    flexDirection: "row",
    alignItems: "center",
  },
  textservice: {
    marginLeft: 10,
    flex: 1,
    marginVertical: 12
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1
    
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default KQCP;
