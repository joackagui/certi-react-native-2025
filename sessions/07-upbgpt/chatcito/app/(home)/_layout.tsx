import React from 'react';
import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: false }}>
      <Stack.Screen name="chat" options={{ title: 'Chat' }} />
    </Stack>
  );
}
