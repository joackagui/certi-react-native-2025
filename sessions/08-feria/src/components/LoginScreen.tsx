import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
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
import { emailSignIn, resetPassword } from "../services/loginEmail";
import { createUserByUid, getUserByUid } from "../services/userService";

export const LoginScreen: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [secureEntry, setSecureEntry] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [messageTone, setMessageTone] = useState<"error" | "success">("error");
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async () => {
        if (submitting) return;

        const trimmedEmail = email.trim();
        if (!trimmedEmail || !password) {
            setMessageTone("error");
            setMessage("Ingresa tu correo y contraseña.");
            return;
        }

        setMessage(null);
        try {
            setSubmitting(true);
            const { user } = await emailSignIn(trimmedEmail, password);
            const existingProfile = await getUserByUid(user.uid);
            if (!existingProfile) {
                await createUserByUid({ uid: user.uid, email: user.email ?? trimmedEmail, role: "client" });
                console.info(`[Auth] Perfil creado para ${user.email ?? trimmedEmail} con rol client.`);
            } else {
                console.info(
                    `[Auth] Perfil existente detectado para ${user.email ?? trimmedEmail} con rol ${existingProfile.role ?? "client"}.`
                );
            }
            router.replace("/map");
        } catch (e: any) {
            setMessageTone("error");
            setMessage(e?.message ?? "No se pudo iniciar sesión.");
            console.error("Login error", e);
        } finally {
            setSubmitting(false);
        }
    };

    const handleForgotPassword = async () => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            Alert.alert("Ingresa tu correo", "Necesitamos tu email para enviarte el enlace.");
            return;
        }
        try {
            await resetPassword(trimmedEmail);
            setMessageTone("success");
            setMessage("Te enviamos un correo para restablecer tu contraseña.");
        } catch (error: any) {
            setMessageTone("error");
            setMessage(error?.message ?? "No pudimos enviar el correo de recuperación.");
        }
    };

    const goToSignUp = () => {
        if (submitting) return;
        router.push("/signup");
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f9738f" }}>
            <SafeAreaView style={styles.safeArea} edges={["top"]}>
                <View style={styles.surface}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                    >
                        <ScrollView
                            style={styles.scroll}
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
                            <View style={styles.formSection}>
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
                                    {message && (
                                        <Text
                                            style={[
                                                styles.feedback,
                                                messageTone === "error"
                                                    ? styles.feedbackError
                                                    : styles.feedbackSuccess
                                            ]}
                                        >
                                            {message}
                                        </Text>
                                    )}
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
                                        <Pressable onPress={handleForgotPassword} disabled={submitting}>
                                            <Text style={styles.linkMuted}>Forgot Password?</Text>
                                        </Pressable>
                                    </View>
                                    <Pressable
                                        style={[styles.loginButton, submitting && styles.loginButtonDisabled]}
                                        onPress={handleLogin}
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <ActivityIndicator color="#ffffff" />
                                        ) : (
                                            <Text style={styles.loginButtonLabel}>Login</Text>
                                        )}
                                    </Pressable>
                                    <View style={styles.footerRow}>
                                        <Text style={styles.footerText}>Don’t have an account?</Text>
                                        <Pressable onPress={goToSignUp}>
                                            <Text style={styles.linkPrimary}> Sign up</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "transparent"
    },
    surface: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    scroll: {
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
    formSection: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingBottom: 32
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
    loginButtonDisabled: {
        opacity: 0.7
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
    },
    feedback: {
        fontSize: 14,
        marginBottom: 16,
        textAlign: "center"
    },
    feedbackError: {
        color: "#dc2626"
    },
    feedbackSuccess: {
        color: "#16a34a"
    }
});
