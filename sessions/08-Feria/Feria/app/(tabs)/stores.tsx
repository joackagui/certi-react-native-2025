import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../src/components/Search";
import SearchBar from "../../src/components/SearchBar";

const StoreScreen = () => {
  return (
    <SafeAreaView>
      <SearchBar />
    </SafeAreaView>
  );
};

export default StoreScreen;
