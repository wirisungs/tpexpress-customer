import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,TextInput } from "react-native";
import Bell from "../../assets/Icons/Item/BellIC";
// import SearchBar from "../Home/SearchBar";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  activeSender: boolean;
  setActiveSender: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSender, setActiveSender }) => {
  const navigation = useNavigation();

  const setActiveSenderTrue = () => {
    setActiveSender(true);
  };

  const setActiveSenderFalse = () => {
    setActiveSender(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={setActiveSenderTrue}
          activeOpacity={1}
          style={[
            styles.tab,
            activeSender && styles.activeTab,
          ]}
        >
          <Text style={[styles.tabText, activeSender ? styles.activeText : styles.inactiveText]}>
            Quan trọng
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={setActiveSenderFalse}
          activeOpacity={1}
          style={[
            styles.tab,
            !activeSender && styles.activeTab,
          ]}
        >
          <Text style={[styles.tabText, !activeSender ? styles.activeText : styles.inactiveText]}>
            Ưu đãi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingTop: 16,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#EB455F",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "500",
  },
  activeText: {
    fontWeight: "bold",
    color: "#EB455F",
  },
  inactiveText: {
    color: "#808080",
  },
});

export default Header;
