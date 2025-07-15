import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomDrawer = () => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})