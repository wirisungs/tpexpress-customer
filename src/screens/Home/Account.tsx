import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";
import AccIC from "../../svg/DucTri/Icons/AccIcon/User"
import ProIC from "../../svg/DucTri/Icons/AccIcon/Product"
import WalletIC from "../../svg/DucTri/Icons/AccIcon/Wallet"
import CalIC from "../../svg/DucTri/Icons/AccIcon/calcu"
import LocaIC from "../../svg/DucTri/Icons/AccIcon/Loca"
import PromoIC from "../../svg/DucTri/Icons/AccIcon/Promo"
import QuesIC from "../../svg/DucTri/Icons/AccIcon/Ques"
import DkIC from "../../svg/DucTri/Icons/AccIcon/Dieukhoan"
import AboutIC from "../../svg/DucTri/Icons/AccIcon/About"
import HdsdIC from "../../svg/DucTri/Icons/AccIcon/Hssd"
import SetIC from "../../svg/DucTri/Icons/AccIcon/Setting"

export default function Account() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Trần Hữu Minh Trí</Text>
          <Text style={styles.email}>leeminho97@gmail.com</Text>
        </View>
        <Image
          source={ImagesAssets.AvaAcc}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <ScrollView  style={body.body}>
        <View  style={body.row}>
           <Text style={body.title}>Tài khoản</Text>
           <TouchableOpacity style={body.rowdetail}>
             <AccIC/>
             <Text style={body.textdetail}>Thông tin cá nhân & Bảo mật</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <ProIC/>
             <Text style={body.textdetail}>Đơn hàng của tôi</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <WalletIC/>
             <Text style={body.textdetail}>Ví của tôi</Text>
           </TouchableOpacity>
        </View>

        <View  style={body.row}>
           <Text style={body.title}>Tiện ích</Text>
           <TouchableOpacity style={body.rowdetail}>
             <CalIC/>
             <Text style={body.textdetail}>Tra tính cước phí</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <LocaIC/>
             <Text style={body.textdetail}>Tra cứu bưu cục</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <PromoIC/>
             <Text style={body.textdetail}>Ưu đãi</Text>
           </TouchableOpacity>
        </View>

        <View  style={body.row}>
           <Text style={body.title}>Về chúng tôi</Text>
           <TouchableOpacity style={body.rowdetail}>
             <QuesIC/>
             <Text style={body.textdetail}>Trợ giúp</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <DkIC/>
             <Text style={body.textdetail}>Điều khoản</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <AboutIC/>
             <Text style={body.textdetail}>Giới thiệu</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <HdsdIC/>
             <Text style={body.textdetail}>Hướng dẫn sử dụng</Text>
           </TouchableOpacity>
           <TouchableOpacity style={body.rowdetail}>
             <SetIC/>
             <Text style={body.textdetail}>Cài đặt</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  top: {
    backgroundColor: "#EB455F",
    marginTop: 33,
    flexDirection: "row",
    width: "100%",
    padding: 24,
    justifyContent: "space-between",
    borderBottomEndRadius: 12,
    borderEndStartRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  email: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#ffffff",
  },
  image: {
    width: 100,
    height: 100,
  }
});
const body = StyleSheet.create({
  body:{
    padding: 24,
  },
  title:{
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12
  },
  row:{
    marginBottom: 24
  },
  rowdetail:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical: 8
  },
  textdetail:{
    color:'#767676',
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight:'regular'
  }
});
