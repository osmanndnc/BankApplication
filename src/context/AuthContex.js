import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Context oluştur
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setUser] = useState(true);   
  


  return (
    <AuthContext.Provider value={{ isAuth,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
