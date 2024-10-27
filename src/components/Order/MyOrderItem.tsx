import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../App";

// Define types for props and the fetched data
interface OrderItemProps {
  phone: string;
  currentPage: string;
}

interface Promotion {
  Order_ID: string,
  Receiver_Phone: number,
  Receiver_Name: string,
  Receiver_Address: string,
  Order_Note: string,
  Order_COD: number,
  Order_TotalPrice: number,
  Order_Type: string,
  Order_Status: string,
  Services_ID: string,
  Voucher_ID: string,
  Payment_ID: string,
  Cus_ID: string,
  Driver_ID: string,
}

const MyOrderItem: React.FC<OrderItemProps> = ({ phone,currentPage }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://tpexpress.ddns.net:3000/api/order?status=${currentPage}`);
        const messagesData: Promotion[] = await response.json();
        setPromotions(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      {promotions.slice().reverse().map((item, index)=> (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          // onPress={() => navigation.navigate('OrderDetail')}
        >
          <TouchableOpacity style={styles.boxorder}  
            onPress={() => navigation.navigate('OrderDetail', { item})} 
            >
            <View style={styles.headerContainer}>
              <Text style={styles.head1}>{item.Order_ID}</Text>
              <TouchableOpacity>
                <Text style={styles.detail}>Chi tiết</Text>
              </TouchableOpacity>
            </View>
              <Text style={styles.info1}>{item.Order_Note}</Text>
            <View style={styles.totalContainer}>
              <Text style={styles.head2}>Tổng:</Text>
              <Text style={styles.money}>{formatPrice(item.Order_TotalPrice)} đ</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxorder:{
    padding: 16
  },
  info1:{
     fontSize: 18,
     fontWeight:'regular',
     color:'#767676',
     paddingVertical: 8
  },
  detail:{
     color:'#767676',
     fontSize: 14,
     fontWeight:'medium'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
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
  money:{
    color:'#F44336',
    fontSize: 20,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
});

export default MyOrderItem;


