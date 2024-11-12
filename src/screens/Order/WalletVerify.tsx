import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { WebView } from 'react-native-webview';
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const WalletVerify = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute(); 
  const [url, setUrl] = useState("http://tpexpress.ddns.net:4000/verifywallet");
  const [items, setItems] = useState([]);
  const [valueFromWeb, setValueFromWeb] = useState(null); // State để lưu dữ liệu từ WebView
  
  const totalPrice = route.params?.totalPrice;
  const orderItems = route.params?.items; // Get items from params

  useEffect(() => {
    if (orderItems) {
      setItems(orderItems); // Set items data when available
    }
  }, [orderItems]);

  const onMessage = (event) => {
    const dataFromWeb = event.nativeEvent.data;
    console.log("Dữ liệu nhận từ web:", dataFromWeb);
    
    // Lưu dữ liệu vào state và hiển thị trên màn hình
    setValueFromWeb(dataFromWeb);

    // Quay lại màn hình hiện tại và hiển thị dữ liệu
    navigation.navigate("SuccessStep", { webData: dataFromWeb });
  };

  useEffect(() => {
    // Nếu có dữ liệu được gửi về từ trang web, cập nhật state để hiển thị
    if (route.params?.webData) {
      setValueFromWeb(route.params.webData);
    }
  }, [route.params?.webData]);

  return (
    <View style={{ flex: 1 }}>
      {/* Hiển thị dữ liệu nhận từ WebView */}
      {valueFromWeb && (
        <View style={styles.dataContainer}>
          <Text style={styles.txt}>Dữ liệu nhận từ web: {valueFromWeb}</Text>
        </View>
      )}
      
      <WebView
        source={{ uri: url }}
        injectedJavaScript={`window.totalPrice = ${totalPrice}; window.items = ${JSON.stringify(items)};`}
        onMessage={onMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    padding: 20,
  },
  txt: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default WalletVerify;
