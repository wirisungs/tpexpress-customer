import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const WalletStatus = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { id,item } = route.params || {}; // Nhận `id` từ màn hình trước đó
  const [url] = useState("http://tpexpress.ddns.net:4000/walletStatus");
  const [valueFromWeb, setValueFromWeb] = useState(null);


  const onMessage = (event) => {
    try {
      const dataFromWeb = JSON.parse(event.nativeEvent.data); // Parse dữ liệu từ chuỗi JSON
      console.log("Dữ liệu nhận từ web:", dataFromWeb);

      // Lưu dữ liệu vào state nếu cần
      setValueFromWeb(dataFromWeb);
      navigation.navigate("OrderDetail", {
        item:item,
        statusW: dataFromWeb,
      });
    } catch (error) {
      console.error("Lỗi khi parse dữ liệu từ web:", error);
    }
  };


  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={styles.tx}>ID: {valueFromWeb}</Text> */}
      
      <WebView
        source={{ uri: url }}
        injectedJavaScript={`
          window.id = ${JSON.stringify(id)}; // Gửi id vào web
          true; // Cần trả về true để injectedJavaScript hoạt động
        `}
        onMessage={onMessage} // Lắng nghe phản hồi từ web
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tx: {
    marginTop: 60,
    marginLeft: 50,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default WalletStatus;
