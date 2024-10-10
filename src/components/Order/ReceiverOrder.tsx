import React from "react";
import { StyleSheet, View,Text } from "react-native";
import OrderItem from "./OrderItem";

interface ReceiverOrderProps {
  phone?: string;
}

const ReceiverOrder: React.FC<ReceiverOrderProps> = ({ phone }) => {
  return (
    <View style={styles.container}>
      <View>
        <OrderItem phone={phone} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10, // Adjust padding as needed
    gap: 16, // Custom gap between elements
  },
});

export default ReceiverOrder;
