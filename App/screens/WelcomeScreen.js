import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    marginBottom: hp('5%'),
  },
  sustaindineText: {
    color: "black",
    fontWeight: "bold",
    fontSize: wp('8%'),
    textAlign: "center",
    padding: wp('5%'),
    marginBottom: hp('5%'),
  },
  imgCont: {
    flexDirection: "row",
    justifyContent: "center",
  },
  gifHolder: {
    width: wp('100%'), 
    height: hp('40%'), 
    borderRadius: wp('5%'), 
    padding: wp('5%'),
    marginBottom: hp('2%'),
  },
  signupCont: {
    marginTop: hp('8%'),
    marginBottom: hp('8%'),
    alignContent: "space-around",
  },
  sigupButton: {
    paddingTop: hp('1.5%'), 
    paddingBottom: hp('1.5%'), 
    backgroundColor: "orange",
    marginLeft: wp('15%'), 
    marginRight: wp('15%'), 
    borderRadius: wp('4%'),
  },
  signupText: {
    fontSize: wp('4%'),
    fontWeight: "700",
    textAlign: "center",
    color: "black",
  },
  bottomCont: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp('2%'),
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
