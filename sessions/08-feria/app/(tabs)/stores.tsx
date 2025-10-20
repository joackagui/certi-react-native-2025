import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import VendorInfo from "../../src/components/VendorInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../../src/store/vendorStore";

const StoreScreen = () => {
  const { vendors, toggleFavorite } = useStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Stores</Text>
      <ScrollView>
        {vendors.map((vendor) => (
          <VendorInfo
            key={vendor.id}
            vendor={vendor}
            addToFavorites={toggleFavorite}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
  safeArea: {
    paddingBottom: 50,
  },
});

export default StoreScreen;
