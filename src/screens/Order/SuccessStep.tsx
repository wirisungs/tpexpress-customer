import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import SuccessIC from "../../svg/MTri/SuccessIC";
import ButtonFill from "../../components/Buttons/Buttons";
import { CommonActions, NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import * as Notifications from 'expo-notifications';

// Cấu hình xử lý thông báo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Hiển thị popup
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type UserInfoRouteProp = RouteProp<RootStackParamList, 'SuccessStep'>;

const SuccessStep = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [notifications, setNotifications] = useState([]);
  const route = useRoute<UserInfoRouteProp>();
  const { email,id,idW,status,money } = route.params || {};

  const newNofiID = generateNofiID();

  useEffect(() => {
    // Yêu cầu quyền gửi thông báo khi mở màn hình
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Ứng dụng cần quyền gửi thông báo.');
      }
    };

    requestPermissions();
    sendNotification(); 
    handleSubmit(newNofiID);
  }, []); // Hàm sẽ được gọi một lần khi component render lần đầu tiên

  // Tạo ID ngẫu nhiên cho thông báo
  function generateNofiID(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderID = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      orderID += chars[randomIndex];
    }
    return orderID;
  };

  // Lấy ngày hiện tại
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Định dạng: YYYY-MM-DD
  };

  // Gửi thông báo
  const sendNotification = async () => {
    try {
      console.log('Đang gửi thông báo...');
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Đơn hàng đã tạo thành công",
          body: `Đơn hàng của bạn sẽ được vận chuyển trong thời gian sớm nhất`,
        },
        trigger: { seconds: 1 },
      });
      console.log('Thông báo đã được gửi!');
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi thông báo qua Expo.');
    }
  };

  // Xử lý submit thông báo lên server
  const handleSubmit = async (newNofiID) => {
    const orderDate = getCurrentDate();
    try {
      const response = await fetch('http://tpexpress.ddns.net:3000/api/Nofi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nofiId: newNofiID,
          nofiTitle: 'Đơn hàng tạo thành công',
          nofiContent: `Đơn hàng ${id} của bạn sẽ được vận chuyển trong thời gian sớm nhất`,
          nofiType: 'Order',
          nofiTime: orderDate,
          cusId: email?.cusId, // Tránh lỗi nếu email là undefined
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return true;
      } else {
        Alert.alert('Lỗis', result.error || 'Có lỗi xảy ra khi gửi dữ liệu.');
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi dữ liệu.');
      return false;
    }
  };

  // Xử lý khi nhấn nút hoàn tất
  const handleOnClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      })
    );
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://tpexpress.ddns.net:3000/api/orderW/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            statusWallet: status,
            idWallet: idW,
            totalPrice: money
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        handleOnClick();
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi cập nhật dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật dữ liệu.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.noticeBox}>
        <SuccessIC />
        <Text style={styles.successText}>Hoàn tất đặt hàng</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonFill onPress={handleUpdate}>
          <Text className="text-white text-xl font-bold">Hoàn tất</Text>
        </ButtonFill>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  noticeBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: 128,
  },
  successText: {
    color: '#5DC061',
    fontWeight: 'bold',
    fontSize: 32,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});

export default SuccessStep;
