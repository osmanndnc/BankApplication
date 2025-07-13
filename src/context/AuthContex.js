import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Context oluştur
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);     // Giriş yapmış kullanıcı bilgisi
  


  return (
    <AuthContext.Provider value={{ user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};
