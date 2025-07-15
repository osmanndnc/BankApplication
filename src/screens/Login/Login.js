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
const Login = ({ navigation }) => {
  const [tcNo, setTcNo] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const { isAuth, setUser } = useContext(AuthContext);
  const login = async (tcNo, password) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const matchedUser = users.find(
        (user) => user.tcNo === tcNo && user.password === password
      );

      if (matchedUser) {
        alert("Giriş başarılı!");
        setUser(true);
        // İstersen burada kullanıcıyı oturum bilgisi olarak saklayabilirsin
      } else {
        alert("Giriş başarısız! TC No veya şifre yanlış.");
      }
    } catch (error) {
      console.error("Giriş sırasında hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
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
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#4a5568",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: "#2d3748",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#2563eb",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputFocused: {
    borderColor: "#2563eb",
    backgroundColor: "#f7fafc",
  },
});
