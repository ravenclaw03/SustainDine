import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";


export default function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const googleLogin = async () => {
    console.log("Hello google");
  };

  const forgot = async () => {
    Alert.alert("😵‍💫🤯", "Contact Admin for further help!");
  };

  const handleLogin = async () => {
    let isValid = true;

    if (!validateEmail() || !validatePassword()) {
      isValid = false;
    }

    if (isValid) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://minor-project-wss9.vercel.app/login",
          { email, password }
        );

        setTimeout(() => {
          Alert.alert("Success", `Welcome ${response.data.fullName}`);
          setIsLoading(false);
          setTimeout(() => {
            if (response.data.type === 1) {
              navigation.navigate("Donor", { passedData: response.data.fullName });
            } else if (response.data.type === 2) {
              navigation.navigate("NGO");
            } else if (response.data.type === 3) {
              navigation.navigate("DP");
            }
          }, 100); // Adjust the delay time as needed
        }, 6000);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        Alert.alert(
          "Error Authentication failed",
          "Please check your email and password or try again later."
        );
      }
    } else {
      Alert.alert("Error", "Please fill in all the fields correctly.");
    }

  };

  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.outermostCont}>
        <SafeAreaView className="flex ">
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
              source={require("../assets/images/login.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </SafeAreaView>
        <View style={styles.innerCont}>
          <View className="form space-y-2">
            <Text style={styles.attributeName}>Email Address</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Email"
              onChangeText={(text) => {
                setEmail(text);
                setEmailError("");
              }}
            />
            <Text style={styles.errorText}>{emailError}</Text>

            <Text style={styles.attributeName}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.inputBox2}
                secureTextEntry={!showPassword}
                placeholder="Enter Password"
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorText}>{passwordError}</Text>
            <TouchableOpacity style={styles.forgotCont} onPress={forgot}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
            {isLoading && (
              <View style={styles.overlay}>
                <Image
                  source={require("../assets/images/login.gif")}
                  style={styles.loginIMG}
                />
              </View>
            )}
          </View>
          <Text style={styles.or}>Or</Text>
          <View style={styles.bottomCont}>
            <TouchableOpacity
              style={styles.bottomInnerCont}
              onPress={googleLogin}
            >
              <Image
                source={require("../assets/icons/google.png")}
                style={styles.img}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.lastCont}>
            <Text style={styles.textBlock}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signup}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  outermostCont: {
    flex: 1,
    backgroundColor: themeColors.bg,
    marginTop: hp("1%"),
    height: 1050,
  },
  backArrowView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imgCont: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: wp("4%"),
  },
  backbutton: {
    backgroundColor: "orange",
    padding: wp("2%"),
    borderTopRightRadius: wp("2%"),
    borderBottomLeftRadius: wp("2%"),
    marginLeft: wp("6%"),
  },
  innerCont: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("8%"),
    paddingRight: wp("8%"),
    paddingTop: hp("4%"),
    borderTopLeftRadius: wp("20%"),
    borderTopRightRadius: wp("20%"),
    marginTop: wp("4%"),
  },
  attributeName: {
    color: "black",
    fontWeight: "400",
    marginLeft: wp("3%"),
  },
  inputBox: {
    padding: wp("3.25%"),
    backgroundColor: "#F3F4F6",
    color: "#4A5568",
    borderRadius: wp("3%"),
    marginBottom: hp("1%"),
  },
  inputBox2: {
    padding: wp("3.25%"),
    backgroundColor: "#F3F4F6",
    color: "#4A5568",
    borderRadius: wp("3%"),
    marginBottom: hp("1%"),
    width: wp("75%"),
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F3F4F6",
    borderRadius: wp("3%"),
  },
  eyeIcon: {
    position: "absolute",
    right: wp("3%"),
  },
  forgotCont: {
    display: "flex",
    alignItems: "flex-end",
  },
  forgotText: {
    color: "black",
    marginBottom: hp("4%"),
  },
  loginButton: {
    paddingTop: hp("1.5%"),
    paddingBottom: hp("1.5%"),
    backgroundColor: "orange",
    borderRadius: wp("4%"),
  },
  login: {
    fontSize: wp("3.5%"),
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  or: {
    fontSize: wp("4%"),
    color: "#4a5568",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
  },
  bottomCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("10%"),
  },
  bottomInnerCont: {
    padding: wp("2%"),
    backgroundColor: "white",
    borderRadius: wp("8%"),
    borderWidth: 1,
    borderColor: "gray",
  },
  img: {
    width: wp("50%"),
    height: wp("8%"),
    borderRadius: 8,
  },
  lastCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("2%"),
  },
  textBlock: {
    color: "#718096",
    fontWeight: "600",
  },
  signup: {
    fontWeight: "600",
    color: "orange",
  },
  errorText: {
    color: "red",
    marginLeft: wp("4%"),
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
