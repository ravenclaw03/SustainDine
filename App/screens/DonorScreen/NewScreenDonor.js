import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView, Switch } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

export default function NewScreenDonor() {
  const [showInputFields, setShowInputFields] = useState(false);
  const [type, setType] = useState('');
  const [numberOfPlates, setnumberOfPlates] = useState('');
  const [requestGenerated, setRequestGenerated] = useState(false);
  const [requests, setRequests] = useState([]);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const handleRequestClick = () => {
    setShowInputFields((prev) => !prev);
  };

  const handleTypeChange = (text) => {
    setType(text);
  };

  const handlenumberOfPlates = (text) => {
    setnumberOfPlates(text);
  };

  const handleSubmission = async () => {
    if (!type || !numberOfPlates ) {
      Alert.alert('Error', 'Please fill in all fields.');
    } else {

      try{
        console.log(type)
        console.log(numberOfPlates)
        console.log(isVegetarian)
        const response = await axios.post("https://minor-project-wss9.vercel.app/foodReq/new",{type, numberOfPlates, isVegetarian});
        console.log(response.data);
        setRequests((prevRequests) => [
          ...prevRequests,
          { type, numberOfPlates, isVegetarian }
        ]);
        setRequestGenerated(true);
        setTimeout(() => {
        setRequestGenerated(false);
      }, 4000);
      }catch(error){
        console.log("error in handleSubmission");
        console.log(error);
        Alert.alert("Error!", "Request cannot be initiated");
        setShowInputFields(false);
        setType('');
        setnumberOfPlates('');
        setIsVegetarian(false); 
      }
      
    }
  };

  const deleteRequest = async (index) => {
    try{
      const response = await axios.post("https://minor-project-wss9.vercel.app/new",{});
      console.log(response.data);
      const updatedRequests = requests.filter((_, i) => i !== index);
      setRequests(updatedRequests);
    }catch(error){
      console.log("error in deleteRequest");
      console.log(error);
      Alert.alert("Error!", "Request cannot be initiated");
    }
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
            onChangeText={handleTypeChange}
            value={type}
          />
          <Text style={styles.heading}>Total no. of Plates</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Total no. of plates"
            onChangeText={handlenumberOfPlates}
            value={numberOfPlates}
            keyboardType="numeric"
          />
          <View style={styles.switchContainer}>
            <Text style={styles.heading}>Is Veg?</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isVegetarian ? "#3cb043" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsVegetarian(previousState => !previousState)}
              value={isVegetarian}
            />
          </View>
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
              <Text style={styles.textcont}>Food Type: {request.type}</Text>
              <Text style={styles.textcont}>Total no. of Plates: {request.numberOfPlates}</Text>
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
    height: hp('6%'),
    width: wp('60%'),
    marginTop: hp('4%'),
    borderRadius: wp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  text: {
    marginLeft: wp('10%'),
    fontSize: hp('2%'),
  },
  heading: {
    fontSize: hp('1.5%'),
    marginVertical: hp('1%'),
  },
  cardContainer: {
    marginTop: hp('2%'),
    padding: wp('4%'),
    width: wp('85%'),
    borderRadius: wp('3%'),
    backgroundColor: '#e3e3e3',
  },
  input: {
    height: hp('4%'),
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: hp('1%'),
    paddingLeft: wp('2%'),
    borderRadius: wp('2%'),
  },
  button: {
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    backgroundColor: 'orange',
  },
  buttontxt: {
    fontSize: hp('2%'),
  },
  submitButton: {
    backgroundColor: 'orange',
    padding: hp('1%'),
    marginTop: hp('1.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: hp('1.8%'),
  },
  animationContainer: {
    marginVertical: hp('2%'),
    marginTop: hp('1%'),
    padding: wp('5%'),
    width: wp('80%'),
    backgroundColor: '#C3E3E3',
    borderRadius: wp('3%'),
    alignItems: 'center',
  },
  animationText: {
    fontSize: hp('1.75%'),
    textAlign: 'center',
  },
  requestContainer: {
    marginTop: hp('2%'),
    maxHeight: hp('80%'),
  },
  requestCard: {
    backgroundColor: '#e3e3e3',
    padding: wp('2.5%'),
    marginVertical: hp('1%'),
    width: wp('85%'),
    height: hp('10%'),
    borderRadius: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcont: {
    marginRight: wp('25%'),
    fontSize: hp('1.6%'),
  },
  deleteButton: {
    backgroundColor: "red",
    padding: hp('1%'),
    borderRadius: wp('2%'),
  },
  noRequestText: {
    fontSize: hp('2%'),
    marginTop: hp('35%'),
    color: 'gray',
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
});
