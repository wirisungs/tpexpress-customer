// DarkModeWrapper.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";

const DarkModeWrapper = ({ children }) => {
    const { isDarkMode } = useTheme(); // lấy trạng thái dark mode từ context
  
    return (
      <View style={[styles.container, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
        {children}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    darkBackground: {
      backgroundColor: '#ffff00', // màu nền tối
    },
    lightBackground: {
      backgroundColor: '#ffffff', // màu nền sáng
    },
  });
  
  export default DarkModeWrapper;
