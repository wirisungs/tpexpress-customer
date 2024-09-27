import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./src/styles/global.css";
import Login from "./src/screens/login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import screens
import LoginScreen from "./src/screens/login";
import RegisterScreen from "./src/screens/register";
import VerifyScreen from "./src/screens/verify";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  LoginPage: undefined;
  RegisterPage: undefined;
  VerifyPage: { phoneNumber: string };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginPage" component={LoginScreen} />
        <Stack.Screen name="RegisterPage" component={RegisterScreen} />
        <Stack.Screen name="VerifyPage" component={VerifyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
