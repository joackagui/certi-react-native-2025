import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="products"
        options={{
          title: "Productos",
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;
