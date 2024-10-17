import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";

interface OrderItemProps {
  status?: string;
  phone: string;
}

interface Promotion {
  Code: string;
  Status: string;
  Detail: string;
  ReceiverName: string;
  SDT: string;
  Address: string;
  Note: string;
  Price: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ status }) => {
  const navigation = useNavigation();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/order`);
      const allOrders: Promotion[] = await response.json();

      const filteredOrders = status
        ? allOrders.filter((order) => order.Status === status)
        : allOrders.filter((order) => order.Status !== "Chờ vận chuyển");

      setPromotions(filteredOrders);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const renderItem = ({ item }: { item: Promotion }) => (
    <TouchableOpacity key={item.Code} activeOpacity={1} style={styles.container}>
      <View style={styles.shadow}>
        <View style={styles.headerContainer}>
          <Text style={styles.head1}>{item.Code}</Text>
          <Text style={[styles.status, { color: getStatusColor(item.Status) }]}>
            {item.Status}
          </Text>
        </View>

        <View style={styles.line} />

        <View style={styles.headerContainer}>
          <View style={styles.roworder}>
            <Text style={styles.info}>Tên hàng:</Text>
            <Text style={styles.info1}>{item.Detail}</Text>
          </View>
          <View style={styles.roworder}>
            <Text style={styles.info}>Người nhận:</Text>
            <Text style={styles.info1}>{item.ReceiverName}</Text>
          </View>
          <View style={styles.roworder}>
            <Text style={styles.info}>Số điện thoại:</Text>
            <Text style={styles.info1}>{item.SDT}</Text>
          </View>
          <View style={styles.roworder}>
            <Text style={styles.info}>Địa chỉ:</Text>
            <Text style={styles.info1}>{item.Address}</Text>
          </View>
          <View style={styles.roworder}>
            <Text style={styles.info}>Note:</Text>
            <Text style={styles.info1}>{item.Note}</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.totalContainer}>
          <Text style={styles.head2}>Tổng:</Text>
          <Text style={styles.head2}>{formatPrice(item.Price)} đ</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const getStatusColor = (status: string) => {
    if (status === "Đã hủy") return "#F44336";
    if (status === "Đang vận chuyển") return "#F9801D";
    return "#03A63C";
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.all}>
          <ActivityIndicator size="large" color="#03A63C" />
        </View>
      ) : (
        <FlatList
          data={promotions}
          keyExtractor={(item) => item.Code}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 24,
    marginBottom: 16,
  },
  all: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "column",
  },
  head1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  head2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1c1c1c",
  },
  status: {
    fontSize: 16,
    paddingVertical: 4,
  },
  info: {
    fontSize: 18,
    color: "#1c1c1c",
    marginRight: 8,
  },
  info1: {
    color: "#767676",
    fontSize: 18,
  },
  line: {
    width: "100%",
    height: 1,
    marginVertical: 8,
    backgroundColor: "#d9d9d9",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  roworder: {
    flexDirection: "row",
    paddingVertical: 4,
  },
});

export default OrderItem;
