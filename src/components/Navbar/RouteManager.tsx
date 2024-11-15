import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
// Screen
import Home from "../../screens/Home/Home";
import Order from "../../screens/Home/Order";
import Nofication from "../../screens/Home/Nofi/Nofication";
import Account from "../../screens/Home/Account"
import CreateOrder from "../../screens/Order/CreateOrderInfo";


// Icon
import HomeIC from "../../svg/DucTri/Icons/NavIcon/Home";
import OrderIC from "../../svg/DucTri/Icons/NavIcon/Box";
import NofiIC from "../../svg/DucTri/Icons/NavIcon/Nofi";
import AccIC from "../../svg/DucTri/Icons/NavIcon/Account";
import CreateIC from "../../svg/DucTri/Icons/NavIcon/plus";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import AsyncStorage from '@react-native-async-storage/async-storage';

const homeName = "Trang chủ";
const orderName = "Đơn hàng";
const offerName = "Thông báo";
const supportName = "Tài khoản";
const createOrderName = "Lên đơn";

const Tab = createBottomTabNavigator();

interface Cus {
  orderId: string;
  cusId: string;
  cusName: string;
  cusEmail: string;
  cusPhone: string;
  cusAddress: string;
  cusBirthday: Date;
  cusGender: number;
}

const RouteManager: React.FC = () => {
  const Route = useRoute<RouteProp<RootStackParamList, "HomePage">>();
  const [email, setEmail] = useState<string | null>(null);
  const [cus, setCus] = useState<Cus | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useFocusEffect(
    React.useCallback(() => {
      const fetchEmail = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem('email'); // Lấy email từ AsyncStorage
          if (storedEmail) {
            setEmail(storedEmail); // Cập nhật state email
          } else {
            console.warn("Không tìm thấy email trong AsyncStorage.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy email từ AsyncStorage:", error);
        }
      };

      fetchEmail();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (email) {
        // Lấy thông tin khách hàng khi có email
        const fetchData = async () => {
          try {
            const response = await fetch(`http://tpexpress.ddns.net:3000/api/cusE2?email=${email}`);
            if (!response.ok) {
              console.warn("Email không tồn tại trong hệ thống hoặc lỗi xảy ra.");
              return;
            }
            const data = await response.json();
            if (data.exists) {
              setCus(data.customer);
              if (data.customer && !data.customer.cusPhone && !data.customer.cusAddress) {
                navigation.navigate('User_Info', { customerData: data.customer });
              }
              
            } else {
              console.warn("Email không tồn tại trong hệ thống.");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();
      }
    }, [email]) 
  );

 


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name={homeName}
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
      >
        {() => <Home cus={cus}/>}
      </Tab.Screen>

      <Tab.Screen
        name={orderName}
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
      >
        {() => <Order email={cus} />}
      </Tab.Screen>


      <Tab.Screen
        name={createOrderName}
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainerplus}>
              <CreateIC />
            </View>
          ),
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      >
        {() => <CreateOrder email={cus} />}
      </Tab.Screen>

      <Tab.Screen
        name={offerName}
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
      >
        {() => <Nofication cus={cus} />}
      </Tab.Screen>

      <Tab.Screen
        name={supportName}
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
      >
        {() => <Account email={cus} />}
      </Tab.Screen>

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
