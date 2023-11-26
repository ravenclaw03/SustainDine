import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

export default function TrackScreenDonor() {
  const [acceptedRequest, setAcceptedRequest] = useState(null);

  const fetchAcceptedRequest = async () => {
    try {
      const response = await axios.get("https://minor-project-wss9.vercel.app/showactv");
      setAcceptedRequest(response.data);
    } catch (error) {
      console.log("Error fetching accepted request:");
      console.log(error);
      Alert.alert("Error!", "Failed to fetch accepted request");
    }
  };

  const handleRefresh = () => {
    fetchAcceptedRequest();
  };

  return (
    <View style={styles.outerCont}>
      <TouchableOpacity style={styles.cardContainer}>
        <Text style={styles.heading}>Accepted Request</Text>
        {acceptedRequest ? (
          <View style={styles.requestCard}>
            <View>
              <Text style={styles.textcont}>Food Type: {acceptedRequest.foodType}</Text>
              <Text style={styles.textcont}>Total no. of Plates: {acceptedRequest.noOfPlates}</Text>
              <Text style={styles.textcont}>Is Veg?: {acceptedRequest.isVeg ? "Yes" : "No"}</Text>
            </View>
          </View>
        ) : (
          <Text>No active request found</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
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
});
