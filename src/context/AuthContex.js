import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);   
  


  return (
    <AuthContext.Provider value={{ isAuth,setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};
