// // EditInfoScreen.js
// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

// export default function EditInfoScreenDP({ navigation }) {
//   const [name, setName] = useState('ABC'); // Replace with the current user's name
//   const [email, setEmail] = useState('xyz@mail.com'); // Replace with the current user's email

//   const handleSave = () => {
//     // Perform the update logic here
//     Alert.alert('Changes Saved', 'Information updated successfully!');
//     navigation.goBack(); // Navigate back to the Account screen after saving
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={(text) => setName(text)}
//       />
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//       />
//       <Button title="Save" onPress={handleSave} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     height: 40,
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingLeft: 10,
//   },
// });
