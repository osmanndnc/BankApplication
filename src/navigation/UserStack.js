import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
