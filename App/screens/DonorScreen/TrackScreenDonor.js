import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

export default function TrackScreenDonor() {
  const [dpDetails, setDpDetails] = useState(null);
  const [ngoDetails, setNgoDetails] = useState(null);

  const fetchNgoDetails = async () => {
    try {
      const response = await fetch("https://minor-project-wss9.vercel.app/foodReq/userProgress");
      const data = await response.json();
      setNgoDetails(data.data);
      console.log(data.data);
    } catch (error) {
      console.log("Error fetching NGO details:");
      console.log(error);
      Alert.alert("Error!", "Failed to fetch NGO details");
    }
  };

  const fetchDpDetails = async () => {
    try {
      const response = await fetch("https://minor-project-wss9.vercel.app/foodReq/userProgress");
      const data = await response.json();
      setDpDetails(data.data)
      //console.log(data.data);
    } catch (error) {
      console.log("Error fetching accepted request:");
      console.log(error);
      Alert.alert("Error!", "Failed to fetch accepted request");
    }
  };

  fetchNgoDetails();
  fetchDpDetails();

  // const handleRefresh = () => {
  //   fetchAcceptedRequest();
  //   fetchNgoDetails();
  // };

  return (
    <View style={styles.outerCont}>
    {/* Card for NGO Details */}
      <TouchableOpacity style={styles.cardContainer}>
        <Text style={styles.heading}>NGO Details</Text>
        {ngoDetails ? (
          <View style={styles.requestCard}>
            <View>
              <Text style={styles.textcont}>NGO Name: {ngoDetails._id}</Text>
              <Text style={styles.textcont}>Location: {ngoDetails.location}</Text>
              {/* Add more NGO details as needed */}
            </View>
          </View>
        ) : (
          <Text>No NGO details found</Text>
        )}
      </TouchableOpacity>

      {/* Card for Accepted Request */}
      <TouchableOpacity style={styles.cardContainer}>
        <Text style={styles.heading}>Delivery Person Details</Text>
        {dpDetails ? (
          <View style={styles.requestCard}>
            <View>
              <Text style={styles.textcont}>Food Type: {dpDetails.foodType}</Text>
              <Text style={styles.textcont}>Total no. of Plates: {dpDetails.noOfPlates}</Text>
              <Text style={styles.textcont}>Is Veg?: {dpDetails.isVeg ? "Yes" : "No"}</Text>
            </View>
          </View>
        ) : (
          <Text>No active request found</Text>
        )}
      </TouchableOpacity>




      {/* <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  outerCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    padding: wp('4%'),
    width: wp('90%'),
    borderRadius: wp('3%'),
    backgroundColor: '#e3e3e3',
    marginBottom: hp('2%'),
  },
  heading: {
    fontSize: hp('2%'),
    marginBottom: hp('2%'),
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: wp('2.5%'),
    borderRadius: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcont: {
    fontSize: hp('1.6%'),
    marginBottom: hp('1%'),
  },
  refreshButton: {
    backgroundColor: 'orange',
    padding: wp('2%'),
    borderRadius: wp('2%'),
  },
  refreshButtonText: {
    fontSize: hp('1.8%'),
    color: 'white',
  },
  ngoCardContainer: {
    padding: wp('4%'),
    width: wp('90%'),
    borderRadius: wp('3%'),
    backgroundColor: '#e3e3e3',
    marginBottom: hp('2%'),
  },
});
