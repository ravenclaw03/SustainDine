import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.outermostCont}>
      <SafeAreaView className="flex">
        <View style={styles.backArrowView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backbutton}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imgCont}>
          <Image
            source={require("../assets/images/signup.png")}
            style={{ width: 170, height: 120 }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.inputCont}>
        <View className="form space-y-2">
          <Text style={styles.attributeName}>Full Name</Text>
          <TextInput style={styles.inputBox} placeholder="Enter Name" />
          <Text style={styles.attributeName}>Email Address</Text>
          <TextInput style={styles.inputBox} placeholder="Enter Email" />
          <Text style={styles.attributeName}>Password</Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry
            placeholder="Enter Password"
          />
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.or}>Or</Text>
        <View style={styles.bottomCont}>
          <TouchableOpacity style={styles.bottomInnerCont}>
            <Image
              source={require("../assets/icons/google.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomInnerCont}>
            <Image
              source={require("../assets/icons/apple.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomInnerCont}>
            <Image
              source={require("../assets/icons/facebook.png")}
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lastCont}>
          <Text style={styles.textBlock}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.login}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outermostCont: {
    flex: 1,
    backgroundColor: themeColors.bg,
    marginTop: 10,
  },
  backArrowView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imgCont: {
    flexDirection: "row",
    justifyContent: "center",
  },
  backbutton: {
    backgroundColor: "orange",
    padding: 8,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 25,
  },
  inputCont: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  inputBox: {
    padding: 16,
    backgroundColor: "#F3F4F6",
    color: "#4A5568",
    borderRadius: 16,
    marginBottom: 16,
  },
  attributeName: {
    color: "black",
    fontWeight: "400",
    marginLeft: 15,
  },
  signupButton: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "orange",
    borderRadius: 12,
  },
  signup: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  or: {
    fontSize: 20,
    color: "#4a5568",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  bottomCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  bottomInnerCont: {
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
  },
  img: {
    width: 40,
    height: 40,
  },
  lastCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  textBlock: {
    color: "#718096",
    fontWeight: "600",
  },
  login: {
    fontWeight: "600",
    color: "orange",
  },
});
