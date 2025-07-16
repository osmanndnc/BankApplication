import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StepContext = createContext();

export const StepProvider = ({ children }) => {
    const [step, setStep] = useState(0);
  


  return (
    <StepContext.Provider value={{ step, setStep }}>
      {children}
    </StepContext.Provider>
  );
};
