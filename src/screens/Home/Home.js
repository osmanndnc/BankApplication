import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

const Home = ({navigation}) => {
  // PieChart yerine basit bir tasarım ile başlayalım
  const accounts = [
    { name: 'Vadesiz', amount: '₺15.270,00', color: '#2563eb' },
    { name: 'Vadeli', amount: '₺6.112,50', color: '#10b981' },
    { name: 'Yatırım', amount: '₺4.067,50', color: '#f59e0b' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Toplam Bakiye</Text>
        <Text style={styles.balanceAmount}>₺0,00</Text>
        <Text style={styles.balanceSubtext}>Hesap No: ****1234</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Hesap Dağılımı</Text>
        <View style={styles.accountsList}>
          {accounts.map((account, index) => (
            <View key={index} style={styles.accountItem}>
              <View style={styles.accountInfo}>
                <View style={[styles.accountColor, { backgroundColor: account.color }]} />
                <Text style={styles.accountName}>{account.name}</Text>
              </View>
              <Text style={styles.accountAmount}>{account.amount}</Text>
            </View>
          ))}
        </View>
      </View>


      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>Hızlı İşlemler</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Para Transferi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CreateAccount')
          }>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  balanceCard: {
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
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#4a5568",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 14,
    color: "#718096",
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 16,
    textAlign: "center",
  },
  chartWrapper: {
    alignItems: "center",
  },
  accountsList: {
    marginTop: 10,
  },
  accountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 8,
  },
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  accountName: {
    fontSize: 16,
    color: "#2d3748",
    fontWeight: "500",
  },
  accountAmount: {
    fontSize: 16,
    color: "#1a365d",
    fontWeight: "bold",
  },
  legend: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#4a5568",
  },
  actionsContainer: {
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
  actionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 16,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
