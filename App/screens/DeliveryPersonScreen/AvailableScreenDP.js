import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";

export default function AvailableScreenDP() {

  const [totalOrders, setTotalOrders] = useState({
    count: 0,
  });
  const [availableOrders, setAvailableOrders] = useState([]);


  const refreshOrders = async () => {
    try {
      const response = await fetch("https://minor-project-wss9.vercel.app/foodReq/showactvDP");
      const data = await response.json();
      setAvailableOrders(data.data);
      setTotalOrders(data.count);
    } catch (error) {
      console.log("Error fetching orders:", error.message);
      Alert.alert("Error", "Failed to fetch orders. Please try again later.");
    }
  };

  refreshOrders();


  const acceptOrder = async (id) => {
    console.log(id);
    try{
      const response = await axios.put(`https://minor-project-wss9.vercel.app/foodReq/closeDP/${id}`);
      console.log(response.data);
    }catch(error){
      console.log(error.message);
    }
    const updatedOrders = availableOrders.filter((_, i) => i !== id);
    setAvailableOrders(updatedOrders);
  };

  return (
    <View style={styles.outerCont}>
          <ScrollView style={styles.scrollView}>
              {availableOrders.map((item, index) => (
              <View style={styles.orderCard} key={index}>
                <View style={styles.orderInfo}>
                  <Text style={styles.text}>Food Type: {item.type}</Text>
                  <Text style={styles.text}>No. of Plates: {item.numberOfPlates}</Text>
                  <Text style={styles.text}>Is Veg: {item.isVegetarian ? 'Yes' : 'No'}</Text>
                  </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => acceptOrder(item._id)}
                  >
                    <Text style={styles.acceptText}>Accept</Text>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
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
  orderInfo: {
    flex: 1,
  },
  text: {
    fontSize: wp('3.75%'),
    marginLeft: wp('2%'),
    marginBottom: hp('0.75%'),
    marginTop: hp('0.75%'),
  },
  acceptText: {
    fontSize: wp('3.75%'),
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
    marginTop: hp("2%"),
    marginLeft: wp('8%'),
  },
  orderCard: {
    backgroundColor: "white",
    padding: wp('2%'),
    margin: wp('2.5%'),
    marginLeft: wp('4%'),
    width: wp('85%'),
    borderRadius: wp('2%'),
    fontSize: wp("5%"),
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "#32de84",
    padding: wp('2.5%'),
    marginTop: hp('3%'),
    borderRadius: wp('5%'),
    marginRight: wp('2%')
  },

  requestContainer: {
    backgroundColor: "white",
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

  requestContainer: {
    backgroundColor: "white",
    padding: wp('2%'),
    margin: wp('2%'),
    width: wp('85%'),
    borderRadius: wp('2%'),
  },
  requestContainer: {
    backgroundColor: "white",
    width: wp('80%'),
    borderRadius: wp('2%'),
  },
});
