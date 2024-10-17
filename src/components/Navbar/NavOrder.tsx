import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface RouteParams {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const NavOrder: React.FC<RouteParams> = ({ currentPage, setCurrentPage }) => {
 
  return (
    <View style={styles.bottom}>
      <TouchableOpacity
        style={styles.bottom1}
        onPress={() => setCurrentPage("Chờ vận chuyển")}
      >
        <Text
          style={[styles.text, currentPage === "Chờ vận chuyển" && styles.activeText]}
        >
          Đơn chờ vận chuyển
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottom1}
        onPress={() => setCurrentPage("Đang vận chuyển")}
      >
        <Text
          style={[styles.text, currentPage === "Đang vận chuyển" && styles.activeText]}
        >
          Đơn đang vận chuyển
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottom1}
        onPress={() => setCurrentPage("Đã hoàn thành")}
      >
        <Text
          style={[styles.text, currentPage === "Đã hoàn thành" && styles.activeText]}
        >
          Đơn đã hoàn thành
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottom1}
        onPress={() => setCurrentPage("Đã hủy")}
      >
        <Text
          style={[styles.text, currentPage === "Đã hủy" && styles.activeText]}
        >
          Đơn đã hủy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "#fcfcfc",
    paddingBottom: 24,
    paddingTop: 16
  },
  bottom1: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: 10,
    paddingVertical: 5, 
  },
  text: {
    fontSize: 14,
    color: "#000",
    textAlign: "center" ,
    fontWeight: 'medium',
    
  },
  activeText: {
    color: "#EB455F",
    fontWeight: 'medium',
  },
});

export default NavOrder;
