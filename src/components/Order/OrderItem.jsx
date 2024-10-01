import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const OrderItem = ({phone}) => {
  const navigation = useNavigation();
  const [promotions, setPromotions] = useState([]);
  
  
  useEffect(() => {
    console.log('Phone:', phone); // Thêm dòng này để kiểm tra giá trị phone
    const fetchData = async () => {
      try {
        const response = await fetch(`http://blueduck.ddns.net:4001/api/order?email=${phone}`);
        const messagesData = await response.json();
        setPromotions(messagesData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
  //192.168.1.18
    fetchData();
  }, [phone]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <View>
      {promotions.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate("OrderDetail",{order:item})}
          key={index}
        >
          <View
            style={[styles.container, styles.shadow]}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.head1}>
                {item.Code}
              </Text>

              <Text style={styles.status}>
                {item.Status}
              </Text>
            </View>

            <View style={styles.line} />

            {/* Info */}
            <View style={styles.headerContainer}>
              <Text style={styles.info}>
                Tên hàng: {item.Detail}
              </Text>
              <Text style={styles.info}>
                Người nhận: {item.ReceiverName}
              </Text>
              <Text style={styles.info}>
                Số điện thoại: {item.SDT}
              </Text>
              <Text style={styles.info}>
                Địa chỉ: {item.Address}
              </Text>
              <Text style={styles.info}>
                Note: {item.Note}
              </Text>
              <Text style={styles.info}>
              </Text>
            </View>

            <View style={styles.line} />

            <View style={styles.totalContainer}>
              <Text style={styles.head2}>
                Tổng:
              </Text>
              <Text style={styles.head2}>
                {formatPrice(item.Price)} vnđ
              </Text>
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
    color: "#808080",
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
