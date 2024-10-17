import React, { useState } from "react";
import { StyleSheet, View, ScrollView,Text } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import MyOrderItem from "../../components/Order/MyOrderItem";
import NavOrder from "../../components/Navbar/NavOrder";

interface RouteParams {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const MyOrder: React.FC<RouteParams> = () => {
  const [currentPage, setCurrentPage] = useState<string>("Chờ vận chuyển"); 

  return (
    <View style={styles.container}>
     <TransHeader haveBackIcon={true} title="Đơn hàng của bạn" />
     <ScrollView style={styles.scro}>  
      <MyOrderItem currentPage={currentPage} phone={""}/>
     </ScrollView>
     <NavOrder currentPage={currentPage} setCurrentPage={setCurrentPage} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scro:{
    flex: 1,
  }
});

export default MyOrder;
