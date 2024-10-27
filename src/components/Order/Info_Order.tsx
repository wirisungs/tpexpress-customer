import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RootStackParamList } from "../../../App";

interface SenderOrderProps {
  
}
interface Cus {
    cus_ID: string,
    cus_Name: string,
    cus_Email: string,
    cus_Phone: string,
    cus_Address: string,
    cus_Birthday: string,
    cus_Gender: string,
}


const Info_Order: React.FC<SenderOrderProps> = () => {
    const route = useRoute();
    const { item } = route.params as { item: any }; 
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [statusCache, setStatusCache] = useState<Map<string, string>>(new Map());

    const fetchCustomerInfo = useCallback(
      async (cusID: string): Promise<{ name: string; phone: string }> => {
        if (statusCache.has(cusID)) {
          return statusCache.get(cusID) || { name: "Unknown", phone: "Unknown" };
        }
        try {
          const response = await fetch(
            `http://tpexpress.ddns.net:3000/api/cus?id=${cusID}`
          );
          const statusData: Cus = await response.json();
          const name = statusData.cus_Name || "Unknown";
          const phone = statusData.cus_Phone || "Unknown";
    
          const customerInfo = { name, phone };
          setStatusCache((prev) => new Map(prev).set(cusID, customerInfo));
    
          return customerInfo;
        } catch (error) {
          console.error("Error fetching customer info:", error);
          return { name: "Unknown", phone: "Unknown" };
        }
      },
      [statusCache]
    );
    
    
    const [cusName, setCusName] = useState<string>("Unknown");
    const [cusPhone, setCusPhone] = useState<string>("Unknown");
    
    useEffect(() => {
      const fetchInfo = async () => {
        const { name, phone } = await fetchCustomerInfo(item.Cus_ID);
        setCusName(name);
        setCusPhone(phone);
      };
      fetchInfo();
    }, [item.Cus_ID, fetchCustomerInfo]);
    
      

  return ( 
    <View style={info.all}>
    <Text style={info.title}>Thông tin giao nhận</Text>
      <View  style={info.v1}>
         <Text style={info.nhan}>Người nhận</Text>
         <Text style={info.namesdt}>{item.Receiver_Name} - {item.Receiver_Phone}</Text>
         <Text style={info.address}>{item.Receiver_Address}</Text>
      </View>
      <View  style={info.v1}>
         <Text style={info.gui}>Người gửi</Text>
         <Text style={info.namesdt}>{cusName} - {cusPhone}</Text> 
         <Text style={info.address}>{item.Sender_Address}</Text>
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
