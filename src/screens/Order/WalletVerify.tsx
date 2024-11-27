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
  const { id, email } = route.params || {};

  const totalPrice = route.params?.totalPrice;
  const orderItems = route.params?.items;

  useEffect(() => {
    if (orderItems) {
      setItems(orderItems);
    }
  }, [orderItems]);


  const onMessage = (event) => {
    try {
      const dataFromWeb = JSON.parse(event.nativeEvent.data); // Parse dữ liệu từ chuỗi JSON
      console.log("Dữ liệu nhận từ web:", dataFromWeb);

      // Lưu dữ liệu vào state nếu cần
      setValueFromWeb(dataFromWeb);


      navigation.navigate("SuccessStep", {
        idW: dataFromWeb.id,
        status: dataFromWeb.status,
        money: dataFromWeb.money,
        email,
        id
      });
    } catch (error) {
      console.error("Lỗi khi parse dữ liệu từ web:", error);
    }
  };


  useEffect(() => {
    if (route.params?.webData) {
      setValueFromWeb(route.params.webData);
    }
  }, [route.params?.webData]);

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>   {id}</Text> */}
      {valueFromWeb && (  // Kiểm tra nếu valueFromWeb có giá trị thì hiển thị
        <View style={styles.dataContainer}>
          <Text style={styles.txt}>Dữ liệu từ Web:</Text>
          <Text>ID đơn hàng: {valueFromWeb.id}</Text>
          <Text>Trạng thái: {valueFromWeb.status}</Text>
          <Text>Số tiền: {valueFromWeb.money}</Text>
        </View>
      )}
      <WebView
        source={{ uri: url }}
        injectedJavaScript={`window.totalPrice = ${totalPrice}; window.items = ${JSON.stringify(items)}`}
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
