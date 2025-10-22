import React, { useEffect } from "react";
import { Button, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../data/firebase";

WebBrowser.maybeCompleteAuthSession();

export const GoogleButton = () => {
  const expoClientId = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID;
  const webClientId =
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? expoClientId;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

  const missingClientIdMessage =
    Platform.OS === "ios"
      ? "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID"
      : Platform.OS === "android"
      ? "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID"
      : "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID";

  if (
    (Platform.OS === "ios" && !iosClientId) ||
    (Platform.OS === "android" && !androidClientId) ||
    (!webClientId && !expoClientId)
  ) {
    console.warn(
      `[google-auth] Missing ${missingClientIdMessage}. Update sessions/08-feria/.env with the Google OAuth client IDs.`
    );
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId: expoClientId ?? undefined,
    webClientId: webClientId ?? undefined,
    androidClientId: androidClientId ?? undefined,
    iosClientId: iosClientId ?? undefined,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    const signIn = async () => {
      if (response?.type === "success") {
        const idToken = response.authentication?.idToken;
        if (!idToken) return;
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, credential);
      }
    };
    signIn();
  }, [response]);

  return (
    <Button
      title="Continuar con Google"
      disabled={!request}
      onPress={() => promptAsync()}
    />
  );
};
