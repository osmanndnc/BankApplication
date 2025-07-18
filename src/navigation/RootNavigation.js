import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContex";
import UserStack from "./UserStack";
import Authstack from "./Authstack";
import SignUp from "../screens/SignUp/SignUp";
import Login from "../screens/Login/Login";

const RootNavigation = () => {
  const { isAuth } = useContext(AuthContext);
  return <NavigationContainer>
    {isAuth ? <UserStack /> : <Authstack />}
  </NavigationContainer>;
};

export default RootNavigation;

const styles = StyleSheet.create({});
