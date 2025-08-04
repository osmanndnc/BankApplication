import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useContext } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContex";

const SignUp = ({ navigation }) => {
  const [tcNo, SetTcNo] = useState("");
  const [name, SetName] = useState("");
  const [surname, SetSurname] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const { setUser } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: birthday,
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setBirthday(selectedDate);
        }
      },
      mode: "date",
      is24Hour: true,
      maximumDate: new Date(),
    });
  };

 const saveUser = async () => {
  const newUser = {
    name:
      name.trim().charAt(0).toUpperCase() +
      name.trim().slice(1).toLowerCase(),
    surname: surname.toLocaleUpperCase().trim(),
    tcNo: tcNo,
    birthDate: birthday.toString().substring(0, 16),
    password: password,
    whachList : [],
  };

  try {
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(newUser);
    await AsyncStorage.setItem("users", JSON.stringify(users));

    setUser(newUser);
    
    
    setAuth(true);
    
    alert("Kullanıcı başarıyla kaydedildi!");

   
  } catch (error) {
    console.error("Kullanıcı kaydedilirken hata:", error);
  }
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Yeni hesabınızı oluşturmak için bilgilerinizi girin</Text>
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>TC Kimlik No</Text>
          <TextInput 
            style={[styles.input, focusedInput === 'tcNo' && styles.inputFocused]} 
            value={tcNo} 
            onChangeText={SetTcNo}
            onFocus={() => setFocusedInput('tcNo')}
            onBlur={() => setFocusedInput(null)}
            keyboardType="numeric"
            maxLength={11}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>İsim</Text>
          <TextInput 
            style={[styles.input, focusedInput === 'name' && styles.inputFocused]} 
            value={name} 
            onChangeText={SetName}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Soyisim</Text>
          <TextInput
            style={[styles.input, focusedInput === 'surname' && styles.inputFocused]}
            value={surname}
            onChangeText={SetSurname}
            onFocus={() => setFocusedInput('surname')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Doğum Tarihi</Text>
          <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
            <Text style={styles.dateText}>{birthday.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}
            secureTextEntry
            keyboardType="numeric"
            placeholder="Şifrenizi girin"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={saveUser}>
          <Text style={styles.buttonText}>Hesap Oluştur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 20,
    paddingTop: 60,
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
    marginBottom: 20,
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
  dateInput: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#2d3748",
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
