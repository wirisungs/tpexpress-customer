import React from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import { useRoute } from '@react-navigation/native';
import CopyIC from "../../svg/DucTri/Icons/Order/Copy";
import BoxIC from "../../svg/DucTri/Icons/Order/Box";
import CarIC from "../../svg/DucTri/Icons/Order/Car";
import HomeIC from "../../svg/DucTri/Icons/Order/Home";
import LineDoneIC from "../../svg/DucTri/Icons/Order/LineDone";
import LineGrayIC from "../../svg/DucTri/Icons/Order/LineGray";
import Bill from "../../components/Order/Bill";
import Info_Order from "../../components/Order/Info_Order";

const OrderDetail: React.FC = () => {
  const route = useRoute();
  const { item } = route.params as { item: any }; 

  const LineIcons = ({ status }) => {
    return (
      <View style={styles.linestatus}>
        {status === 'completed' ? (
          <><LineDoneIC /><LineDoneIC /></>
        ) : (
          <><LineDoneIC /><LineGrayIC /></>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TransHeader haveBackIcon={true} title="Chi tiết" />
      <ScrollView style={styles.scro}>
        <View style={styles.row1}>
            <View style={styles.row11}>
              <Text style={styles.orderCode}>{item.Code}</Text> 
              <TouchableOpacity ><CopyIC/></TouchableOpacity>             
            </View>
           <TouchableOpacity>
            <Text style={styles.xemthem}>Xem thêm</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.statusic}>
            <View style={styles.boxstatus}>
              <BoxIC/>
              <Text style={styles.textstatus}>Chờ vận chuyển</Text>
            </View>

            <LineIcons status="completed" />

            <View style={styles.boxstatus}>
              <CarIC/>
              <Text style={styles.textstatus}>Đang vận chuyển</Text>
            </View>

            <LineIcons status="incomplete" />

            <View style={styles.boxstatus}>
              <HomeIC/>
              <Text style={styles.textstatus}>Nhận hàng</Text>
            </View>   
        </View>

        {/* phan info */}
        <Info_Order item={item}  />

        {/* phan bill */}
        <Bill/>
       
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scro: {
    flex: 1,
    padding: 24
  },
  row1:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  row11:{
    flexDirection:'row',
    alignItems:'center',
  },
  orderCode: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8
  },
  xemthem:{
    color:'#767676',
    fontSize: 14,
    fontWeight:'medium'
  },
  statusic:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 20
  },
  linestatus:{
    flexDirection:'row',
    marginTop: 8
  },
  boxstatus:{
    width: 76,
    alignItems:'center'
  },
  textstatus:{
    fontSize: 12,
    marginVertical:8,
    textAlign:'center',
    fontWeight:'regular'
  }
});

export default OrderDetail;
