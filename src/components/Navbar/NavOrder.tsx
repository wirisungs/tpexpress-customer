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
        onPress={() => setCurrentPage("ST001")}
      >
        <Text
          style={[styles.text, currentPage === "ST001" && styles.activeText]}
        >
          Đơn chờ vận chuyển
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottom1}
        onPress={() => setCurrentPage("ST002")}
      >
        <Text
          style={[styles.text, currentPage === "ST002" && styles.activeText]}
        >
          Đơn đang vận chuyển
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottom1}
        onPress={() => setCurrentPage("ST003")}
      >
        <Text
          style={[styles.text, currentPage === "ST003" && styles.activeText]}
        >
          Đơn đã hoàn thành
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottom1}
        onPress={() => setCurrentPage("ST004")}
      >
        <Text
          style={[styles.text, currentPage === "ST004" && styles.activeText]}
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
