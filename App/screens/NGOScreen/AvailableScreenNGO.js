import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";

export default function AvailableScreenNGO() {
  const [showInputFields, setShowInputFields] = useState(false);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [showRequestContainer, setShowRequestContainer] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [totalFoodWeight, setTotalFoodWeight] = useState("");


  const refreshOrders = () => {
    // Generate dummy orders
    const dummyOrders = [
      { foodType: "Fruits", totalFoodWeight: "50 kg" },
      { foodType: "Vegetables", totalFoodWeight: "30 kg" },
      { foodType: "Grains", totalFoodWeight: "70 kg" },
      { foodType: "Dairy Products", totalFoodWeight: "20 kg" },
    ];

    setAvailableOrders(dummyOrders);
  };

  const acceptOrder = (index) => {
    const updatedOrders = availableOrders.filter((_, i) => i !== index);
    setAvailableOrders(updatedOrders);
  };

  const declineOrder = (index) => {
    const updatedOrders = availableOrders.filter((_, i) => i !== index);
    setAvailableOrders(updatedOrders);
  };

  const handleRequestToggle = () => {
    setShowInputFields((prev) => !prev);
    setShowRequestContainer(!showRequestContainer);
  };

  const handleSubmission = () => {
    if (!foodType || !totalFoodWeight) {
      Alert.alert("Error", "Please fill in all fields.");
    } else {
      // Add the request logic here
      setShowRequestContainer(false);
      // Clear input fields
      setShowInputFields(false);
      setFoodType("");
      setTotalFoodWeight("");
    
    }
  };

  return (
    <View style={styles.outerCont}>
      <View style={styles.column}>
      <View style={styles.requestRow}>
          <TouchableOpacity style={styles.cont} onPress={handleRequestToggle}>
            <Text style={styles.text}>{showInputFields ? 'Make a new request -' : 'Make a new request +'}</Text>
          </TouchableOpacity>
        </View>
        {showRequestContainer && (
          <ScrollView style={styles.requestContainer}>
            <View style={styles.requestContainer}>
              <Text style={styles.label}>Food Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Food Type"
                value={foodType}
                onChangeText={(text) => setFoodType(text)}
              />
              <Text style={styles.label}>Total Food Weight</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Total Food Weight"
                value={totalFoodWeight}
                onChangeText={(text) => setTotalFoodWeight(text)}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>


          </ScrollView>
        )}
      </View>
      <View style={styles.column}>
        {availableOrders.length === 0 ? (
          <View>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.refreshText}>   No new offers available :(</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshOrders}>
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {availableOrders.map((order, index) => (
              <View style={styles.orderCard} key={index}>
                <Text>Food Type: {order.foodType}</Text>
                <Text>Total Food Weight: {order.totalFoodWeight}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => acceptOrder(index)}
                  >
                    <Text>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => declineOrder(index)}
                  >
                    <Text>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    margin: 10,
    marginTop: 10,
    width: 450,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
  },
  cont: {
    height: 50,
    width: 300,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#50C878",
    margin: 20,
  },
  text: {
    fontSize: 18,
  },
  browseButton: {
    height: 50,
    width: 300,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#50C878",
    margin: 20,
  },
  refreshButton: {
    height: 50,
    width: 100,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#50C878",
    margin: 20,
    marginLeft: 125,
  },
  refreshText: {
    fontSize: 18,
  },
  scrollView: {
    width: "100%",
    marginLeft: 30,
  },
  orderCard: {
    backgroundColor: "#C0C0C0",
    padding: 10,
    margin: 10,
    width: 400,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 5,
  },
  declineButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  requestContainer: {
    backgroundColor: "#e3e3e3",
    padding: 10,
    margin: 10,
    width: 400,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#50C878",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  plusButton: {
    backgroundColor: "blue",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  plusButtonText: {
    color: "white",
    fontSize: 20,
  },
  requestRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  requestContainer: {
    backgroundColor: "#e3e3e3",
    padding: 10,
    margin: 10,
    width: 400,
    borderRadius: 10,
  },
  requestContainer: {
    backgroundColor: "#e3e3e3",
    width: 400,
    borderRadius: 10,
  },
});
