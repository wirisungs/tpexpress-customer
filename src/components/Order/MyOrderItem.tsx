import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../App";
import OderE from "../../svg/DucTri/Icons/Order/oderempty"

// Define types for props and the fetched data
interface OrderItemProps {
  phone: string;
  currentPage: string;
}

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

const MyOrderItem: React.FC<OrderItemProps> = ({ phone, currentPage }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { cus } = route.params as { cus: any };

  const fetchOrders = useCallback(async () => {
    try {
      // setLoading(true);
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/order`);
      const allOrders = await response.json();

      const filteredOrders = allOrders.filter((order) => {
        const matchesStatus = currentPage ? order.orderStatusId === currentPage : true;
        const matchesCusId = cus.cusId ? order.cusId === cus.cusId : true;
        return matchesStatus && matchesCusId;
      });

      setPromotions(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [currentPage, cus.cusId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);



  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      {promotions.length === 0 ? (
        // Hiển thị View trống khi không có đơn
        <View style={styles.empty}>
          <OderE />
          <Text style={styles.txtempty}>Bạn không có đơn nào</Text>
        </View>
      ) : (
        // Hiển thị danh sách đơn hàng nếu có
        promotions.slice().reverse().map((item, index) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
          >
            <TouchableOpacity style={styles.boxorder}
              onPress={() => navigation.navigate('OrderDetail', { item })}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.head1}>{item.orderId}</Text>
                <TouchableOpacity>
                  <Text style={styles.detail}>Chi tiết</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.info1}>{item.orderNote}</Text>
              <View style={styles.totalContainer}>
                <Text style={styles.head2}>Tổng:</Text>
                <Text style={styles.money}>{formatPrice(item.totalPrice)} đ</Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //backgroundColor:'#ffff00'
  },
  empty: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 150
    // backgroundColor:'#ffff00'
  },
  txtempty: {
    color: '#2FA087',
    fontSize: 18,
    fontWeight:'medium',
    margin: 8
  },
  boxorder: {
    padding: 16
  },
  info1: {
    fontSize: 18,
    fontWeight: 'regular',
    color: '#767676',
    paddingVertical: 8
  },
  detail: {
    color: '#767676',
    fontSize: 14,
    fontWeight: 'medium'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  head1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  head2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  money: {
    color: '#F44336',
    fontSize: 20,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default MyOrderItem;


