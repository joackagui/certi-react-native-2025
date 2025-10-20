import React from "react";
import { Vendor } from "../types";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const VendorInfo = ({
  vendor,
  addToFavorites,
}: {
  vendor: Vendor;
  addToFavorites: (vendorId: string) => void;
}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => addToFavorites(vendor.id)} style={styles.heart}>
          <Ionicons name={vendor.favorite ? "heart" : "heart-outline"} size={24} color="#900" />
        </TouchableOpacity>
      <View>
        {/* <Image
          source={{ uri: vendor.imageUrl }}
        >
          {vendor.imageUrl ? null : <Text>No Image Available</Text>}
        </Image> */}
      </View>
      <View key={vendor.id} style={styles.info}>
        <Text style={styles.nameText}>Name: {vendor.name}</Text>
        <Text style={styles.text}>Category: {vendor.category}</Text>
        <Text style={styles.text}>
          Schedule: {vendor.schedule.openTime} - {vendor.schedule.closedTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#000000ff",
  },
  info: {
    margin: 8,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 18,
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  heart: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default VendorInfo;
