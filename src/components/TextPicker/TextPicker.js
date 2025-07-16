import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'
const TextPicker = ({ label, selectedValue, setselectedValue, DataTypes }) => {
  return (
   <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setselectedValue(itemValue)}
          style={styles.picker}
        >
          {DataTypes.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
        </View>
        </View>
  )
}

export default TextPicker

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: "15%",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    width: "70%",
  },
  picker: {
    height: 50,
    width: "100%",
  },
})