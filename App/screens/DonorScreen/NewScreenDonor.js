import React from "react";
import { Text, StyleSheet, View } from "react-native";
import IconButton from "../../UI/IconButton";

export default function NewScreenDonor() {
  return (
    <View style={styles.outerCont}>

      <View style={styles.cont}>
        <Text style={styles.text}>Make a new request! </Text>
        <IconButton icon="add" color="black" size={24} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  outerCont:{
    flex:1,
    alignItems: 'center',
  },
  cont: {
    height: 50,
    width: 300,
    marginTop: 20,
    borderRadius: 20,
    alignContent: "center",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "orange",
  },
  text: {
    marginLeft: 55,
    fontSize: 18,
  }
});
