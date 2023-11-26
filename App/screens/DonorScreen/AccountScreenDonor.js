import React, { useState } from "react";
import { Alert } from "react-native";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function AccountScreenDonor() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    fullName: 'Default Name',
    email: 'xyz@mail.com',
    contact: '123-456-7890',
    address: 'unknown'
  });

  const fetchUserDataFromBackend = async () => {
    try {
      const response = await fetch("https://minor-project-wss9.vercel.app/currentUser");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      //console.log("Error fetching user data");
    }
  };

  const logoutHandler = async () => {
    try{
      const response = await axios.get("https://minor-project-wss9.vercel.app/logout");
      navigation.navigate("Welcome");
    } catch(error)
    {
      Alert.alert("Error","Couldn't log you out!")
      console.log("Error in logout")
    }
  }


  fetchUserDataFromBackend();

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.fullName}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{userData.contact}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{userData.address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={logoutHandler}>
          <Text style={styles.logoutText}>Logout</Text>
          <AntDesign name="logout" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("8%"),
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#F5F5F5", 
  },
  cardContainer: {
    width: wp('90%'),
    height: hp("40%"),
    backgroundColor: "#fff",
    borderRadius: wp('5%'),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: hp('6%'),
    padding: wp('5%'),
  },
  cardContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  profileInfo: {
    flexDirection: "row",
    marginTop: hp("3%"),
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('5%'),
    color: "#666",
    marginRight: wp('2%'),
  },
  value: {
    fontSize: wp('5%'), 
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: "orange",
    padding: wp('2.25%'), 
    borderRadius: wp('5%'), 
    marginHorizontal: wp('2.5%'),
    flexDirection: "row",
  },
  logoutText: {
    fontSize: hp('2%'),
    marginRight: wp('2%'),
  },
});
