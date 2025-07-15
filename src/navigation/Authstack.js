import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../screens/Login/Login'
import SignUp from '../screens/SignUp/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const Authstack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Authstack

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})