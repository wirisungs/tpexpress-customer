import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import NofiIC from "../../svg/DucTri/Icons/NofiIcon/BigNofi";

export default function UDNofi() {

  return (
    <View style={styles.container}>
       <NofiIC/>
       <Text style={styles.text}>Bạn chưa có thông báo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
      fontSize: 18,
      fontWeight:'medium',
      color:'#767676'
    }
  });
  
  
  