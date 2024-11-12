import React from "react";
import { StyleSheet, View ,Text} from "react-native";
import OrderItem from "./OrderItem";

interface ReceiverOrderProps {
  status?: string[]; 
  email: string; 
}

const ReceiverOrder: React.FC<ReceiverOrderProps> = ({ status,email }) => {
  return (
    <View style={styles.container}>
      {/* <Text>{email}</Text> */}
      <OrderItem status={status} email={email} phone="0123456789" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    gap: 16,
  },
});

export default ReceiverOrder;
