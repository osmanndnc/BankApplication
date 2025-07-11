import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Login = (navigation) => {
  const [tcNo, setTcNo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate()
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
<View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="TC Kimlik No"
        keyboardType="numeric"
        maxLength={11}
        value={tcNo}
        onChangeText={setTcNo}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        keyboardType="numeric"
        value={password}
        onChangeText={setPassword}
      />
</View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer:{
    justifyContent:'center',
    width:300,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
