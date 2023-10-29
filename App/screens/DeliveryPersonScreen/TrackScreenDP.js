import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

export default function TrackScreenDP() {
  const [acceptedOrder, setAcceptedOrder] = useState(null);

  useEffect(() => {
    // Function to simulate accepting an order
    const acceptOrder = () => {
      const orderDetails = {
        orderId: "12345",
        totalWeight: 25,
        deliveryAddress: "123 Main Street, City, Country",
        // Other order details
      };
      setAcceptedOrder(orderDetails);
    };

    // Simulating accepting an order (call this function when an order is accepted)
    acceptOrder();
  }, []); // Empty dependency array ensures it runs only once

  const OrderCard = ({ label, value }) => (
    <View style={styles.cardItem}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.outerCont}>
      {acceptedOrder ? (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Accepted Order Details</Text>
          <OrderCard label="Order ID:" value={acceptedOrder.orderId} />
          <OrderCard label="Total Weight:" value={`${acceptedOrder.totalWeight} kgs`} />
          <OrderCard label="Delivery Address:" value={acceptedOrder.deliveryAddress} />
          {/* Add more OrderCard components for additional details */}
        </View>
      ) : (
        <View style={styles.cont}>
          <Text style={styles.text}>No active order to track! </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    alignItems: "center",
  },
  cont: {
    height: 50,
    width: 300,
    marginTop: 300,
    borderRadius: 20,
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0096FF",
  },
  text: {
    marginLeft: 65,
    fontSize: 18,
  },
  cardContainer: {
    width: 300,
    backgroundColor: "#e3e3e3",
    padding: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardItem: {
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: 16,
  },
});
