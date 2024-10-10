import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,TextInput } from "react-native";
// import SearchBar from "../Home/SearchBar";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  screenName: string;
  activeSender: boolean;
  setActiveSender: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ screenName, activeSender, setActiveSender }) => {
  const navigation = useNavigation();

  const setActiveSenderTrue = () => {
    setActiveSender(true);
  };

  const setActiveSenderFalse = () => {
    setActiveSender(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>     
          <Text style={styles.title}>{screenName}</Text>
      </View>
      <View style={styles.viewsearch}>
                <TextInput
                   style={styles.searchInput}
                   placeholder="Nhập mã đơn vận chuyển"
                   placeholderTextColor="#B6B6B6"
                />
      </View>
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
            Đơn gửi
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
            Đơn nhận
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
  header: {
    marginTop: 56,
    alignItems: "center",
    //marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  border: {
    borderColor: "white",
    borderWidth: 1,
  },
  searchBarContainer: {
    marginBottom: 16,
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
    color: "#1c1c1c",
  },
  inactiveText: {
    color: "#808080",
  },
  searchInput:{
    backgroundColor:'#eeeeee',
    padding: 28,
    borderRadius: 12,
    fontSize: 16,
 },
 viewsearch:{
   flex:1,
   width:'100%',
   marginTop: 24,
   marginBottom: 64
 },
});

export default Header;
