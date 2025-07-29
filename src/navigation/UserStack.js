import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";
import CreateAccount from "../screens/CreateAccount/CreateAccount";
import MoneyTransfer from "../screens/MoneyTransfer/MoneyTransfer";
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
      <Stack.Screen 
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: 'Yeni Hesap Oluştur',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
        }}/>
          <Stack.Screen 
        name="MoneyTransfer"
        component={MoneyTransfer}
        options={{
          title: 'Para Transferi',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
        }}/>
    </Stack.Navigator>
  );
};

export default UserStack;
