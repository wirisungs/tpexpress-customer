import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CommonActions, NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verify = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);

  const route = useRoute();
  const valueFromWeb = route.params?.value;

  useEffect(() => {
    if (valueFromWeb) {
      try {
        const decoded = jwtDecode(valueFromWeb);
        setDecodedToken(decoded);
        AsyncStorage.setItem('decodedToken', JSON.stringify(decoded));
        
        // Kiểm tra email khi có token giải mã
        checkEmailExists(
          `${decoded.lastName} ${decoded.firstName}`,
          decoded.email,
          decoded.dob
        );
      } catch (error) {
        console.error("Không thể giải mã token:", error);
      }
    }
  }, [valueFromWeb]);

  const generateCusId = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Tạo số ngẫu nhiên 8 chữ số
    return `KH${randomNumber}`;
  };
  

  const checkEmailExists = async (name: string, email: string, birth: Date) => {
    try {
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/cusE?email=${email}`);
      const data = await response.json();
  
      if (data.exists) {
        setEmailExists(true);
        // Email đã tồn tại, chờ 3 giây rồi chuyển hướng sang HomePage
        setTimeout(() => {
          navigateToHomePage();
        }, 3000);
      } else {
        setEmailExists(false);
        // Email không tồn tại, tạo tài khoản và xác thực lại
        await createAccount({ 
          cusId: generateCusId(),
          name,
          email, 
          phone: '',
          address: '',
          birth,
          cusGender: 0
        });
        setEmailExists(true);
        // Sau khi tạo tài khoản, chờ 3 giây rồi chuyển hướng sang HomePage
        setTimeout(() => {
          navigateToHomePage();
        }, 3000);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra email:", error);
    }
  };
  

  const createAccount = async (userData: {cusId: string; name: string; email: string; phone: string; address: string; birth: Date, cusGender: number }) => {
    try {
      const response = await fetch("http://tpexpress.ddns.net:3000/api/cusE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Hiển thị thông báo thành công
      } else {
        const errorData = await response.json();
        console.error("Lỗi khi tạo tài khoản fe:", errorData.error);
      }
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản fe2:", error);
    }
  };

  const navigateToHomePage = async () => {
    try {
      // Lấy decoded token từ AsyncStorage
      const storedToken = await AsyncStorage.getItem('decodedToken');
      if (storedToken) {
        const decoded = JSON.parse(storedToken);
        // Kiểm tra nếu email tồn tại trong token giải mã
        if (decoded?.email) {
          console.log("Email:", decoded.email); // In email ra console
          navigation.navigate('HomePage', { email: decoded.email });
        } else {
          console.error("Email không tồn tại trong token giải mã");
        }
      } else {
        console.error("Không tìm thấy token trong AsyncStorage");
      }
    } catch (error) {
      console.error("Lỗi khi lấy token từ AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.noticeBox}>  
        <Text style={styles.successText}>THIEN PHUC EXPRESS </Text>
      </View>

      {decodedToken && (
        <View>
          <Text style={styles.emailText}>Thông tin giải mã: {decodedToken.firstName}</Text>
          <Text className="text-lg">Thông tin giải mã: {decodedToken.email}</Text>
          <Text className="text-m">{JSON.stringify(decodedToken, null, 2)}</Text>
          {emailExists !== null && (
            <Text style={styles.statusText}>
              {emailExists ? "Email đã tồn tại trong hệ thống" : "Đang tạo tài khoản mới..."}
            </Text>
          )}
        </View>
      )}
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
    justifyContent:'center',
  },
  successText: {
    color: '#EB455F',
    fontWeight:'bold',
    fontSize: 32
  },
  emailText: {
    fontSize: 18,
    marginVertical: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Verify;
