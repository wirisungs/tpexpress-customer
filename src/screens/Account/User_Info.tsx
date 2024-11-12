import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Touchable, TouchableOpacity } from "react-native";
import { TransHeader } from "../../components/Layouts/Headers";
import MuiTenIC from "../../svg/DucTri/Icons/AccIcon/MuiTen"
import EditIC from "../../svg/DucTri/Icons/AccIcon/Edit"
import ButtonFill from "../../components/Buttons/Buttons";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import AvaIC from '../../svg/DucTri/Icons/AccIcon/Ava'
import { useTheme } from "../../components/Darkmode/ThemeContext";

interface RouteParams {
  
}
type UserInfoRouteProp = RouteProp<RootStackParamList, 'User_Info'>;

const User_Info: React.FC<RouteParams> = () => {
  const route = useRoute<UserInfoRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { customerData } = route.params || {}; 
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#202020" : "#fff" }]}   >
      <TransHeader haveBackIcon={true} title="Thông tin cá nhân" />
      <ScrollView style={styles.all}>
        <View style={styles.avatar}>
          <AvaIC />
          <TouchableOpacity style={styles.edit}>
            <EditIC />
          </TouchableOpacity>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Họ và tên</Text>
          <Text style={styles.name}>{customerData?.cusName}</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Số điện thoại</Text>
          <Text style={styles.name}>{customerData?.cusPhone || "Vui lòng thêm số điện thoại"}</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Email</Text>
          <Text style={styles.name}>{customerData?.cusEmail}</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Địa chỉ</Text>
          <Text style={styles.name}>{customerData?.cusAddress || "Vui lòng thêm địa chỉ"}</Text>
        </View>

        <View style={styles.viewbody}>
          <Text style={styles.titlename}>Giới tính</Text>
          <Text style={styles.name}>
            {customerData?.cusGender === 0 ? "Nam" : customerData?.cusGender === 1 ? "Nữ" : "Chưa có"}
          </Text>
        </View>

       
       <View style={styles.btnedit}>
       <ButtonFill onPress={() => navigation.navigate('User_Edit', { customerData})} >
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
    paddingVertical: 10
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
