import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    height: hp('6.25%'), 
    width: wp('80%'),
    marginTop: hp('37.5%'), 
    borderRadius: wp('5%'),
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0096FF",
  },
  text: {
    marginLeft: wp('16.25%'), 
    fontSize: wp('4.5%'), 
  },
  cardContainer: {
    width: wp('80%'), 
    backgroundColor: "#e3e3e3",
    padding: wp('5%'), 
    borderRadius: wp('2.5%'), 
    marginTop: hp('12.5%'), 
  },
  cardTitle: {
    fontSize: wp('4.5%'), 
    fontWeight: "bold",
    marginBottom: hp('3.75%'), 
  },
  cardItem: {
    marginBottom: hp('1.5%'),
  },
  cardLabel: {
    fontSize: wp('3.5%'),
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: wp('4%'),
  },
});
