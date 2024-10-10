import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


const Naptien: React.FC = () => {
  
  return (
    <View style={styles.container}>
      <Text>Nap tien</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
 
});

export default Naptien;
