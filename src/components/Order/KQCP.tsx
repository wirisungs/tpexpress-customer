import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Dimensions, Modal } from "react-native";
import BasicHeader from "../../components/Layouts/Headers";
import InfoBox, { ChooseInfoBox } from "../../components/Box/InfoBox";
import MoreIC from "../../svg/MTri/MoreIC";
import CancelIC from "../../svg/DucTri/Icons/Order/Drop";
import GHTKIC from "../../svg/DucTri/Icons/Order/GHTK";
import GHNIC from "../../svg/DucTri/Icons/Order/GHN";
import GHTLIC from "../../svg/DucTri/Icons/Order/GHTL";
import THGHIC from "../../svg/DucTri/Icons/Order/TPGH";
//pay
import CashIC from "../../svg/DucTri/Icons/Order/cash";
import AtmIC from "../../svg/DucTri/Icons/Order/atm";
import MomoIC from "../../svg/DucTri/Icons/Order/momo";
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
  const [payment, setPayment] = useState([]);
  //popup dịch vụ
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const handleOpenPopup = () => setPopupVisible(true);
  const handleClosePopup = () => setPopupVisible(false);

  const {
    orders = null,
    COD = null,
    fragileInput = null,
    distance = null,
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
        <BasicHeader haveBackIcon={true} title="Kết quả" />
  
        {/* Body */}
        <View className="body flex flex-col p-6 gap-8">
          <View className="content flex flex-col gap-6">
  
            {/* Lựa chọn dịch vụ */}
            <View className="service flex flex-col gap-3">
              <Text style={styles.tx1}>Dịch vụ {distance}</Text>
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
                      <Text style={styles.popupTitle}>{formatPrice(calculatorFee(item.dservicesPrice))}đ</Text>
                    </View>
                    <Text>Thời gian dự kiến: {item.dservicesTime}</Text>
                  </View>
                </TouchableOpacity>
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

export default KQCP;
