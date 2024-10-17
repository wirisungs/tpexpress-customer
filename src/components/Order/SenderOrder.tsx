import React from "react";
import { StyleSheet, View } from "react-native";
import OrderItem from "./OrderItem";

interface SenderOrderProps {
  status?: string;
}

const SenderOrder: React.FC<SenderOrderProps> = ({  status = 'Chờ vận chuyển' }) => {
  return (
    <View style={styles.container}>
      <View>
        <OrderItem status={status} phone="0123456789" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,  // Adjust padding as needed
    gap: 16,  // Custom gap between elements
  },
  head1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  head2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1c1c1c",
  },
  status: {
    fontSize: 16,
    color: "#03A63C",
  },
  info: {
    fontSize: 18,
    color: "#808080",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,  // Apply shadow above
    },
    shadowOpacity: 0.2,  // Make shadow more visible
    shadowRadius: 1,
    elevation: 1,
  },
});

export default SenderOrder;
