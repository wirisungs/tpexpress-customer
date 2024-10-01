import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../../components/Header/HeaderForDH";
import SenderOrder from "../../components/Order/SenderOrder";
import ReceiverOrder from "../../components/Order/ReceiverOrder";


interface RouteParams {
  route: {
    params?: {
      phone?: string;
    };
  };
}

const Order: React.FC<RouteParams> = ({ route }) => {
  const [activeSender, setActiveSender] = useState<boolean>(true);
  const { phone } = route.params || {};

  const title = "Đơn hàng";
  return (
    <View style={styles.container}>
      <Header
        screenName={title}
        activeSender={activeSender}
        setActiveSender={setActiveSender}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          {activeSender ? <SenderOrder /> : <ReceiverOrder  />}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  innerContainer: {
    paddingVertical: 16,
  },
});

export default Order;
