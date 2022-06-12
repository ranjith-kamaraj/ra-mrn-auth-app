import axios from "axios";

const AUTH_API_KEY = "AIzaSyB1c67tmXtBnsuPi5ypIGngv3rky5cHSWM";


async function authenticate(mode, email, password){
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${AUTH_API_KEY}`;
    let response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true
    });

    let token = response?.data?.idToken;
    return token;
};

export  function createUser(email, password) {
  return authenticate("signUp", email, password);
};


export function login(email, password) {
    return authenticate("signInWithPassword", email, password);
};
 
