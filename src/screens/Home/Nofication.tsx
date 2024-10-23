import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,ScrollView } from "react-native";
import QTNofi from "../../components/Nofi/QuanTrongNofi";
import { TransHeader } from "../../components/Layouts/Headers";

export default function Nofication({}) {
  const [activeSender, setActiveSender] = useState<boolean>(true);
  // const { phone } = route.params || {};

  return (
    <View style={styles.container}>
      <TransHeader haveBackIcon={false} title="Thông báo" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>       
          <QTNofi/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff'
    },
    // header:{
    //   marginTop: 24
    // },
    scrollContainer: {
      flexGrow: 1,
    },
  });
  
  
  