import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";

export default function Order() {

  return (
    <View style={styles.container}>
      <Text>Order</Text>
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
  });
  
  
  