import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';  // Thêm import cho ImagePicker
import { CommonActions, NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import SearchIC from '../../svg/DucTri/Icons/HomeIcon/Search'
import { TransHeader } from "../../components/Layouts/Headers";
import { InputWithIcon } from "../../components/Inputs/Inputs";
import RequestIC from "../../svg/DucTri/Icons/Order/InputRequest"
import ButtonFill from "../../components/Buttons/Buttons";
import * as FileSystem from 'expo-file-system';

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
  const [imageUri, setImageUri] = useState<string | null>(null);
  const route = useRoute<UserInfoRouteProp>();
  const { customerData, type } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);

  // Request permissions to access media library
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'You need to allow access to the media library.');
      }
    };
    requestPermissions();
  }, []);

  const handleSearch = async () => {
    setLoading(true); // Start loading data
    try {
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/ordersearch?orderID=${orderID.trim()}&cusId=${customerData.cusId.trim()}`);
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
      setLoading(false); // End loading
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
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);  // Update state with the selected image URI
    }
  };

  const handleSubmitIMG = async (imageUrl) => {
    setIsLoading(true);
    try {
      // Tải ảnh từ URL file:// và chuyển thành base64
      const fileUri = imageUrl;
      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,  // Đọc file dưới dạng base64
      });
  
      // Tạo đối tượng FormData để gửi ảnh lên Cloudinary
      const formData = new FormData();
      formData.append('file', `data:image/png;base64,${fileData}`);  // Đưa ảnh base64 vào formData
      formData.append('upload_preset', 'blueduck');  // Upload preset
      formData.append('cloud_name', 'dcdaz0dzb');  // Cloud name
  
      // Gửi ảnh lên Cloudinary
      const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dcdaz0dzb/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const cloudinaryData = await cloudinaryResponse.json();
      console.log('Cloudinary Response:', cloudinaryData);  // Log phản hồi từ Cloudinary
  
      if (!cloudinaryResponse.ok) {
        throw new Error(cloudinaryData.error.message || 'Image upload failed');
      }
  
      const uploadedImageUrl = cloudinaryData.secure_url || cloudinaryData.url;  // Lấy URL ảnh đã upload
      console.log('Uploaded Image URL:', uploadedImageUrl);  // In ra URL ảnh đã upload
  
      return uploadedImageUrl;  // Trả về URL của ảnh đã upload
    } catch (error) {
      console.error('Lỗi trong quá trình upload ảnh:', error);
      throw new Error('There was an issue uploading the image');
    }finally {
      setIsLoading(false); // Kết thúc loading
    }
  };
  
  const handleSubmit = async () => {
    if (!foundOrderId) {
      return;
    }
    if (!imageUri) {
      return;
    }
  
    try {
      // Gọi hàm upload ảnh
      const uploadedImageUrl = await handleSubmitIMG(imageUri);  // Gọi đúng hàm upload ảnh
  
      const orderDate = getCurrentDate();
  
      // Gửi dữ liệu đến API của bạn
      const apiResponse = await fetch('http://tpexpress.ddns.net:3000/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Request_ID: newRequestID,
          Cus_ID: customerData.cusId,
          Order_ID: foundOrderId,
          Request_Picture: uploadedImageUrl,  // Sử dụng URL ảnh đã upload
          Request_Status: 'Pending',
          Request_Date: orderDate,
          Request_Type: type,
          Driver_ID: null,
        }),
      });
  
      const result = await apiResponse.json();
      console.log('API Response:', result);  // Log phản hồi API
      if (apiResponse.ok) {
        navigation.navigate('HomePage');
      } else {
        Alert.alert('Error', result.error || 'There was an issue submitting your request');
      }
    } catch (error) {
      console.error('Error while submitting request:', error);
      Alert.alert('Error', error.message || 'There was an issue uploading the image');
    }
  };
  


  return (
    <ScrollView style={styles.container}>
      <TransHeader haveBackIcon={true} title="Gửi yêu cầu" />
      {isLoading && (
        <View style={styles.load}>
          <ActivityIndicator size="large" color="#495DC1" />
          <Text style={styles.txtload}>Vui lòng đợi...</Text>
        </View>
      )}
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
        {foundOrderId ? (
          <Text style={styles.madon}>
            Mã đơn hàng của bạn là:
            <Text style={styles.madon2}> {foundOrderId}</Text>
          </Text>
        ) : (
          <Text style={styles.madon2}>Vui lòng nhập mã đơn hàng</Text>
        )}

        {!imageUri && (
          <>
            <Text style={styles.txt}>Hình ảnh & video đính kèm</Text>
            <Text style={styles.madon2}>Vui lòng thêm hình ảnh/video đơn hàng</Text>
          </>
        )}
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
          <Text className="text-white text-xl font-bold">Gửi yêu cầu</Text>
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
  viewimg: {
    flexDirection: 'row',
    //  justifyContent:'space-between'
  },
  selectedImage: {
    width: 101,
    height: 101,
    marginLeft: 12,
    resizeMode: 'contain',
  },
  load: {
    position: 'absolute',
    top: '68%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 8,
    width: 100, 
    height: 100,
  },
  txtload:{
    textAlign: 'center',
  }
});

export default OrderRequest;
