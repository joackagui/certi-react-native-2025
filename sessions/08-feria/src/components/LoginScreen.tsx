import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
    Pressable
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { emailSignIn } from "../services/loginEmail";
import { GoogleButton } from "./GoogleButton";
import { createUser, createUserByUid } from "../services/userService";

export const LoginScreen: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);
    const [msg, setMsg] = useState("");

    const handleLogin = async () => {
        try {
            console.log(email);
            console.log(password);
            const { user }  = await emailSignIn(email.trim(), password);
            
            console.log(JSON.stringify(user))

            await createUserByUid({uid: user.uid, email: user.email, role: 'client'})
            // console.log(user);
            router.replace("/map");
        } catch (e: any) {
            setMsg(e.message);
            console.log(e);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.hero}>
                        <Svg width="100%" height="180" viewBox="0 0 375 180">
                            <Path
                                d="M0 0H375V120C281.667 180 93.3333 180 0 120V0Z"
                                fill="#f9738f"
                            />
                        </Svg>
                        <View style={styles.heroPattern} />
                    </View>
                    <View style={styles.formWrapper}>
                        <Text style={styles.title}>Sign in</Text>
                        <View style={styles.titleAccent} />
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={18} color="#f9738f" />
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="demo@email.com"
                                    placeholderTextColor="#cbd5f5"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    textContentType="emailAddress"
                                />
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={18} color="#f9738f" />
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#cbd5f5"
                                    secureTextEntry={secureEntry}
                                    textContentType="password"
                                />
                                <Pressable
                                    onPress={() => setSecureEntry((prev) => !prev)}
                                    hitSlop={8}
                                >
                                    <Ionicons
                                        name={secureEntry ? "eye-off-outline" : "eye-outline"}
                                        size={18}
                                        color="#f9738f"
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.rememberRow}>
                            <View style={styles.rememberToggle}>
                                <Switch
                                    value={rememberMe}
                                    onValueChange={setRememberMe}
                                    trackColor={{ false: "#f1f5f9", true: "#f9738f" }}
                                    thumbColor={rememberMe ? "#fef2f8" : "#ffffff"}
                                />
                                <Text style={styles.rememberLabel}>Remember Me</Text>
                            </View>
                            <Pressable>
                                <Text style={styles.linkMuted}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                        <Pressable style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonLabel}>Login</Text>
                        </Pressable>
                        {/* <GoogleButton /> */}
                        <View style={styles.footerRow}>
                            <Text style={styles.footerText}>Don’t have an account?</Text>
                            <Pressable>
                                <Text style={styles.linkPrimary}> Sign up</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    content: {
        flexGrow: 1
    },
    hero: {
        position: "relative",
        backgroundColor: "#f9738f"
    },
    heroPattern: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.15,
        backgroundColor: "#f25d7e"
    },
    formWrapper: {
        marginTop: -36,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 32
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827"
    },
    titleAccent: {
        width: 60,
        height: 4,
        borderRadius: 999,
        backgroundColor: "#f9738f",
        marginTop: 8,
        marginBottom: 24
    },
    fieldContainer: {
        marginBottom: 20
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fda4af",
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff8f9",
        gap: 8
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#1f2937"
    },
    rememberRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28
    },
    rememberToggle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    rememberLabel: {
        fontSize: 14,
        color: "#111827",
        fontWeight: "500"
    },
    linkMuted: {
        fontSize: 14,
        color: "#f9738f",
        fontWeight: "600"
    },
    loginButton: {
        backgroundColor: "#f9738f",
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: "center",
        shadowColor: "#f9738f",
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 12,
        elevation: 4,
        marginBottom: 24
    },
    loginButtonLabel: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700"
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    footerText: {
        fontSize: 14,
        color: "#6b7280"
    },
    linkPrimary: {
        fontSize: 14,
        color: "#f9738f",
        fontWeight: "600"
    }
});
