
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,TextInput, Alert } from "react-native";
// import SearchBar from "../Home/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { InputWithIcon } from "../Inputs/Inputs";
import SearchIC from '../../svg/DucTri/Icons/HomeIcon/Search'


interface HeaderProps {
  screenName: string;
  activeSender: boolean;
  setActiveSender: (value: boolean) => void;
  email: string
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

const Header: React.FC<HeaderProps> = ({ screenName, activeSender, setActiveSender,email }) => {
  const navigation = useNavigation();
  const [orderID, setOrderID] = useState('');
  const [loading, setLoading] = useState(false);

  const setActiveSenderTrue = () => {
    setActiveSender(true);
  };

  const setActiveSenderFalse = () => {
    setActiveSender(false);
  };

  const handleSearch = async () => {
    setLoading(true); // Bắt đầu tải dữ liệu
    try {
      const response = await fetch(`http://tpexpress.ddns.net:3000/api/ordersearch?orderID=${orderID.trim()}&cusId=${email.cusId.trim()}`);
      const data: Promotion[] = await response.json();

      if (data.length > 0) {
        // Nếu tìm thấy đơn hàng, chuyển đến màn hình OrderDetail
        navigation.navigate('OrderDetail', { item: data[0] });
      } else {
        Alert.alert("Thông báo", "Không tìm thấy mã đơn hàng!");
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại!");
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>     
          <Text style={styles.title}>{screenName}</Text>
      </View>
    
      <View style={styles.viewsearch}>
        <InputWithIcon
          placeholder="Nhập mã đơn vận chuyển"
          inputType="default"
          icon={<SearchIC />}
          value={orderID}
          onChangeText={(text) => setOrderID(text.toUpperCase())}
          onIconPress={handleSearch}
          isBackground={true}
        />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={setActiveSenderTrue}
          activeOpacity={1}
          style={[
            styles.tab,
            activeSender && styles.activeTab,
          ]}
        >
          <Text style={[styles.tabText, activeSender ? styles.activeText : styles.inactiveText]}>
            Đơn gửi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={setActiveSenderFalse}
          activeOpacity={1}
          style={[
            styles.tab,
            !activeSender && styles.activeTab,
          ]}
        >
          <Text style={[styles.tabText, !activeSender ? styles.activeText : styles.inactiveText]}>
            Đơn nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 16,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  header: {
    marginTop: 56,
    alignItems: "center",
    //marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  border: {
    borderColor: "white",
    borderWidth: 1,
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#EB455F",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "500",
  },
  activeText: {
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  inactiveText: {
    color: "#808080",
  },
  searchInput:{
    backgroundColor:'#eeeeee',
    padding: 28,
    borderRadius: 12,
    fontSize: 16,
 },
 viewsearch:{
   flex:1,
   width:'100%',
   marginTop: 24,
   marginBottom: 64
 },
});

export default Header;
