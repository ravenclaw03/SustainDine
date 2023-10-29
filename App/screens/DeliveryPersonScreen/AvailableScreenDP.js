import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import IconButton from "../../UI/IconButton";

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
      'Order Declined',
      'Do you want to ask again?',
      [
        {
          text: 'Yes',
          onPress: () => console.log('Ask again'),
          style: 'default',
        },
        {
          text: 'No',
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
    paddingVertical: 20,
  },
  cardContainer: {
    width: 450,
    height: 180,
    margin: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#e3e3e3",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  noRequestContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cont: {
    height: 50,
    width: 300,
    marginTop: 300,
    borderRadius: 20,
    alignContent: "center",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#0096FF",
  },
  text: {
    marginLeft: 55,
    fontSize: 18,
  },
  refreshButton: {
    backgroundColor: "#0096FF",
    padding: 10,
    marginTop: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "green",
    padding: 10,
    width: 90,
    alignItems: "center",
    borderRadius: 5,
  },
  declineButton: {
    backgroundColor: "red",
    padding: 10,
    width: 90,
    alignItems: "center",
    borderRadius: 5,
  },
});
