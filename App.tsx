import { StyleSheet } from "react-native";
import "./src/styles/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import screens
import LoginScreen from "./src/screens/Auth/login";
import RegisterScreen from "./src/screens/Auth/register";
import VerifyScreen from "./src/screens/Auth/verify";
import CreateOrder from "./src/screens/Order/CreateOrderInfo";
import RouteManager from "./src/components/Navbar/RouteManager";
import ServiceStep from "./src/screens/Order/ServiceStep";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  LoginPage: undefined;
  RegisterPage: undefined;
  HomePage: undefined;
  VerifyPage: { phoneNumber: string };

  // Order
  CreateOrder: undefined;
  ServiceOrder: {
    senderAddress: string;
    receiverAddress: string;
    packageName: string;
    weight: string;
    cod?: number;
  };
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
        <Stack.Screen name="CreateOrder" component={CreateOrder} />
        <Stack.Screen name="ServiceOrder" component={ServiceStep} />
        <Stack.Screen name="HomePage" component={RouteManager} />
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
