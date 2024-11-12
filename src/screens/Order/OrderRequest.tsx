import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';  // Thêm import cho ImagePicker
import { CommonActions, NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import SearchIC from '../../svg/DucTri/Icons/HomeIcon/Search'
import { TransHeader } from "../../components/Layouts/Headers";
import { InputWithIcon } from "../../components/Inputs/Inputs";
import RequestIC from "../../svg/DucTri/Icons/Order/InputRequest"
import ButtonFill from "../../components/Buttons/Buttons";

interface Promotion {
  orderId: string,
  receiverPhone: number,
  receiverName: string,
  receiverAddress: string,
  orderNote: string,
  orderCOD: number,
  totalPrice: number,
  orderType: string,
  orderStatusId: string,
  dservicesId: string,
  paymentId: string,
  cusId: string,
  driverId: string,
}
type UserInfoRouteProp = RouteProp<RootStackParamList, 'OrderRequest'>;
const OrderRequest = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [orderID, setOrderID] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundOrderId, setFoundOrderId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Để lưu trữ ảnh đã chọn
  const [imageUri, setImageUri] = useState<string | null>(null);
  const route = useRoute<UserInfoRouteProp>();
  const { customerData } = route.params || {};

  const handleSearch = async () => {
    setLoading(true); // Bắt đầu tải dữ liệu
    try {
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/ordersearch?orderID=${orderID.trim()}`);
      const data: Promotion[] = await response.json();

      if (data.length > 0) {
        setFoundOrderId(data[0].orderId);
        setOrderID('');
      } else {
        Alert.alert("Thông báo", "Không tìm thấy mã đơn hàng!");
        setFoundOrderId(null);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại!");
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  const newRequestID = generateRequestID();

  function generateRequestID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderID = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      orderID += chars[randomIndex];
    }
    return orderID;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Định dạng: YYYY-MM-DD
  };

  const handleSubmit = async () => {
    const orderDate = getCurrentDate();
    try {
      const response = await fetch('http://tpexpress.ddns.net:3000/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Request_ID: newRequestID,
          Cus_ID: customerData.cusId,
          Order_ID: foundOrderId,
          Request_Picture: imageUri,  // Truyền ảnh đã chọn
          Request_Status: 'Pending',
          Request_Date: orderDate,
          Request_Type: 'HBL',
          Driver_ID: null,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        navigation.navigate('HomePage')
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi gửi dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi dữ liệu.');
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);  // Cập nhật trạng thái với URI của ảnh đã chọn
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TransHeader haveBackIcon={true} title="Gửi yêu cầu" />
      <View style={styles.viewbox}>
        <Text style={styles.txt}>Nhập mã đơn hàng </Text>
        <Text style={styles.txtsmall}>Chú ý: Yêu cầu sẽ được phản hồi từ
          <Text style={styles.txtnoteR}> 3 - 7 ngày</Text> kể từ ngày gửi.
          <Text style={styles.txtnoteR}> Hoặc </Text>
          có thể đến trực tiếp bưu cục gần nhất để nhận được sự hỗ trợ nhanh nhất</Text>

        <InputWithIcon
          placeholder="Nhập mã đơn vận chuyển"
          inputType="default"
          icon={<SearchIC />}
          value={orderID}
          onChangeText={(text) => setOrderID(text.toUpperCase())}
          onIconPress={handleSearch}
          isBackground={true}
        />

        <Text style={styles.madon}>Mã đơn hàng của bạn là:
          {foundOrderId && (
            <Text style={styles.madon2}> {foundOrderId}</Text>
          )}
        </Text>

        <Text style={styles.txt}>Hình ảnh & video đính kèm</Text>
        <View style={styles.viewimg}>
          <TouchableOpacity onPress={handleImagePick}>
            <RequestIC />
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
          )}
     
          
        </View>
       
        <Text style={styles.txtnote}>Chú ý:
          <Text style={styles.txtnoteR}>Bắt buộc</Text> phải có
          <Text style={styles.txtnoteR}>video mở gói hàng</Text>
          để xác minh đối với những yêu cầu liên quan đến lỗi trong quá trình vận chuyển</Text>

        <ButtonFill onPress={handleSubmit}>
          <Text className="text-white text-xl font-bold">Hoàn tất</Text>
        </ButtonFill>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  viewbox: {
    padding: 24
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8
  },
  txtsmall: {
    fontSize: 12,
    color: '#767676',
    marginBottom: 14
  },
  txtnote: {
    fontSize: 12,
    color: '#111111',
    marginTop: 8,
    marginBottom: 14
  },
  txtnoteR: {
    fontSize: 12,
    color: '#F44336',
  },
  madon: {
    fontSize: 14,
    color: '#767676',
    marginVertical: 12
  },
  madon2: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: 'bold',
    marginVertical: 12
  },
  viewimg:{
   flexDirection:'row',
  //  justifyContent:'space-between'
  },
  selectedImage: {
    width: 101,
    height: 101,
    marginLeft: 12,
    resizeMode: 'contain',
  }
});

export default OrderRequest;
