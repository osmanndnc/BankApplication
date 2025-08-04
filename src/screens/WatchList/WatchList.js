import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Loading from "../../components/LoadingUI/Loading";

const WatchList = () => {
  const [step, setStep] = useState(0);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [rates, setRates] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);

  const currencies = ["USD", "EUR", "GBP"];

  const toggleCurrency = (currency) => {
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies(
        selectedCurrencies.filter((item) => item !== currency)
      );
    } else {
      setSelectedCurrencies([...selectedCurrencies, currency]);
    }
  };

  useEffect(() => {
    let timer;
    
    if (step === 1 && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step, timeLeft]);
  useEffect(() => {
    let socket;

    if (step === 1 && selectedCurrencies.length > 0) {
      socket = io("http://10.0.2.2:3000");

      socket.emit("subscribe", selectedCurrencies);

      socket.on("currency-update", (data) => {
        console.log("Currency update:", data);
        setRates(data);
        
        setTimeLeft(10); 
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [step, selectedCurrencies]);

  return (
    <>
      {step === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>
            İzlemek İstediğiniz Dövizleri Seçiniz
          </Text>
          <FlatList
            data={currencies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.currencyCard,
                  selectedCurrencies.includes(item) && styles.selectedCard,
                ]}
                onPress={() => toggleCurrency(item)}
              >
                <View>
                  <Text
                    style={[
                      styles.currencyName,
                      selectedCurrencies.includes(item) && styles.selectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => setStep(1)}
            disabled={selectedCurrencies.length === 0}
          >
            <Text style={styles.confirmButtonText}>
              Tamam ({selectedCurrencies.length})
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Güncel Kurlar</Text>
          <FlatList
            data={rates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.currencyCard}>
                <Text style={styles.currencyName}>{item.currency}</Text>
                <Text style={{ fontSize: 18, marginTop: 4 }}>
                  Alış: {item.rate} TL
                </Text>
                <Text style={{ color: "#64748b" }}>{item.time}</Text>
              </View>
            )}
          />
          <Text style={{ fontSize: 32, textAlign: "center" }}>{timeLeft}</Text>
        </View>
      )}
    </>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 20,
  },
  currencyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  selectedCard: {
    backgroundColor: "#3b82f6",
    borderColor: "#2563eb",
  },
  currencyName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    textAlign: "center",
  },
  selectedText: {
    color: "#ffffff",
  },
  confirmButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 30,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
