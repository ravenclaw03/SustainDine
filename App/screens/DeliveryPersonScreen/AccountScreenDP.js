import React from "react";
import { Alert } from "react-native";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

export default function AccountScreenDP() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.navigate("Welcome");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>ABC</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>xyz@mail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} >
          <AntDesign name="edit" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
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
    height: hp("25%"),
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
    backgroundColor: "#0096FF",
    padding: wp('2.25%'), 
    borderRadius: wp('5%'), 
    marginHorizontal: wp('2.5%'),
  },
});
