import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../../context/UserContext';

const MoneyTransfer = ({navigation}) => {
    const { user } = useContext(UserContext);
    const tcNo = user ? user.tcNo : null;
    const [step, setStep] = useState(0);
    const [userAccounts, setUserAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transferAmount, setTransferAmount] = useState();

    useEffect(() => {
        getAccounts();
    }, []); 

    const getAccounts = async () => {
        let accounts = await AsyncStorage.getItem("accounts");
        let parsedAccounts = accounts ? JSON.parse(accounts) : [];
        const matchedAccounts = parsedAccounts.filter(
            (account) => account.tcNo === tcNo
        );
        setUserAccounts(matchedAccounts);
        console.log("User Accounts:", matchedAccounts);

    }

    const handleAccountSelect = (account) => {
        setSelectedAccount(account);
        setStep(1);
    };
    const handleTransfer = async () => {
      if (!transferAmount || transferAmount <= 0) {
        alert("Geçerli bir miktar giriniz!");
        return;
      }
      
      let balance = parseFloat(selectedAccount.balance);
      let amount = parseFloat(transferAmount);
      
      if (amount > balance) {
        alert("Yetersiz bakiye!");
        return;
      }
            balance -= amount;
      selectedAccount.balance = balance.toFixed(2);
            let accounts = await AsyncStorage.getItem("accounts");
      let parsedAccounts = accounts ? JSON.parse(accounts) : [];
      const accountIndex = parsedAccounts.findIndex(acc => acc.iban === selectedAccount.iban);
      
      parsedAccounts[accountIndex].balance = balance.toFixed(2);
      await AsyncStorage.setItem("accounts", JSON.stringify(parsedAccounts));
      
      alert(`Transfer başarılı! ${amount.toFixed(2)} ${selectedAccount.selectedCurrency} gönderildi.`);
      navigation.navigate("Drawer");
    }

    return (
        <>
            {step === 0 ? (
                <ScrollView style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Para Transfer</Text>
                        <Text style={styles.subtitle}>Transfer yapmak istediğiniz hesabı seçiniz</Text>
                        <FlatList
                            data={userAccounts}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.accountCard} onPress={() => handleAccountSelect(item)}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.accountName}>{item.cardName}</Text>
                                        <Text style={styles.accountBalance}>
                                            {parseFloat(item.balance).toFixed(2)} {item.selectedCurrency}
                                        </Text>
                                    </View>
                                    <View style={styles.cardBody}>
                                        <View style={styles.accountInfo}>
                                            <Text style={styles.accountType}>{item.type}</Text>
                                            <Text style={styles.accountIban}></Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <View style={styles.noAccountsContainer}>
                                    <Text style={styles.noAccountsText}>
                                        Henüz hesabınız bulunmuyor
                                    </Text>
                                </View>
                            }
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.listContainer}
                        />
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <View style={styles.transferContainer}>
                        <Text style={styles.subtitle}>Alıcı bilgilerini giriniz</Text>
                        
                        <TextInput 
                            style={styles.input} 
                            placeholder="Alıcı  IBAN"

                            keyboardType="numeric"
                            maxLength={11}
                        />
                         <TextInput 
                            style={styles.input} 
                            placeholder="Miktar"
                            value={transferAmount}
                            onChangeText={setTransferAmount}
                            keyboardType="numeric"
                        />
                        
                        <TouchableOpacity style={styles.continueButton} onPress={handleTransfer}>
                            <Text style={styles.continueButtonText}>Devam Et</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default MoneyTransfer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  transferContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 20,
  },
  accountCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  accountName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfo: {
    flex: 1,
  },
  accountType: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  accountIban: {
    fontSize: 12,
    color: '#94a3b8',
    fontFamily: 'monospace',
  },
  selectButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  noAccountsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noAccountsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#1e293b',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
})