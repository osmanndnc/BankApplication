import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
    
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
  },
})