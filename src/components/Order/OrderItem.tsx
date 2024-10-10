import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// Define types for props and the fetched data
interface OrderItemProps {
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

const OrderItem: React.FC<OrderItemProps> = ({ phone }) => {
  const navigation = useNavigation();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://172.20.10.2:3000/api/order`);
        const messagesData: Promotion[] = await response.json();
        setPromotions(messagesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [phone]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View>
      {promotions.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
        >
          <View style={[styles.container, styles.shadow]}>
            <View style={styles.headerContainer}>
              <Text style={styles.head1}>{item.Code}</Text>
              <Text style={styles.status}>{item.Status}</Text>
            </View>

            <View style={styles.line} />
 
            <View style={styles.headerContainer}>
              <View>

              </View>
              
              <Text style={styles.info}>Tên hàng:</Text>
              <Text style={styles.info1}>{item.Detail}</Text>
              <Text style={styles.info}>Người nhận:</Text>
              <Text style={styles.info1}>{item.ReceiverName}</Text>
              <Text style={styles.info}>Số điện thoại:</Text>
              <Text style={styles.info1}>{item.SDT}</Text>
              <Text style={styles.info}>Địa chỉ:</Text>
              <Text style={styles.info1}>{item.Address}</Text>
              <Text style={styles.info}>Note:</Text>
              <Text style={styles.info1}>{item.Note}</Text>
            </View>
          
            
            

            <View style={styles.line} />

            <View style={styles.totalContainer}>
              <Text style={styles.head2}>Tổng:</Text>
              <Text style={styles.head2}>{formatPrice(item.Price)} vnđ</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
    padding: 16,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 24,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'column',
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
    color: "#03A63C",
  },
  info: {
    fontSize: 18,
    color: "#1c1c1c",
  },
  info1:{
    color:'#767676',
    fontSize: 18
  },
  line: {
    width: '100%',
    height: 1,
    marginVertical: 8,
    backgroundColor: '#d9d9d9',
  },
  totalContainer: {
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default OrderItem;


