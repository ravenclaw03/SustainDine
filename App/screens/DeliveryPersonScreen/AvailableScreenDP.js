import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import IconButton from "../../UI/IconButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function AvailableScreenDP() {
  const [foodDonations, setFoodDonations] = useState([
    {
      totalWeight: 10,
      foodType: "Vegetables",
      distance: 5,
    },
    {
      totalWeight: 15,
      foodType: "Fruits",
      distance: 8,
    },
    {
      totalWeight: 15,
      foodType: "Fruits",
      distance: 8,
    },
    {
      totalWeight: 15,
      foodType: "Fruits",
      distance: 8,
    },
    {
      totalWeight: 15,
      foodType: "Fruits",
      distance: 8,
    },
    // Add more initial donations if needed
  ]);

  const handleAccept = (index) => {
    console.log("Accepted donation at index:", index);
    const acceptedOrder = foodDonations[index];
    setFoodDonations((prevDonations) => {
      const updatedDonations = prevDonations.filter((_, i) => i !== index);
      return updatedDonations;
    });

    // Logic for what to do with the accepted order
  };

  const handleDecline = (index) => {
    console.log("Declined donation at index:", index);
    Alert.alert(
      'Order Declined!',
      'Are you sure you want to decline the order?',
      [
        {
          text: 'No',
          onPress: () => console.log('Ask again'),
          style: 'default',
        },
        {
          text: 'Yes',
          onPress: () => {
            setFoodDonations((prevDonations) => {
              const updatedDonations = prevDonations.filter((_, i) => i !== index);
              return updatedDonations;
            });
          },
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleRefresh = () => {
    // Simulated API call to check for new requests
    const newRequests = [
      {
        totalWeight: 20,
        foodType: "Bakery",
        distance: 3,
      },
      // Add more new requests if available
    ];

    if (newRequests.length > 0) {
      setFoodDonations(newRequests);
    } else {
      // Show a floating message or alert that no new requests are available
      Alert.alert('No New Requests', 'No new requests available at the moment.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.outerCont}>
      {foodDonations.length > 0 ? (
        foodDonations.map((donation, index) => (
          <View style={styles.cardContainer} key={index}>
            <Text style={styles.label}>Total Food Weight: {donation.totalWeight} kgs</Text>
            <Text style={styles.label}>Food Type: {donation.foodType}</Text>
            <Text style={styles.label}>Distance: {donation.distance} km away</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleAccept(index)} style={styles.acceptButton}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDecline(index)} style={styles.declineButton}>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noRequestContainer}>
          <View style={styles.cont}>
            <Text style={styles.text}>No new requests available! </Text>
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    alignItems: "center",
    paddingVertical: hp('1.5%'),
  },
  cardContainer: {
    width: wp('90%'), 
    height: hp('18%'),
    margin: wp('4%'),
    padding: wp('3%'),
    borderRadius: wp('3.75%'),
    backgroundColor: "#e3e3e3",
    justifyContent: "space-between",
  },
  label: {
    fontSize: wp('3.25%'),
    marginBottom: hp('1%'),
  },
  noRequestContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cont: {
    height: hp('6%'), 
    width: wp('60%'),
    marginTop: hp('35%'), 
    borderRadius: wp('5%'),
    alignContent: "center",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#0096FF",
  },
  text: {
    marginLeft: wp('10%'),
    fontSize: wp('3.75%'),
  },
  refreshButton: {
    backgroundColor: "#0096FF",
    padding: hp('1.25%'),
    marginTop: hp('3%'), 
    borderRadius: wp('2%'),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp('2%'),
  },
  acceptButton: {
    backgroundColor: "green",
    padding: hp('1%'),
    width: wp('22.5%'), 
    alignItems: "center",
    borderRadius: hp('2%'),
  },
  declineButton: {
    backgroundColor: "red",
    padding: hp('1%'),
    width: wp('22.5%'), 
    alignItems: "center",
    borderRadius: hp('2%'),
  },
});
