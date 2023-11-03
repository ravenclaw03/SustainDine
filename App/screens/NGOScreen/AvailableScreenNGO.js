import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    margin: wp('1.5%'),
    marginTop: hp('1.5%'),
    width: wp('90%'),
    borderRadius: wp('4%'),
    borderWidth: 1,
    borderColor: 'gray',
  },
  cont: {
    height: hp('5%'),
    width: wp('60%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50C878',
    margin: wp('4%'),
  },
  text: {
    fontSize: wp('4%'),
  },
  browseButton: {
    height: hp('5%'),
    width: wp('60%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50C878',
    margin: wp('4%'),
  },
  refreshButton: {
    height: hp('5%'),
    width: wp('25%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50C878',
    margin: wp('4%'),
    marginLeft: wp('20%'),
  },
  refreshText: {
    fontSize: wp('3.75%'),
  },
  scrollView: {
    width: wp('100%'),
    marginLeft: wp('8%'),
  },
  orderCard: {
    backgroundColor: "#C0C0C0",
    padding: wp('2%'),
    margin: wp('2.5%'),
    marginLeft: wp('4%'),
    width: wp('85%'),
    borderRadius: wp('2%'),
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp('1%'),
  },
  acceptButton: {
    backgroundColor: "green",
    padding: wp('1.6%'),
    borderRadius: wp('1%'),
  },
  declineButton: {
    backgroundColor: "red",
    padding: wp('1.6%'),
    borderRadius: wp('1%'),
  },
  requestContainer: {
    backgroundColor: "#e3e3e3",
    padding: wp('2%'),
    margin: wp('2%'),
    width: wp('85%'),
    borderRadius: wp('2%'),
  },
  label: {
    fontSize: wp('3%'),
    marginVertical: hp('0.8%'),
  },
  input: {
    height: hp('5%'),
    borderColor: "black",
    borderWidth: 1,
    marginBottom: hp('1%'),
    paddingLeft: wp('2.6%'),
    borderRadius: wp('1%'),
  },
  submitButton: {
    backgroundColor: "#50C878",
    padding: wp('2%'),
    marginTop: hp('1%'),
    borderRadius: wp('2%'),
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: wp('3.2%'),
  },
  plusButton: {
    backgroundColor: "blue",
    width: wp('8%'),
    height: hp('4%'),
    borderRadius: wp('4%'),
    alignItems: "center",
    justifyContent: "center",
    margin: wp('2%'),
  },
  plusButtonText: {
    color: "white",
    fontSize: wp('4.8%'),
  },
  requestRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  requestContainer: {
    backgroundColor: "#e3e3e3",
    padding: wp('2%'),
    margin: wp('2%'),
    width: wp('85%'),
    borderRadius: wp('2%'),
  },
  requestContainer: {
    backgroundColor: "#e3e3e3",
    width: wp('80%'),
    borderRadius: wp('2%'),
  },
});
