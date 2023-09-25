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
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileno, setmobileno] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [MobileNoError, setMobileNoError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");

  const validateFullName = () => {
    if (fullName.trim() === "") {
      setFullNameError("Full Name is required");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid Email Address");
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

  const validateMobileNo = () => {
    if (mobileno.length != 10) {
      setMobileNoError("Mobile No. must be 10 digits");
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

          <TextInput
            style={styles.inputBox}
            placeholder="Enter Name"
            onChangeText={(text) => {
              setFullName(text);
              setFullNameError("");
            }}
          />
          <Text style={styles.errorText}>{fullNameError}</Text>

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

          <Text style={styles.attributeName}>Mobile No.</Text>

          <TextInput
            style={styles.inputBox}
            placeholder="Enter Mobile No."
            onChangeText={(text) => {
              setmobileno(text);
              setMobileNoError("");
            }}
          />
          <Text style={styles.errorText}>{MobileNoError}</Text>

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
            style={styles.signupButton}
            onPress={() => {
              let isValid = true;
              if (
                !validateFullName() ||
                !validateEmail() ||
                !validatePassword() ||
                !validateMobileNo()
              ) {
                isValid = false;
              }
              if (value === null) {
                setUserTypeError("Please select a user type.");
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
    padding: 12,
    backgroundColor: "#F3F4F6",
    color: "#4A5568",
    borderRadius: 16,
    marginBottom: 8,
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
  errorText: {
    color: "red",
    marginLeft: 15,
  },
});
