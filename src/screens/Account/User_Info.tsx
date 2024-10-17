import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";


interface RouteParams {
  
}

const User_Info: React.FC<RouteParams> = () => {
  
  return (
    <View style={styles.container}>
      <Text>Accout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default User_Info;
