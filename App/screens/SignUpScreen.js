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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { showMessage } from "react-native-flash-message";

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
  const [isLoading, setIsLoading] = useState(false);


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

  const handleSignup = async () => {
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
      try {
         const response = await axios.post("https://minor-project-wss9.vercel.app/register",{email,password,contact,fullName});
          //console.log(response.data.fullName);
          Alert.alert("Success",`Welcome ${response.data.fullName}`)
  

          // Based on the selected user type, navigate to different screens
          if (value === '1') {
            navigation.navigate('Donor');
          } else if (value === '2') {
            navigation.navigate('NGO');
          } else if (value === '3') {
            navigation.navigate('DP');
          }
        
      } catch (error) {
        Alert.alert("Error", response.data);
      }
    } else {
      Alert.alert("Error", "Please fill in all the fields correctly.");
    }



    // if (isValid) {
    //   setIsLoading(true);

    //   // Simulating an asynchronous login process
    //   setTimeout(() => {
    //     setIsLoading(false);

    //     showMessage({
    //       message: 'Login Successful',
    //       type: 'success',
    //     });

    //     // Navigating to the respective screens after a delay
    //     setTimeout(() => {
    //       if (value === '1') {
    //         navigation.navigate('Donor');
    //       } else if (value === '2') {
    //         navigation.navigate('NGO');
    //       } else if (value === '3') {
    //         navigation.navigate('DP');
    //       }
    //     }, 100); // Adjust the delay time as needed
    //   }, 6000); // Simulating a login process, adjust time as needed
    // } else {
    //   Alert.alert('Error', 'Please fill in all the fields correctly.');
    // }
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
    backgroundColor: "#F3F4F6",
    borderRadius: wp('3%'),
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
