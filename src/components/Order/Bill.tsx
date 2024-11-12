import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert, Modal, TouchableOpacity, Dimensions } from "react-native";
import { ButtonLine } from "../Buttons/Buttons";
import { useRoute } from "@react-navigation/native";

interface SenderOrderProps {

}

interface Item {
  Item_ID: string,
  Item_Name: string,
  Item_Weight: number,
  Item_AllValue: string,
  Order_ID: string,
}

const Bill: React.FC<SenderOrderProps> = () => {
  const [itemdetail, setItemDetail] = useState<Item[]>([]);
  const route = useRoute();
  const { item } = route.params as { item: any };
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleClosePopup = () => setPopupVisible(false);


  const formatCurrency = (amount: { toString: () => string; }) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://tpexpress.ddns.net:3000/api/item?status=${item.orderId}`
        );
        const messagesData: Item[] = await response.json();
        setItemDetail(messagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [item.Order_ID]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://tpexpress.ddns.net:3000/api/order/${item.orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderStatusId: "ST004" }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Thành công', 'Dữ liệu đã được cập nhật thành công!');
      } else {
        Alert.alert('Lỗi', result.error || 'Có lỗi xảy ra khi cập nhật dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật dữ liệu.');
    }
  };


  const renderItem = ({ item }: { item: Item }) => (
    <View style={bill.detailpro}>
      <Text style={bill.txtpro}>{item.Item_Name}</Text>
      <Text style={bill.txtpro}>{formatCurrency(item.Item_AllValue)}</Text>
    </View>
  );

  const formatDateString = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <>
      <View style={bill.all}>
        <View style={bill.row1}>
          <Text style={bill.title}>Hóa đơn</Text>
          <View style={bill.viewdate}>
            <Text style={bill.date}>{formatDateString(new Date(item.createdDate))}</Text>
          </View>
        </View>
        <View style={bill.row2}>
          <FlatList
            data={itemdetail}
            renderItem={renderItem}
            keyExtractor={(item) => item.Item_ID}
          />
        </View>

        <View style={bill.row3}>
          <View style={bill.priceview}>
            <Text style={bill.pricepro}>Phí thu hộ (COD):</Text>
            <Text style={bill.pricepro}>{formatCurrency(item.orderCOD)}</Text>
          </View>
          <View style={bill.priceview}>
            <Text style={bill.pricepro}>Phí vận:</Text>
            <Text style={bill.pricepro}>{formatCurrency(item.deliverPrice)}</Text>
          </View>
          <View style={bill.priceview}>
            <Text style={bill.pricepro}>Tổng: </Text>
            <Text style={bill.pricepro}>{formatCurrency(item.totalPrice)}</Text>
          </View>
        </View>
        {item.orderStatusId === "ST001" && (
          <View style={bill.btncancel}>
            <ButtonLine onPress={handleUpdate}>
              <Text style={bill.txtcancel}>Hủy đơn</Text>
            </ButtonLine>
          </View>
        )}

      </View>
      <Modal
        visible={isPopupVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClosePopup}
      >
        <View style={bill.modalContainer}>
          <View style={bill.popupContent}>
            <TouchableOpacity style={bill.dropic} onPress={handleClosePopup}>
              <Text>Hủy đơn </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>


  );
};

const bill = StyleSheet.create({
  all: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  date: {
    backgroundColor: "#2FA087",
    padding: 8,
    color: "#ffffff",
    fontSize: 16,
  },
  viewdate: {
    borderRadius: 12, // Apply borderRadius to the desired view
    overflow: "hidden", // This might be necessary for some cases
  },
  detailpro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  row2: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c4c4c4'
  },
  row3: {
    paddingVertical: 12
  },
  txtpro: {
    fontSize: 16,
    fontWeight: 'regular'
  },
  priceview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  pricepro: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111'
  },
  txtcancel: {
    color: '#EB455F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btncancel: {
    // alignItems:'center',
    // flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    height: Dimensions.get("window").height * 0.390,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // padding: 24,
    paddingHorizontal: 24
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  dropic: {
    alignItems: 'center',
    marginBottom: 12
  },
});

export default Bill;