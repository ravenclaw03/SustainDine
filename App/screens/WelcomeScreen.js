import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.outermostCont}>
      <View style={styles.cont}>
        <Text style={styles.sustaindineText}>SustainDine</Text>
        <View style={styles.imgCont}>
          <Image
            source={require("../assets/images/welcome.gif")}
            style={styles.gifHolder}
          />
        </View>
        <View style={styles.signupCont}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.sigupButton}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.bottomCont}>
            <Text style={styles.text1}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  outermostCont: {
    flex: 1,
    backgroundColor: themeColors.bg,
  },
  cont: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 80,
  },
  sustaindineText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    padding: 20,
    marginBottom: 50,
  },
  imgCont: {
    flexDirection: "row",
    justifyContent: "center",
  },
  gifHolder: {
    width: 450,
    height: 350,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  signupCont: {
    marginTop: 50,
    marginBottom: 50,
    alignContent: "space-around",
  },
  sigupButton: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "orange",
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 15,
  },
  signupText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "black",
  },
  bottomCont: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  text1: {
    color: "black",
    fontWeight: "700",
  },
  loginText: {
    color: "orange",
    fontWeight: "700",
  },
});
