import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../context/AuthContex";
import { UserContext } from "../../context/UserContext";
import styles from "./Login.style"; 
import Loading from "../../components/LoadingUI/Loading";
const Login = ({ navigation }) => {

  const [tcNo, setTcNo] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)


  const login = async (tcNo, password) => {
    setIsLoading(true)
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const matchedUser = users.find(
        (user) => user.tcNo === tcNo && user.password === password
      );

      if (matchedUser) {
        setUser(matchedUser);
        setAuth(true); 
      } else {
        alert("Giriş başarısız! TC No veya şifre yanlış.");
      }
    } catch (error) {
      console.error("Giriş sırasında hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Hoş Geldiniz</Text>
          <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>TC Kimlik No</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === "tcNo" && styles.inputFocused,
              ]}
              placeholder="TC Kimlik No"
              keyboardType="numeric"
              maxLength={11}
              value={tcNo}
              onChangeText={setTcNo}
              onFocus={() => setFocusedInput("tcNo")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Şifre</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === "password" && styles.inputFocused,
              ]}
              placeholder="Şifre"
              secureTextEntry
              keyboardType="numeric"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => login(tcNo, password)}
          >
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
      
          <TouchableOpacity
            style={styles.button}

            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {isLoading && (
        <Loading />
      )}
    </View>
  );
};

export default Login;

