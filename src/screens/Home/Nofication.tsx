import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";

export default function Nofication() {

  return (
    <View style={styles.container}>
      <Text>Nofication</Text>
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
  
  
  