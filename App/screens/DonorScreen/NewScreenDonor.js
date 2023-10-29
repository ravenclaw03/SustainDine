import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import IconButton from "../../UI/IconButton";

export default function NewScreenDonor() {
  const [showInputFields, setShowInputFields] = useState(false);
  const [foodType, setFoodType] = useState('');
  const [totalFoodWeight, setTotalFoodWeight] = useState('');
  const [requestGenerated, setRequestGenerated] = useState(false);
  const [requests, setRequests] = useState([]);

  const handleRequestClick = () => {
    setShowInputFields((prev) => !prev);
  };

  const handleFoodTypeChange = (text) => {
    setFoodType(text);
  };

  const handleTotalWeightChange = (text) => {
    setTotalFoodWeight(text);
  };

  const handleSubmission = () => {
    if (!foodType || !totalFoodWeight) {
      Alert.alert('Error', 'Please fill in all fields.');
    } else {
      setRequests((prevRequests) => [
        ...prevRequests,
        { foodType, totalFoodWeight }
      ]);
      setFoodType('');
      setTotalFoodWeight('');
      setShowInputFields(false);
      setRequestGenerated(true);
      setTimeout(() => {
        setRequestGenerated(false);
      }, 4000);
    }
  };

  const deleteRequest = (index) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
  };

  return (
    <View style={styles.outerCont}>
      <View style={styles.cont}>
        <Text style={styles.text}>Make a new request! </Text>
        <TouchableOpacity style={styles.button} onPress={handleRequestClick}>
          <Text style={styles.buttontxt}>{showInputFields ? '-' : '+'}</Text>
        </TouchableOpacity>
      </View>

      {showInputFields && (
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Food Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Food Type"
            onChangeText={handleFoodTypeChange}
            value={foodType}
          />
          <Text style={styles.heading}>Total Food Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Total Food Weight"
            onChangeText={handleTotalWeightChange}
            value={totalFoodWeight}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {requestGenerated && (
        <View style={styles.animationContainer}>
          <Text style={styles.animationText}>
            New request has been generated. Kindly wait till a nearby delivery person accepts your order.
          </Text>
        </View>
      )}

      {requests.length === 0 && (
        <View>
          <Text style={styles.noRequestText}>
            Sharing is caring!  {"\n"} Share now someone is waiting eagerly 👀
          </Text>
        </View>
        
      )}

      <ScrollView style={styles.requestContainer}>
        {requests.map((request, index) => (
          <View style={styles.requestCard} key={index}>
            <View>
              <Text style={styles.textcont}>Food Type: {request.foodType}</Text>
              <Text style={styles.textcont}>Total Food Weight: {request.totalFoodWeight}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => deleteRequest(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    alignItems: 'center',
  },
  cont: {
    height: 50,
    width: 300,
    marginTop: 20,
    borderRadius: 20,
    alignContent: "center",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "orange",
  },
  text: {
    marginLeft: 55,
    fontSize: 18,
  },
  heading: {
    fontSize: 15,
    marginVertical: 5,
  },
  cardContainer: {
    marginTop: 20,
    padding: 20,
    width: 400,
    borderRadius: 10,
    backgroundColor: "#e3e3e3",
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "orange",
  },
  buttontxt: {
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: "orange",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  animationContainer: {
    marginVertical: 20,
    marginTop: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#C3E3E3',
    borderRadius: 10,
    alignItems: 'center',
  },
  animationText: {
    fontSize: 18,
    textAlign: 'center',
  },
  requestContainer: {
    marginTop: 20,
    maxHeight: 1000,
  },
  requestCard: {
    backgroundColor: "#e3e3e3",
    padding: 10,
    marginVertical: 5,
    width: 400,
    height: 100,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textcont: {
    marginRight: 150,
    fontSize:16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  noRequestText: {
    fontSize: 20,
    marginTop: 400,
    color: "gray",
    textAlign: "center",
  },
});
