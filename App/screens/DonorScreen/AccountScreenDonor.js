import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons"; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute } from "@react-navigation/native";

export default function AccountScreenDonor({ data}) {
  const route = useRoute();
  const name = route.params?.passedData || 'Default Value';
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          
          <Text style={styles.value}>{data|| 'Default Name'} </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>xyz@mail.com</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('2%'),
  },
  greeting: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: hp('10%'),
  },
  profileInfo: {
    marginLeft: wp('2%'),
    flexDirection: 'row',
  },
  label: {
    fontSize: hp('3%'),
    color: '#666',
    marginBottom: hp('1%'),
  },
  value: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('2%'),
    marginLeft: wp('4%'),
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#FFA500',
    padding: hp('1.5%'),
    borderRadius: wp('10%'),
    marginHorizontal: wp('2%'),
  },
});
