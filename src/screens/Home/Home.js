import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "./Home.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const tcNo = user?.tcNo || null;
  const [userAccounts, setUserAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    calculateTotalBalance();
  }, [userAccounts]);

  const calculateTotalBalance = () => {
    let total = 0;
    userAccounts.forEach((account) => {
      if (account.selectedCurrency === "TRY") {
        total += parseFloat(account.balance);
      } else if (account.selectedCurrency === "AUD") {
        total += parseFloat(account.balance) * 30;
      } else if (account.selectedCurrency === "USD") {
        total += parseFloat(account.balance) * 40;
      } else if (account.selectedCurrency === "EUR") {
        total += parseFloat(account.balance) * 50;
      }
    });
    setTotalBalance(total);
  };

  const getAccounts = async () => {
    let accounts = await AsyncStorage.getItem("accounts");
    let parsedAccounts = accounts ? JSON.parse(accounts) : [];
    const matchedAccounts = parsedAccounts.filter(
      (account) => account.tcNo === tcNo
    );
    setUserAccounts(matchedAccounts);
    console.log("User Accounts:", matchedAccounts);
  };
  const balanceIcon = (currency) => {
    switch (currency) {
      case "TRY":
        return "₺";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "AUD":
        return "A$";
      default:
        return "₺";
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
        <Text style={styles.balanceAmount}>₺{totalBalance.toFixed(2)}</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Hesaplarım</Text>
        <View style={styles.accountsList}>
          <FlatList
            horizontal
            data={userAccounts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.accountItem}>
                <View style={styles.accountItemHeader}>
                  <Text style={styles.accountName}>{item.cardName}</Text>
                  <Text style={styles.accountBalance}>
                    {parseFloat(item.balance).toFixed(2)}
                    {balanceIcon(item.selectedCurrency)}
                  </Text>
                </View>
                <View style={styles.accountDetails}>
                  <Text style={styles.accountType}>{item.type}</Text>
                  <Text style={styles.accountCurrency}>
                    {item.selectedCurrency}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.noAccountsContainer}>
                <Text style={styles.noAccountsText}>
                  Henüz hesabınız bulunmuyor
                </Text>
              </View>
            }
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>Hızlı İşlemler</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Para Transferi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.actionButtonText}>Yeni Hesap Oluştur</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Hesap Hareketleri</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
