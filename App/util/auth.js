// import axios from 'axios';


// async function authenticate( email, password) {
//     const url = `http://localhost:4000/login`;

//     const response = await axios.post(url, {
//         email,
//         password,
//         returnSecureToken: true,
//     });

//     const token = response.data.idToken;

//     return token;
// }

// export function signup(email, password) {
//     return authenticate(email, password);
// }

// export function login(email, password) {
//     return authenticate( email, password);
// }


import axios from 'axios';

const login = async (email, password) => {
  try {
    // Make a POST request to your backend login endpoint
    const response = await axios.post('http://10.0.0.2:4000/login', {
      email: email,
      password: password,
    });

    // Assuming your backend returns a token upon successful login
    const token = response.data.token;

    // You can do additional handling here if needed, such as storing the token in the app's state or local storage

    return token;
  } catch (error) {
    // Handle errors, such as incorrect credentials or server issues
    throw new Error('Authentication failed. Please try again.');
  }
};

export default login;
