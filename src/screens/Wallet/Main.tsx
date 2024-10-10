import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text, Touchable, TouchableOpacity,ScrollView } from "react-native";
import BackIC from "../../svg/DucTri/Icons/Wallet/Back";
import NofiIC from "../../svg/DucTri/Icons/Wallet/Nofi";
import DetailIC from "../../svg/DucTri/Icons/Wallet/Detail";
import EyeIC from "../../svg/DucTri/Icons/Wallet/Eye";
import RutIC from "../../svg/DucTri/Icons/Wallet/Rut"
import NapIC from "../../svg/DucTri/Icons/Wallet/Nap"
import QuetIC from "../../svg/DucTri/Icons/Wallet/Quet"
import Bank1IC from "../../svg/DucTri/Icons/Wallet/IconBank1"
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

interface RouteParams {}

const Main: React.FC<RouteParams> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
   
  return (
    <LinearGradient colors={["#FF6079", "#EB455F"]} style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.TopIC}>
          <BackIC />
        </TouchableOpacity>
        <View style={styles.rightIconsTop}>
          <View style={styles.TopIC2}>
            <NofiIC />
          </View>
          <View style={styles.TopIC2}>
            <DetailIC/>
          </View>
        </View>
      </View>
      <View style={styles.top2}>
      <View style={styles.priceTittle}>
          <Text style={styles.textprice}>Số dư hiện tại</Text>
          <View style={styles.rowprice}>
             <Text style={styles.dv}>đ</Text>
             <Text style={styles.textmoney}>320.000</Text>
             <EyeIC/>
          </View>
      </View>

        <View style={styles.navWallet}>
          <TouchableOpacity onPress={() => navigation.navigate('Ruttien')} style={styles.nav1}>
            <RutIC/>
            <Text style={styles.textnav1}>Rút tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Naptien')} style={styles.nav1}>
            <NapIC/>
            <Text style={styles.textnav1}>Nạp tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ScanQR')} style={styles.nav1}>
            <QuetIC/>
            <Text style={styles.textnav1}>Quét mã</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={bodys.body}>
        <Text style={bodys.title}>Tài khoản liên kết</Text>
        <View style={bodys.bankrow}>
          <Bank1IC/>
          <View style={bodys.titlebank}>
            <Text style={bodys.title1} numberOfLines={1} ellipsizeMode="tail">Liên kết tài khoản ngân hàng/ví điện tử</Text>
            <Text style={bodys.title2} numberOfLines={1} ellipsizeMode="tail">Bạn mua cơm chưa? Mua cho tôi với</Text>
          </View>
        </View>
      </ScrollView>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    paddingBottom: 12,
    padding: 24
  },
  TopIC: {
    backgroundColor: "#FFFFFF",
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  TopIC2: {
    backgroundColor: "#FFFFFF",
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginLeft: 10
  },
  rightIconsTop: {
    flexDirection: "row", 
    alignItems: "center",
  },
  priceTittle:{
    alignItems:'center',
    marginVertical: 12
  },
  textprice:{
    color:'#ffffff',
    fontWeight:'regular',
    fontSize: 14,
    marginBottom: 10
  },
  textmoney:{
    color:'#ffffff',
    fontWeight:'bold',
    fontSize: 32,
    marginLeft: 4,
    marginRight: 6
  },
  dv:{
    color:'#ffffff',
    fontWeight:'regular',
    fontSize: 16
  },
  rowprice:{
    flexDirection:'row',
    alignItems:'center'
  },
  top2: {
    paddingHorizontal: 36,
    marginBottom: 74, 
    zIndex: 1,
    alignItems:'center'
  },
  navWallet: {
    backgroundColor: '#FCFCFC',
    width: '100%',
    height: 94,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'absolute',
    top: 100, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nav1:{
    alignItems:'center',
    fontSize: 12
  },
  textnav1:{
   
  }
});

const bodys = StyleSheet.create({
  body: {
    backgroundColor: '#fcfcfc',
    flex: 1,
    borderRadius: 12, 
    padding: 24
  },
  title:{
    fontSize: 20,
    fontWeight:'bold',
    marginTop: 48
  },
  title1:{
    fontSize: 16,
    fontWeight:'bold',
    maxWidth: 294
  },
  title2:{
    fontSize: 12,
    fontWeight:'regular',
    color:'#767676',
    maxWidth: 294
  },
  bankrow:{
    flexDirection:'row',
    marginVertical: 16 
  },
  titlebank:{
    marginLeft: 12,
  }
});

export default Main;
