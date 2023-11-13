import axios from 'axios';


async function authenticate(email, password) {

    const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
    });

    const token = response.data.idToken;

    return token;
}

export function signup(email, password) {
    return authenticate('signUp', email, password);
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}