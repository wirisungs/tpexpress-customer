import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ButtonLine } from "../Buttons/Buttons";

interface SenderOrderProps {
  // ... (optional props for Bill component)
}

const Bill: React.FC<SenderOrderProps> = () => {

    const handleClick = () => {
        console.log('Button clicked');
    };

  return (
    <View style={bill.all}>
      <View style={bill.row1}>
        <Text style={bill.title}>Hóa đơn</Text>
        <View style={bill.viewdate}>
          <Text style={bill.date}>12/12/2025</Text>
        </View>
      </View>
      <View style={bill.row2}>
       <View style={bill.detailpro}>
          <Text style={bill.txtpro}>Móc khóa</Text>
          <Text style={bill.txtpro}>x1</Text>
       </View>
      </View>

      <View style={bill.row3}>
         <View style={bill.priceview}>
            <Text style={bill.pricepro}>Phí thu hộ (COD):</Text>
            <Text style={bill.pricepro}>1.789.000đ</Text>
         </View>
         <View style={bill.priceview}>
            <Text style={bill.pricepro}>Phí vận:</Text>
            <Text style={bill.pricepro}>89.000đ</Text>
         </View>
         <View style={bill.priceview}>
            <Text style={bill.pricepro}>Tổng:</Text>
            <Text style={bill.pricepro}>1.989.000đ</Text>
         </View>
       </View>
       <View style={bill.btncancel}>
         <ButtonLine onPress={handleClick}>
           <Text style={bill.txtcancel}>Hủy đơn</Text>
         </ButtonLine>
       </View>
    </View>
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
  detailpro:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 8
  },
  row2:{
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor:'#c4c4c4'
  },
  row3:{
     paddingVertical: 12
  },
  txtpro:{
    fontSize: 16,
    fontWeight:'regular'
  },
  priceview:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 12
  },
  pricepro:{
    fontSize: 18,
    fontWeight:'bold',
    color:'#111111'
  },
  txtcancel:{
    color:'#EB455F',
    fontSize: 20,
    fontWeight:'bold',
  },
  btncancel:{
    // alignItems:'center',
    // flex: 1
  }
});

export default Bill;