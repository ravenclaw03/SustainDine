import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 

export default function AccountScreenDP() {
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
        <TouchableOpacity style={styles.iconButton}>
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
    top: 20,
    left: 20,
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
  },
  profileInfo: {
    marginLeft: 10,
    flexDirection: "row",
  },
  label: {
    fontSize: 25,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333", 
    marginBottom: 15,
    marginLeft: 20,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: "#0096FF",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
