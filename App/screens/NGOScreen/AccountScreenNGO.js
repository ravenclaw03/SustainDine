import React, { useState, useEffect } from "react";
import { Alert, Image } from "react-native";
import { Text, StyleSheet, View, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function AccountScreenNGO() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'fetching details...',
    email: 'fetching details...',
    contact: 'fetching details...',
    address: 'fetching details...',
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
      setIsLoading(true);
      const response = await axios.get("https://minor-project-wss9.vercel.app/logout");
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          navigation.navigate("Welcome");
        }, 100);
      }, 6000);
    } catch(error)
    {
      Alert.alert("Error","Couldn't log you out!")
      console.log("Error in logout")
    }
  }

  useEffect(() => {
    fetchUserDataFromBackend();
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserDataFromBackend();
    setRefreshing(false);
  };


  

  return (
    <ScrollView style={styles.c} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
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
        {isLoading && (
          <View style={styles.overlay}>
            <Image
              source={require("../../assets/images/login.gif")}
              style={styles.loginIMG}
            />
          </View>
        )}
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  c:{
    flex: 1,
  },
  container: {
    marginTop: hp("8%"),
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#F5F5F5", 
    height: hp('70%'),
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
    backgroundColor: "#50C878",
    padding: wp('2.25%'), 
    borderRadius: wp('5%'), 
    marginHorizontal: wp('2.5%'),
    flexDirection: "row",
  },
  logoutText: {
    fontSize: hp('2%'),
    marginRight: wp('2%'),
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loginIMG: {
    width: wp("65%"),
    height: wp("65%"),
  },
});
