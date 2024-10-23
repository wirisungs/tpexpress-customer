import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Touchable, TouchableOpacity } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import MuiTenIC from "../../svg/DucTri/Icons/AccIcon/MuiTen"
import EditIC from "../../svg/DucTri/Icons/AccIcon/Edit"
import ButtonFill from "../../components/Buttons/Buttons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

interface RouteParams {
  
}

const User_Info: React.FC<RouteParams> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TransHeader haveBackIcon={true} title="Thông tin cá nhân" />
      <ScrollView style={styles.all}>
        <View style={styles.avatar}>
        <TouchableOpacity style={styles.edit}>
            <EditIC />
        </TouchableOpacity>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Họ và tên</Text>
          <Text style={styles.name}>Ruby</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Số điện thoại</Text>
          <Text style={styles.name}>091600xxx xxx</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Email</Text>
          <Text style={styles.name}>tpexpress@gmail.com</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Địa chỉ</Text>
          <Text style={styles.name}>QL22, Trung Mỹ Tân, Tân Thuận, Hóc Môn</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Giới tính</Text>
          <Text style={styles.name}>Nam</Text>
        </View>

        <TouchableOpacity style={styles.viewbodymk}>
          <Text style={styles.titlename}>Mật khẩu</Text>
          <MuiTenIC/>
        </TouchableOpacity>
        {/* <View style={styles.viewbodymk}>
        <ButtonFill onPress={() => navigation.navigate('OrderDetail')} >
              <Text className="text-white font-bold text-lg">Đăng nhập</Text>
        </ButtonFill>
        <View/> */}
       <View style={styles.btnedit}>
       <ButtonFill onPress={() => navigation.navigate('User_Edit')} >
              <Text className="text-white font-bold text-lg">Sửa thông tin</Text>
        </ButtonFill>
       </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 24
  },
  all:{
    flex: 1,
    padding: 24,
  },
  avatar:{
    backgroundColor:'#fcfcfc',
    height: 120,
    width: 120,
    alignSelf:'center',
    borderRadius: 12
  },
  titlename:{
    fontSize: 20,
    fontWeight:'bold',
    marginTop: 10,
    marginBottom: 6
  },
  name:{
    fontSize: 16,
    fontWeight:'regular',
    color:'#767676',
    marginBottom: 10
  },
  viewbody:{
    paddingVertical: 20
  },
  viewbodymk:{
    paddingVertical: 20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  edit:{
    position:'absolute',
    bottom: -10,
    right: -10
  },
  btnedit:{
    marginBottom: 64
  }
});

export default User_Info;
