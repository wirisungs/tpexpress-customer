import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";

export default function Login() {
  const [phone, setPhone] = useState<string>("");

  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const fakeOTP = generateOTP();

  return (
    <View style={styles.container}>
      <View style={styles.topicAll}>
        <Image source={ImagesAssets.Logo} style={styles.imgBG} />
        <Text style={styles.topic}>THIEN PHUC EXPRESS</Text>
        <Text style={styles.topic1}>Giao hàng 1 giây</Text>
        <Text style={styles.topic1}>nhận hàng liền tay!</Text>
      </View>

      <View style={styles.phoneText}>
        <TextInput
          onChangeText={setPhone}
          value={phone}
          placeholder="Số điện thoại"
          style={styles.numberPhone}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.btndnandfinger}>
        <TouchableOpacity style={styles.btndn}>
          <Text style={styles.textdn}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnfinger}>
            <Image source={ImagesAssets.Finger} style={styles.imgFin} />
        </TouchableOpacity>
      </View>

      <View style={styles.rowlast}>
        <Text style={styles.textby}>Chưa có tài khoản?</Text>
        <TouchableOpacity>
          <Text style={styles.textdk}>Đăng kí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24
    },
    imgBG: {
      height: 96,
      width: 220,
      marginBottom: 12
    },
    topicAll: {
      alignItems: "center",
      marginBottom: 20,
    },
    topic: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#1C1C1C",
      marginBottom: 8
    },
    topic1: {
      color: "#808080",
      fontSize: 16,
      padding: 4
    },
    phoneText: {
      height: 48,
      width: "100%",
      marginVertical: 10,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: "rgba(105, 95, 165, 0.2)",
      justifyContent: "center",
    },
    numberPhone: {
      fontSize: 16,
      marginLeft: 16,
    },
    btndn: {
      alignItems: "center",
      padding: 16,
      backgroundColor: '#EB455F',
      borderRadius: 10,
      width: "80%", 
      marginTop: 12, 
    },
    textdn: {
      fontWeight: "600",
      color: "#ffffff",
      fontSize: 20,
    },
    rowlast: {
      alignItems: "center",
      marginTop: 16,
      flexDirection: 'row',
    },
    textby: {
      color: "#767676",
      marginRight: 5, 
    },
    textdk: {
      color: '#EB455F',
      fontSize: 14,
      marginHorizontal: 4
    },
    btndnandfinger: {
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width: '100%',
      marginTop: 12,
    },
    btnfinger: {
      borderWidth: 2,
      borderColor: '#EB455F',
      borderRadius: 12,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12
    },
    imgFin: {
      height: 22.5,
      width: 19.5
    }
  });
  
  
  