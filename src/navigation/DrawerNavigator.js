import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home/Home";
import MyAccounts from "../screens/MyAccounts/MyAccounts";
import WatchList from "../screens/WatchList/WatchList";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: 'Ana Sayfa',
        }}
      />
       <Drawer.Screen 
        name="MyAccounts" 
        component={MyAccounts} 
        options={{
          title: 'Hesaplarım',
        }}
      />
       <Drawer.Screen 
        name="WatchList" 
        component={WatchList} 
        options={{
          title: 'Watch List',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
