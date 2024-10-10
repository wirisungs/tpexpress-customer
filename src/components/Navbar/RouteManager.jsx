import { StyleSheet, Text, View } from "react-native";
// Screen
import Home from "../../screens/Home/Home";
import Order from "../../screens/Home/Order";
import Nofication from "../../screens/Home/Nofication";
import Account from "../../screens/Home/Account";
import Createstep1 from "../../screens/Order/createOrder";
import TestPush from "../../screens/Home/test";

// Icon
import HomeIC from "../../svg/DucTri/Icons/NavIcon/Home";
import OrderIC from "../../svg/DucTri/Icons/NavIcon/Box";
import NofiIC from "../../svg/DucTri/Icons/NavIcon/Nofi";
import AccIC from "../../svg/DucTri/Icons/NavIcon/Account";
import CreateIC from "../../svg/DucTri/Icons/NavIcon/plus";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const homeName = "Trang chủ";
const orderName = "Đơn hàng";
const offerName = "Thông báo";
const supportName = "Tài khoản";
const createOrderName = "Lên đơn";

const Tab = createBottomTabNavigator();

const RouteManager = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name={homeName}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <HomeIC fill={focused ? "#EB455F" : "#1c1c1c"} />
              <Text
                style={[
                  styles.iconText,
                  { color: focused ? "#EB455F" : "#1c1c1c" },
                ]}
              >
                Trang chủ
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={orderName}
        component={Order}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <OrderIC fill={focused ? "#EB455F" : "#1c1c1c"} />
              <Text
                style={[
                  styles.iconText,
                  { color: focused ? "#EB455F" : "#1c1c1c" },
                ]}
              >
                Đơn hàng
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={createOrderName}
        component={Createstep1}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainerplus}>
              <CreateIC />
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={offerName}
        component={Nofication}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <NofiIC fill={focused ? "#EB455F" : "#1c1c1c"} />
              <Text
                style={[
                  styles.iconText,
                  { color: focused ? "#EB455F" : "#1c1c1c" },
                ]}
              >
                Thông báo
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={supportName}
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <AccIC fill={focused ? "#EB455F" : "#1c1c1c"} />
              <Text
                style={[
                  styles.iconText,
                  { color: focused ? "#EB455F" : "#1c1c1c" },
                ]}
              >
                Tài khoản
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingHorizontal: 6,
    paddingTop: 16,
    height: "10%",
    paddingBottom: 12,
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  iconContainerplus: {
    backgroundColor: "#2FA087",
    borderRadius: 46,
    padding: 24,
    position: "absolute",
    top: -30,
    zIndex: 1,
    borderWidth: 10,
    borderColor: "#ffffff",
  },
  iconText: {
    fontSize: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default RouteManager;
