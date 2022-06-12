import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
});

function AuthContextprovider ({children}){
    const [authToken, setAuthToken] = useState();


   function authenticate(token){
    setAuthToken(token);
    AsyncStorage.setItem('token', token);//Value should be always string
   };

   function logout(){
       setAuthToken(null);
       AsyncStorage.removeItem('token');
   }

   let value = {
       token: authToken,
       isAuthenticated: !!authToken,
       authenticate: authenticate,
       logout: logout
   }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthContextprovider;
