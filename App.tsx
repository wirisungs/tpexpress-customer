import { StyleSheet } from "react-native";
import "./src/styles/global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import screens
import CreateOrder from "./src/screens/Order/CreateOrderInfo";
import RouteManager from "./src/components/Navbar/RouteManager";
import ServiceStep from "./src/screens/Order/ServiceStep";
import SuccessStep from "./src/screens/Order/SuccessStep";
import Main from "./src/screens/Wallet/Main";
import ScanQR from "./src/screens/Wallet/ScanQR";
import Naptien from "./src/screens/Wallet/Naptien";
import Ruttien from "./src/screens/Wallet/Ruttien";
import MyOrder from "./src/screens/Order/MyOrder";
import User_Info from "./src/screens/Account/User_Info";
import OrderDetail from "./src/screens/Order/OrderDetail";
import User_Edit from "./src/screens/Account/User_Edit";
import TestMap from "./src/screens/Home/TTBC";
import TTCP from "./src/components/Order/TTCP";
import KQCP from "./src/components/Order/KQCP";
import Helpdesk from "./src/screens/Home/Helpdesk";
import SSO from "./src/screens/Auth/SSO";
import Verify from "./src/screens/Auth/Verify";
import Setting from "./src/screens/Account/Setting";
import WalletVerify from "./src/screens/Order/WalletVerify";
import WalletDetal from "./src/screens/Order/WalletDetail";
import OrderRequest from "./src/screens/Order/OrderRequest";
import { ThemeProvider } from "./src/components/Darkmode/ThemeContext";
import DarkModeWrapper from "./src/components/Darkmode/DarkmodeW";
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
    phone: string;
    name: string;
    note: string;
    packageName: string;
    Weight: string;
    COD: number;
    PriceOfItem: Number;
    fragileInput: Boolean;
    orders: String;
    distance: Number;
  };
};

export default function App() {
  return (
    <ThemeProvider>
      <DarkModeWrapper>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SSO"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Verify" component={Verify} />
            <Stack.Screen name="CreateOrder" component={CreateOrder} />
            <Stack.Screen name="ServiceOrder" component={ServiceStep} />
            <Stack.Screen name="SuccessStep" component={SuccessStep} />
            <Stack.Screen name="HomePage" component={RouteManager} />
            <Stack.Screen name="MainWallet" component={Main} />
            <Stack.Screen name="ScanQR" component={ScanQR} />
            <Stack.Screen name="Naptien" component={Naptien} />
            <Stack.Screen name="Ruttien" component={Ruttien} />
            <Stack.Screen name="MyOrder" component={MyOrder} />
            <Stack.Screen name="User_Info" component={User_Info} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="User_Edit" component={User_Edit} />
            <Stack.Screen name="TestMap" component={TestMap} />
            <Stack.Screen name="TTCP" component={TTCP} />
            <Stack.Screen name="KQCP" component={KQCP} />
            <Stack.Screen name="Helpdesk" component={Helpdesk} />
            <Stack.Screen name="SSO" component={SSO} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="WalletVerify" component={WalletVerify} />
            <Stack.Screen name="WalletDetal" component={WalletDetal} />
            <Stack.Screen name="OrderRequest" component={OrderRequest} />
          </Stack.Navigator>
        </NavigationContainer>
      </DarkModeWrapper>

    </ThemeProvider>

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
