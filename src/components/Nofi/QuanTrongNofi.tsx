import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { ImagesAssets } from "../../assets/DTri/ImageAssets";
import Nofibox from "../Item/NofiBox";

export default function QTNofi() {

  return (
    <View style={styles.container}>
      <Nofibox/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ffffff",
      flex: 1, 
    },
  });
  
  
  