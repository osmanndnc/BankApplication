import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { StepContext } from "../../context/StepContext";
import { Picker } from "@react-native-picker/picker";
import TextPicker from "../../components/TextPicker/TextPicker";

const CreateAccount = () => {
  const { step, setStep } = useContext(StepContext);
  const [type, setType] = useState("deposit account");
  const [selectedCurrency, setCurrency] = useState("AUD");
  const [selectedBranch, setBranch] = useState("6800 KILICASLAN/AKS");
  const [cardName, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [newAccount, setNewAcc] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");

  const accountTypes = [
    { label: "Vadesiz Hesap", value: "Vadesiz Hesap" },
    { label: "Vadeli Hesap", value: "Vadeli Hesap" },
  ];
  const currencyTypes = [
    { label: "Türk Lirası", value: "TRY" },
    { label: "Dolar", value: "USD" },
    { label: "Euro", value: "EUR" },
    { label: "Sterlin", value: "GBP" },
  ];
  const branchTypes = [
    { label: "6800 KILICASLAN/AKS", value: "6800 KILICASLAN/AKS" },
    { label: "6801 KILICASLAN/AKS", value: "6801 KILICASLAN/AKS" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            {cardName || "Hesap Adı"}
          </Text>
          <Text style={styles.cardSubtext}>
            {type}
          </Text>
          <Text style={styles.cardSubtext}>
            {selectedBranch}
          </Text>
          <Text style={styles.cardSubtext}>
            {selectedCurrency}
          </Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Hesap İsmini Giriniz"
        value={cardName}
        onChangeText={setName}
      />

    <View style={styles.pickerContainer}>
      <TextPicker
        label="Hesap Türü"
        selectedValue={type}
        setselectedValue={setType}
        DataTypes={accountTypes}
      />
      <TextPicker
        label="Para Birimi"
        selectedValue={selectedCurrency}
        setselectedValue={setCurrency}
        DataTypes={currencyTypes}
        
      />
      <TextPicker
        label="Şube"
        selectedValue={selectedBranch}
        setselectedValue={setBranch}
        DataTypes={branchTypes}/>
        <TouchableOpacity>
          <Text style={styles.button}>Hesap Oluştur</Text>
        </TouchableOpacity>
    </View>

    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  card: {
    width: "80%",
    height: 200,
    backgroundColor: "#2563eb",
    borderRadius: 16,
    padding: 20,
    justifyContent: "center",
  },
  cardContent: {
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  cardTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardSubtext: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.9,
  },
  input: {
    height: 50,
    width: "70%",
    marginTop: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    
  },
  pickerContainer: {
    width: "100%",
    marginTop: 5,
    alignItems: "center",
  },
  button: {backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginTop:20,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  }
});
