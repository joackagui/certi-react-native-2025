import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Search..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default SearchBar;
