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

interface Promotion {
  Order_ID: string;
  Status_ID: string;
  Receiver_Name: string;
  Receiver_Phone: number;
  Receiver_Address: string;
  Order_Note: string;
  Order_TotalPrice: number;
}

interface Status {
  Status_ID: string;
  Status_Name: string;
}

const OrderItem: React.FC<{ status?: string }> = ({ status }) => {
  const navigation = useNavigation();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusCache, setStatusCache] = useState<Map<string, string>>(new Map());

  const fetchStatuses = useCallback(async () => {
    try {
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/status`);
      const statuses: Status[] = await response.json();
      const statusMap = new Map(statuses.map(({ Status_ID, Status_Name }) => [Status_ID, Status_Name]));
      setStatusCache(statusMap);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/order`);
      const allOrders: Promotion[] = await response.json();
      const filteredOrders = status
        ? allOrders.filter((order) => order.Status_ID === status)
        : allOrders.filter((order) => order.Status_ID !== "ST001");
      setPromotions(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }, [fetchOrders]);

  useEffect(() => {
    const initializeData = async () => {
      await fetchStatuses();
      await fetchOrders();
    };
    initializeData();
  }, [fetchStatuses, fetchOrders]);

  const RenderOrderItem: React.FC<{ item: Promotion }> = ({ item }) => {
    const statusName = statusCache.get(item.Status_ID) || "Unknown";

    return (
      <TouchableOpacity key={item.Order_ID} activeOpacity={1} style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.headerContainer}>
            <Text style={styles.head1}>{item.Order_ID}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.Status_ID) }]}>
              {statusName}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.headerContainer}>
            <View style={styles.roworder}>
              <Text style={styles.info}>Người nhận:</Text>
              <Text style={styles.info1}>{item.Receiver_Name}</Text>
            </View>
            <View style={styles.roworder}>
              <Text style={styles.info}>Số điện thoại:</Text>
              <Text style={styles.info1}>{item.Receiver_Phone}</Text>
            </View>
            <View style={styles.roworder}>
              <Text style={styles.info}>Địa chỉ:</Text>
              <Text style={styles.info1}>{item.Receiver_Address}</Text>
            </View>
            <View style={styles.roworder}>
              <Text style={styles.info}>Note:</Text>
              <Text style={styles.info1}>{item.Order_Note}</Text>
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.totalContainer}>
            <Text style={styles.head2}>Tổng:</Text>
            <Text style={styles.head2}>{formatPrice(item.Order_TotalPrice)} đ</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const getStatusColor = (status: string) => {
    if (status === "ST004") return "#F44336";
    if (status === "ST002") return "#F9801D";
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
          keyExtractor={(item) => item.Order_ID}
          renderItem={({ item }) => <RenderOrderItem item={item} />}
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
