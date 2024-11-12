import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import { useRoute } from "@react-navigation/native";
import CopyIC from "../../svg/DucTri/Icons/Order/Copy";
import BoxIC from "../../svg/DucTri/Icons/Order/Box";
import CarIC from "../../svg/DucTri/Icons/Order/Car";
import HomeIC from "../../svg/DucTri/Icons/Order/Home";
import LineDoneIC from "../../svg/DucTri/Icons/Order/LineDone";
import LineGrayIC from "../../svg/DucTri/Icons/Order/LineGray";
import Bill from "../../components/Order/Bill";
import Info_Order from "../../components/Order/Info_Order";
import * as Clipboard from "expo-clipboard";

const OrderDetail: React.FC = () => {
  const route = useRoute();
  const { item } = route.params as { item: any };

  const copyOrderID = () => {
    Clipboard.setString(item.Order_ID);
    Alert.alert("Thông báo", "Mã đơn hàng đã được sao chép!");
  };

  const LineIcons = ({ status }: { status: string }) => (
    <View style={styles.linestatus}>
      {status === "1" ? (
        <>
          <LineDoneIC />
          <LineDoneIC />
        </>
      ) : status === "2" ? (
        <>
          <LineDoneIC />
          <LineGrayIC />
        </>
      ) : status === "3" ? (
        <>
          <LineGrayIC />
          <LineGrayIC />
        </>
      ) : null}
    </View>
  );


  const renderOrderInfo = () => (
    <View style={styles.row1}>
      <View style={styles.row11}>
        <Text style={styles.orderCode}>{item.orderId}</Text>
        <TouchableOpacity onPress={copyOrderID}>
          <CopyIC />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.xemthem}>Xem thêm</Text>
      </TouchableOpacity>
    </View>
  );
  

  const renderStatus = () => {
    // Xác định màu sắc dựa trên trạng thái của order
    const boxColor = (item.orderStatusId === "ST001" || item.orderStatusId === "ST002" || item.orderStatusId === "ST003") ? "#2FA087" : "#767676";
    const carColor = (item.orderStatusId === "ST002" || item.orderStatusId === "ST003") ? "#2FA087" : "#767676";
    const homeColor = item.orderStatusId === "ST003" ? "#2FA087" : "#767676";

    return (
      <View style={styles.statusic}>
        <View style={styles.boxstatus}>
          <BoxIC color={boxColor} />
          <Text style={styles.textstatus}>Chờ vận chuyển</Text>
        </View>
        <LineIcons status={item.orderStatusId === "ST001" ? "2" : item.orderStatusId === "ST002"? "1": item.orderStatusId === "ST003"? "1": "3"} />
        <View style={styles.boxstatus}>
          <CarIC color={carColor} />
          <Text style={styles.textstatus}>Đang vận chuyển</Text>
        </View>
        <LineIcons
          status={item.orderStatusId === "ST002"? "2": item.orderStatusId === "ST003"? "1": "3"}
        />
        <View style={styles.boxstatus}>
          <HomeIC color={homeColor} />
          <Text style={styles.textstatus}>Nhận hàng</Text>
        </View>
      </View>
    );
  };


  // Dùng useMemo để tránh render lại không cần thiết
  const data = useMemo(
    () => [
      { key: "order-info", content: renderOrderInfo },
      { key: "status", content: renderStatus },
      { key: "info-order", content: () => <Info_Order item={item} /> },
      { key: "bill", content: () => <Bill item={item} /> },
    ],
    [item]
  );

  const renderItem = ({ item }: { item: { content: () => JSX.Element } }) => (
    <>{item.content()}</>
  );

  return (
    <View style={styles.container}>
      <TransHeader haveBackIcon={true} title="Chi tiết" />
     
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scro}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scro: {
    padding: 24,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row11: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderCode: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  xemthem: {
    color: "#767676",
    fontSize: 14,
    fontWeight: "500",
  },
  statusic: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  linestatus: {
    flexDirection: "row",
    marginTop: 8,
  },
  boxstatus: {
    width: 76,
    alignItems: "center",
  },
  textstatus: {
    fontSize: 12,
    marginVertical: 8,
    textAlign: "center",
    fontWeight: "400",
  },
});

export default OrderDetail;
