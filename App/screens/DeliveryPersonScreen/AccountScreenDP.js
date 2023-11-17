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
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>ABC</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>xyz@mail.com</Text>
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
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#F5F5F5", 
  },
  header: {
    position: "absolute",
    top: hp('1.25%'), 
    left: wp('2.5%'), 
  },
  greeting: {
    fontSize: wp('5%'),
    fontWeight: "bold",
    color: "#333",
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: hp('6%'),
  },
  profileInfo: {
    marginLeft: wp('2.5%'),
    flexDirection: "row",
  },
  label: {
    fontSize: wp('6%'),
    color: "#666",
    marginBottom: hp('1.25%'),
  },
  value: {
    fontSize: wp('6.25%'), 
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp('2%'), 
    marginLeft: wp('5%'), 
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
