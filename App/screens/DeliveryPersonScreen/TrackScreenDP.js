import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function TrackScreenDP() {
  const [acceptedOrder, setAcceptedOrder] = useState(null);

  useEffect(() => {
    // Function to simulate accepting an order
    const acceptOrder = () => {
      const orderDetails = {
        foodtype: "Fruits",
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

  const initialRegion = {
    latitude: 28.6026,
    longitude: 77.4090,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
  };

  const marker1 = { latitude: 28.672640607346818, longitude: 77.46905891349515 };
  const marker2 = { latitude: 28.59414038139007, longitude: 77.38089784551048 };

  return (
    <View style={styles.outerCont}>
      {acceptedOrder ? (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Accepted Order Details</Text>
          <OrderCard label="Food type:" value={acceptedOrder.foodtype} />
          <OrderCard label="Total Weight:" value={`${acceptedOrder.totalWeight} kgs`} />
          <OrderCard label="Delivery Address:" value={acceptedOrder.deliveryAddress} />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>No active order to track!</Text>
        </View>
      )}

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          {acceptedOrder && (
            <>
              <Marker coordinate={marker1} title="You" />
              <Marker coordinate={marker2} title="Parth" />
              <Polyline
                coordinates={[marker1, marker2]}
                strokeColor="#000" // Line color
                strokeWidth={2}
              />
            </>
          )}
        </MapView>
        {!acceptedOrder && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Accept an order to track details</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    width: wp('80%'),
    backgroundColor: "#e3e3e3",
    padding: wp('5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2.5%'),
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
  mapContainer: {
    position: 'relative',
    width: wp('80%'),
    height: hp('50%'),
    marginTop: hp('2.5%'),
    borderRadius: wp('5%'),
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: wp('5%'),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  overlayText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#333',
  },
});
