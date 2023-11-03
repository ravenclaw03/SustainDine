import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const data = [
  {
    label: "Donor",
    value: "1",
  },
  {
    label: "NGO",
    value: "2",
  },
  {
    label: "Delivery Person",
    value: "3",
  },
];

export default function LoginScreen() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");

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



  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "orange" }]}>
          User Type:
        </Text>
      );
    }
    return null;
  };

  const navigation = useNavigation();
  return (
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
          <TextInput
            style={styles.inputBox}
            secureTextEntry
            placeholder="Enter Password"
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
          />
          <Text style={styles.errorText}>{passwordError}</Text>
          <TouchableOpacity style={styles.forgotCont}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.container}>
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "orange" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "    Select login type" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <Ionicons name="person" size={20} color="black" />
                )}
              />
            </View>
            <Text style={styles.errorText}>{userTypeError}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              let isValid = true;
              if (!validateEmail() || !validatePassword()) {
                isValid = false;
              }
              if (value == null) {
                setUserTypeError("Please select a user type");
                isValid = false;
              } else {
                setUserTypeError("");
              }

              if (isValid) {
                // Proceed with sign-up logic
              } else {
                Alert.alert(
                  "Error",
                  "Please fill in all the fields correctly."
                );
              }
            }}
          >
            <Text style={styles.login}>Login</Text>
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
          <Text style={styles.textBlock}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signup}> Sign Up</Text>
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
    marginTop: hp('1%'),
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
    padding: wp('2%'),
    borderTopRightRadius: wp('2%'), 
    borderBottomLeftRadius: wp('2%'), 
    marginLeft: wp('6%'),
  },
  innerCont: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp('8%'), 
    paddingRight: wp('8%'), 
    paddingTop: hp('4%'), 
    borderTopLeftRadius: wp('20%'),
    borderTopRightRadius: wp('20%'),
  },
  attributeName: {
    color: "black",
    fontWeight: "400",
    marginLeft: wp('3%'),
  },
  inputBox: {
    padding: wp('3.25%'), 
    backgroundColor: "#F3F4F6",
    color: "#4A5568",
    borderRadius: wp('3%'),
    marginBottom: hp('1%'), 
  },
  forgotCont: {
    display: "flex",
    alignItems: "flex-end",
  },
  forgotText: {
    color: "black",
    marginBottom: hp('4%'),
  },
  loginButton: {
    paddingTop: hp('1.5%'), 
    paddingBottom: hp('1.5%'), 
    backgroundColor: "orange",
    borderRadius: wp('4%'),
  },
  login: {
    fontSize: wp('3.5%'),
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  or: {
    fontSize: wp('4%'),
    color: "#4a5568",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  bottomCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: wp('10%'),
  },
  bottomInnerCont: {
    padding: wp('2%'),
    backgroundColor: "#F3F4F6",
    borderRadius: wp('4%'),
  },
  img: {
    width: wp('8%'),
    height: wp('8%'),
  },
  lastCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp('2%'),
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
    marginLeft: wp('4%'),
  },
});
