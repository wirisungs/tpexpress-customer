import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,ScrollView } from "react-native";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";
import Header from "../../components/Header/HeaderForNofi";
import UDNofi from "../../components/Nofi/UuDaiNofi";
import QTNofi from "../../components/Nofi/QuanTrongNofi";

export default function Nofication({}) {
  const [activeSender, setActiveSender] = useState<boolean>(true);
  // const { phone } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Header
        activeSender={activeSender}
        setActiveSender={setActiveSender}
      />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>       
          {activeSender ? <QTNofi /> : <UDNofi  />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff'
    },
    header:{
      marginTop: 24
    },
    scrollContainer: {
      flexGrow: 1,
    },
  });
  
  
  