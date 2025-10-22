import React from 'react';
import { Stack } from 'expo-router';
// import * as WebBrowser from "expo-web-browser";
// import { AuthProvider } from '../src/auth/authProvider';


// WebBrowser.maybeCompleteAuthSession();


const RootLayout = () => {
    return (
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="(tabs)" />
            </Stack>
    )
}
export default RootLayout;
