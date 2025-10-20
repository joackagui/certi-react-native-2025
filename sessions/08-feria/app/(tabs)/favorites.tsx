import React from "react";
import { View, Text, StyleSheet } from "react-native";
import VendorInfo from "../../src/components/VendorInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "../../src/store/vendorStore";
import { Vendor } from "../../src/types";

const FavoriteScreen = () => {
  const { vendors, toggleFavorite } = useStore();

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Stores</Text>
        {vendors
          .filter((vendor: Vendor) => vendor.favorite)
          .map((vendor: Vendor) => (
            <VendorInfo
              key={vendor.id}
              vendor={vendor}
              addToFavorites={toggleFavorite}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
});

export default FavoriteScreen;
