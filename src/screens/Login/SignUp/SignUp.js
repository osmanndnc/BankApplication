import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = (navigation) => {
  const [tcNo, SetTcNo] = useState("");
  const [name, SetName] = useState("");
  const [surname, SetSurname] = useState("");
  const [birthday, setBirthday] = useState(new Date());

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
  };

  try {
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push(newUser);
    await AsyncStorage.setItem("users", JSON.stringify(users));
        alert("Kullanıcı başarıyla kaydedildi!");

   
  } catch (error) {
    console.error("Kullanıcı kaydedilirken hata:", error);
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TC Kimlik No</Text>
      <TextInput style={styles.input} value={tcNo} onChangeText={SetTcNo} />

      <Text style={styles.text}>İsim</Text>
      <TextInput style={styles.input} value={name} onChangeText={SetName} />

      <Text style={styles.text}>Soyisim</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={SetSurname}
      />

      <Text style={styles.text}>Doğum Tarihi</Text>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text>{birthday.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={saveUser}>
        <Text style={styles.button}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 130,
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "70%",
  },
  text: {
    fontSize: 15,
  },
  button: {
    marginTop: 20,
    width: 150,
    height: 30,
    justifyContent: "center",
    borderRadius: 5,
    textAlign: "center",
    borderWidth: 1,
    backgroundColor: "lightblue",
  },
});
