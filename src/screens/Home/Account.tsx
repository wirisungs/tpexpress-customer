import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";
import AccIC from "../../svg/DucTri/Icons/AccIcon/User";
import ProIC from "../../svg/DucTri/Icons/AccIcon/Product";
import WalletIC from "../../svg/DucTri/Icons/AccIcon/Wallet";
import CalIC from "../../svg/DucTri/Icons/AccIcon/Calcu";
import LocaIC from "../../svg/DucTri/Icons/AccIcon/Loca";
import PromoIC from "../../svg/DucTri/Icons/AccIcon/Promo";
import QuesIC from "../../svg/DucTri/Icons/AccIcon/Ques";
import DkIC from "../../svg/DucTri/Icons/AccIcon/Dieukhoan";
import AboutIC from "../../svg/DucTri/Icons/AccIcon/About";
import HdsdIC from "../../svg/DucTri/Icons/AccIcon/Hssd";
import SetIC from "../../svg/DucTri/Icons/AccIcon/Setting";

interface Cus {
  orderId: string;
  cusId: string;
  cusName: string;
  cusEmail: string;
  cusPhone: string;
  cusAddress: string;
  cusBirthday: Date;
  cusGender: number;
}

export default function Account({ email }: { email: string }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [cus, setCus] = useState<Cus | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://tpexpress.ddns.net:3000/api/cusE2?email=${email}`);
        if (!response.ok) {
          console.warn("Email không tồn tại trong hệ thống hoặc lỗi xảy ra.");
          return;
        }
        const data = await response.json();
        if (data.exists) {
          setCus(data.customer);
        } else {
          console.warn("Email không tồn tại trong hệ thống.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [email]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{cus ? cus.cusName : "Loading..."}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <Image
          source={ImagesAssets.AvaAcc}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <ScrollView style={body.body}>
        <View style={body.row}>
          <Text style={body.title}>Tài khoản</Text>
          <TouchableOpacity style={body.rowdetail} onPress={() => navigation.navigate('User_Info', { customerData: cus })}>
            <AccIC />
            <Text style={body.textdetail}>Thông tin cá nhân & Bảo mật</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.rowdetail} onPress={() => navigation.navigate('MyOrder')}>
            <ProIC />
            <Text style={body.textdetail}>Đơn hàng của tôi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.rowdetail} onPress={() => navigation.navigate('MainWallet')}> 
            <WalletIC />
            <Text style={body.textdetail}>Ví của tôi</Text>
          </TouchableOpacity>
        </View>
        
        <View style={body.row}>
          <Text style={body.title}>Tiện ích</Text>
          <TouchableOpacity style={body.rowdetail}  onPress={() => navigation.navigate('TTCP')}>
            <CalIC />
            <Text style={body.textdetail}>Tra tính cước phí</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.rowdetail} onPress={() => navigation.navigate('TestMap')}>
            <LocaIC />
            <Text style={body.textdetail}>Tra cứu bưu cục</Text>
          </TouchableOpacity>
          
        </View>

        <View style={body.row}>
          <Text style={body.title}>Về chúng tôi</Text>
          <TouchableOpacity style={body.rowdetail}>
            <QuesIC />
            <Text style={body.textdetail}>Trợ giúp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.rowdetail}>
            <DkIC />
            <Text style={body.textdetail}>Điều khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.rowdetail}>
            <AboutIC />
            <Text style={body.textdetail}>Giới thiệu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.rowdetail}>
            <HdsdIC />
            <Text style={body.textdetail}>Hướng dẫn sử dụng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={body.rowdetail} onPress={() => navigation.navigate('Setting')}>
            <SetIC />
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
    marginTop: 33
  },
});
const body = StyleSheet.create({
  body: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    marginBottom: 24,
  },
  rowdetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  textdetail: {
    color: "#767676",
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: "400",
  },
});
