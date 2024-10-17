import React from "react";
import { StyleSheet, View } from "react-native";
import OrderItem from "./OrderItem";

interface ReceiverOrderProps {
  status?: string[]; // Cho phép nhận một mảng status
}

const ReceiverOrder: React.FC<ReceiverOrderProps> = ({ status }) => {
  return (
    <View style={styles.container}>
      <OrderItem status={status} phone="0123456789" />
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
