import React, { useState, useEffect } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import * as Location from 'expo-location';



const data = [
  {
    label: "Donor",
    type: "1",
  },
  {
    label: "NGO",
    type: "2",
  },
  {
    label: "Delivery Person",
    type: "3",
  },
];

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState(null);
  const [type, setType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [contactError, setContactError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getLocationPermission = async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
      
      if (status !== 'granted') {
        navigation.navigate('Welcome');
        Alert.alert('Location Permission Denied', 'Please enable location services to use this app.');
      } else {
        const userLocation = await Location.getCurrentPositionAsync({});
        console.log('User location:', userLocation);
      }
    };

    getLocationPermission();
  }, [navigation]);


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
  
  const validateContact = () => {
    if (contact.length != 10) {
      setContactError("Mobile No. must be 10 digits");
      return false;
    }
    return true;
  };
  
  const validateAddress = () => {
    if (address.trim() === "") {
      setAddressError("Address is required");
      return false;
    }
    return true;
  };

  const renderLabel = () => {
    if (type || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "orange" }]}>
          User Type:
        </Text>
      );
    }
    return null;
  };

  const handleSignup = async () => {
    let isValid = true;
    if (
      !validateFullName() ||
      !validateEmail() ||
      !validatePassword() ||
      !validateContact() ||
      !validateAddress()
    ) {
      isValid = false;
    }
    if (type === null) {
      setUserTypeError("Please select a user type.");
      isValid = false;
    } else {
      setUserTypeError("");
    }


    if (isValid) {
      try {
         setIsLoading(true);
         const location = await Location.getCurrentPositionAsync({});
         const { latitude, longitude } = location.coords;
         setUserLocation({ latitude, longitude });
         console.log(latitude,longitude)
         const response = await axios.post("https://minor-project-wss9.vercel.app/register",{email,password,contact,fullName,latitude,longitude,type,address});
          console.log(response.data)
          setTimeout(() => {
            if (response.data.fullName) {
              Alert.alert("You're Registered!", `Welcome ${response.data.fullName}`);
            } else {
              throw new Error("Registration failed: Email Already exists");
            }
            setIsLoading(false);
            setTimeout(() => {
              if (type === '1') {
                navigation.navigate('Donor');
              } else if (type === '2') {
                navigation.navigate('NGO');
              } else if (type === '3') {
                navigation.navigate('DP');
              }
            }, 100); // Adjust the delay time as needed
          }, 6000);
        
      } catch (error) {
        setIsLoading(false);
        //console.log(error);
        //Alert.alert("Error Authentication failed", "Please try again.");
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          console.error("No response received from the server:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    } else {
      Alert.alert("Error", "Please fill in all the fields correctly.");
    }


  };

  return (
    <ScrollView>
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

          <Text style={styles.attributeName}>Contact</Text>

          <TextInput
            style={styles.inputBox}
            placeholder="Enter Mobile No."
            onChangeText={(text) => {
              setContact(text);
              setContactError("");
            }}
          />
          <Text style={styles.errorText}>{contactError}</Text>

          <Text style={styles.attributeName}>Address</Text>

          <TextInput
            style={styles.inputBox}
            placeholder="Enter Address"
            onChangeText={(text) => {
              setAddress(text);
              setAddressError("");
            }}
          />
          <Text style={styles.errorText}>{addressError}</Text>

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
                typeField="type"
                placeholder={!isFocus ? "    Select login type" : "..."}
                searchPlaceholder="Search..."
                type={type}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setType(item.type);
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
            onPress={handleSignup}
          >
            <Text style={styles.signup}>Sign Up</Text>
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
        <View style={styles.lastCont}>
          <Text style={styles.textBlock}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.login}> Login</Text>
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
    marginTop: hp('1%'),
    height: 1150,
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
    borderTopRightRadius: wp('2.5%'), 
    borderBottomLeftRadius: wp('2.5%'), 
    marginLeft: wp('6%'),
  },
  inputCont: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp('8%'),
    paddingRight: wp('8%'),
    paddingTop: hp('4%'),
    borderTopLeftRadius: wp('12%'),
    borderTopRightRadius: wp('12%'),
  },
  inputBox: {
    padding: wp('3%'),
    backgroundColor: "#F3F4F6",
    color: "#4A5568",
    borderRadius: wp('4%'),
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
  attributeName: {
    color: "black",
    fontWeight: "400",
    marginLeft:wp('4%'),
  },
  signupButton: {
    paddingTop: hp('1.5%'), 
    paddingBottom: hp('1.5%'), 
    backgroundColor: "orange",
    borderRadius: wp('3%'),
  },
  signup: {
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
    paddingTop: hp('1%'), 
    paddingBottom: hp('1%'),
  },
  bottomCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: wp('10%'),
  },
  bottomInnerCont: {
    padding: wp('2%'),
    backgroundColor: "white",
    borderRadius: wp('8%'),
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
    marginTop: hp('2%'),
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
    marginLeft: wp('3%'),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIMG: {
    width: wp('65%'),
    height: wp('65%'),
  },
});
