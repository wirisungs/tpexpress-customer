import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface SenderOrderProps {
  
}

const Info_Order: React.FC<SenderOrderProps> = () => {
    const route = useRoute();
    const { item } = route.params as { item: any }; 

  return ( 
    <View style={info.all}>
    <Text style={info.title}>Thông tin giao nhận</Text>
      <View  style={info.v1}>
         <Text style={info.nhan}>Người nhận</Text>
         <Text style={info.namesdt}>{item.ReceiverName} - {item.ReceiverSDT}</Text>
         <Text style={info.address}>{item.ReceiverAddress}</Text>
      </View>
      <View  style={info.v1}>
         <Text style={info.gui}>Người gửi</Text>
         <Text style={info.namesdt}>Thris Potato - 091727776</Text>
         <Text style={info.address}>457/13/2 Huỳnh Tấn Phát</Text>
      </View>
  </View>
  );
};

const info = StyleSheet.create({
    all:{
        paddingVertical: 24
    },
    v1:{
       marginBottom: 20
    },
    title:{
        fontSize: 20,
        fontWeight:'bold',
        marginBottom: 20
    },
    nhan:{
        color:'#EB455F',
        fontSize: 14,
        fontWeight:'regular',
    },
    gui:{
        color:'#F9801D',
        fontSize: 14,
        fontWeight:'regular',
    },
    namesdt:{
        fontSize: 16,
        fontWeight:'regular',
        marginVertical: 8
    },
    address:{
        color:'#767676',
        fontSize: 16,
        fontWeight:'regular'
    }
  });

export default Info_Order;
