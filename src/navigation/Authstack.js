import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../screens/Login/Login'

const Authstack = () => {
  return (
    <View style={styles.container}>
        <Login/>
    </View>
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