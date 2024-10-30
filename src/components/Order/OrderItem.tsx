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
  orderId: string;
  orderStatusId: string;
  receiverName: string;
  receiverPhone: number;
  receiverAddress: string;
  orderNote: string;
  totalPrice: number;
}

interface Status {
  statusId: string;
  statusName: string;
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
      const statusMap = new Map(statuses.map(({ statusId, statusName }) => [statusId, statusName]));
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
        ? allOrders.filter((order) => order.orderStatusId === status)
        : allOrders.filter((order) => order.orderStatusId !== "ST001");
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
    const statusName = statusCache.get(item.orderStatusId) || "Unknown";

    return (
      <TouchableOpacity key={item.orderId} activeOpacity={1} style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.headerContainer}>
            <Text style={styles.head1}>{item.orderId}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.orderStatusId) }]}>
              {statusName}
            </Text>
          </View>

          <View style={styles.line} />

          <View style={styles.headerContainer}>
            <View style={styles.roworder}>
              <Text style={styles.info}>Người nhận:</Text>
              <Text style={styles.info1}>{item.receiverName}</Text>
            </View>
            <View style={styles.roworder}>
              <Text style={styles.info}>Số điện thoại:</Text>
              <Text style={styles.info1}>{item.receiverPhone}</Text>
            </View>
            <View style={styles.roworder}>
              <Text style={styles.info}>Địa chỉ:</Text>
              <Text style={styles.info1}>{item.receiverAddress}</Text>
            </View>
            <View style={styles.roworder}>
              <Text style={styles.info}>Note:</Text>
              <Text style={styles.info1}>{item.orderNote}</Text>
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.totalContainer}>
            <Text style={styles.head2}>Tổng:</Text>
            <Text style={styles.head2}>{formatPrice(item.totalPrice)} đ</Text>
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
          keyExtractor={(item) => item.orderId}
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
